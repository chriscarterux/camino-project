"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search insights, reflections, courses..."
            className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3 pl-3 border-l">
          <div className="text-right">
            <p className="text-sm font-medium">Welcome back</p>
            <p className="text-xs text-muted-foreground">Continue your journey</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
            W
          </div>
        </div>
      </div>
    </header>
  );
}
