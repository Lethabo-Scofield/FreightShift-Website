const STORAGE_KEY = "fs:scrollToQuote";
const QUOTE_ANCHOR_ID = "quote";

function scrollToQuote() {
  const el = document.getElementById(QUOTE_ANCHOR_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function goToQuote(navigate: (path: string) => void) {
  if (typeof window === "undefined") return;

  if (window.location.pathname === "/contact") {
    scrollToQuote();
    return;
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) - ignore
  }
  navigate("/contact");
}

export function consumePendingQuoteScroll() {
  if (typeof window === "undefined") return;
  let pending = false;
  try {
    pending = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (pending) sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    pending = false;
  }
  if (!pending) return;

  // Defer until layout settles (images, fonts) so scroll lands accurately.
  requestAnimationFrame(() => {
    requestAnimationFrame(scrollToQuote);
  });
}
