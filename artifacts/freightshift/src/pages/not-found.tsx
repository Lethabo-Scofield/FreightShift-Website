import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Seo
        title="Page not found — FreightShift International Logistics"
        description="The page you’re looking for doesn’t exist. Head back to FreightShift’s home page or contact us for freight quotes."
        path="/404"
        noindex
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Sorry, the page you’re looking for doesn’t exist.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm font-semibold text-brand-blue hover:underline"
          >
            ← Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
