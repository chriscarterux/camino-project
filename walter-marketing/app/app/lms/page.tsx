"use client";

import { ExternalLink, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function LMSPage() {
  const [isLoading, setIsLoading] = useState(true);
  const lmsUrl = process.env.NEXT_PUBLIC_LMS_URL || "http://lms.localhost:8000/lms";

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    const iframe = document.getElementById('lms-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className="flex flex-col h-full -m-6">
      {/* LMS Header Bar */}
      <div className="bg-card border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/app/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
          <div className="border-l pl-4">
            <h2 className="font-semibold text-sm">Learning Management System</h2>
            <p className="text-xs text-muted-foreground">Browse and enroll in courses</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={lmsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in New Tab
            </a>
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading LMS...</p>
          </div>
        </div>
      )}

      {/* LMS Iframe */}
      <div className="flex-1 relative">
        <iframe
          id="lms-iframe"
          src={lmsUrl}
          className="w-full h-full border-0"
          title="Walter Learning Management System"
          onLoad={handleIframeLoad}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      {/* Info Banner (optional) */}
      <div className="bg-muted/50 border-t px-6 py-2 text-xs text-center text-muted-foreground">
        Having trouble? <button className="underline hover:text-foreground" onClick={handleRefresh}>Refresh</button> or{" "}
        <a href={lmsUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
          open LMS in a new window
        </a>
      </div>
    </div>
  );
}
