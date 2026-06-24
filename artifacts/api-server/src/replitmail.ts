// Replit Mail integration (blueprint:replitmail)
// Sends email to the verified Replit account email. No recipient config needed.
import { promisify } from "node:util";
import { execFile } from "node:child_process";

export interface SmtpMessage {
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType?: string;
    encoding?: "base64" | "7bit" | "quoted-printable" | "binary";
  }>;
}

async function getAuthToken(): Promise<{ authToken: string; hostname: string }> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const { stdout } = await promisify(execFile)(
    "replit",
    ["identity", "create", "--audience", `https://${hostname}`],
    { encoding: "utf8" },
  );

  const replitToken = stdout.trim();
  if (!replitToken) {
    throw new Error("Replit Identity Token not found for repl/depl");
  }

  return { authToken: `Bearer ${replitToken}`, hostname: hostname as string };
}

export async function sendEmail(message: SmtpMessage): Promise<{
  accepted: string[];
  rejected: string[];
  pending?: string[];
  messageId: string;
  response: string;
}> {
  const { hostname, authToken } = await getAuthToken();

  const response = await fetch(`https://${hostname}/api/v2/mailer/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Replit-Authentication": authToken,
    },
    body: JSON.stringify({
      subject: message.subject,
      text: message.text,
      html: message.html,
      attachments: message.attachments,
    }),
  });

  if (!response.ok) {
    const error = (await response.json()) as { message?: string };
    throw new Error(error.message || "Failed to send email");
  }

  return (await response.json()) as {
    accepted: string[];
    rejected: string[];
    pending?: string[];
    messageId: string;
    response: string;
  };
}
