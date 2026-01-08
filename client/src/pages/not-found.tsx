import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <>
      <MetaHead {...seo.notFound} />
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-paper px-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-7 w-7 text-copper-500" strokeWidth={1.75} />
              <h1 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">404 — Page not found</h1>
            </div>

            <p className="mt-4 text-sm text-paper-secondary">
              The page you were looking for doesn’t exist. Head back to the home page.
            </p>

            <div className="mt-8">
              <Link href="/">
                <Button variant="outline">Return to home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
