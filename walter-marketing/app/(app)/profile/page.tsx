"use client";

import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Bell, Trash2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
          Your profile and settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, privacy, and journey — your reflections belong to you.
        </p>
      </div>

      {/* Account Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your Camino at a glance</h2>
        <div className="border rounded-2xl p-8 bg-card">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                defaultValue="Alex Thompson"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="alex@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Member since
              </label>
              <p className="text-foreground">January 2025</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Reflection streak
              </label>
              <p className="text-foreground font-semibold text-[#E2C379]">12 days in a row</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Subscription
              </label>
              <p className="text-foreground">Journey ($19.95/mo)</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <Button variant="outline">Edit profile info</Button>
          </div>
        </div>
      </section>

      {/* Subscription & Billing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your plan and billing</h2>
        <div className="border rounded-2xl p-8 bg-card">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold mb-1">Journey Plan</h3>
                <p className="text-sm text-muted-foreground">$19.95/month</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-medium">
                Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Next billing date: November 12, 2025
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/pricing">Upgrade / Downgrade Plan</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="#" target="_blank" rel="noopener noreferrer">
                View Billing History
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="text-destructive hover:text-destructive">
              Cancel Subscription
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Camino uses secure, encrypted billing through Stripe. You can cancel anytime.
          </p>
        </div>
      </section>

      {/* Privacy & Data */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your reflections are yours</h2>
        <div className="border rounded-2xl p-8 bg-card">
          <p className="text-muted-foreground mb-6">
            You have full control over your data — export, download, or delete at any time.
          </p>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Export Reflections (.txt)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Export Reflections (.json)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Download AI Insights (.pdf)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All Data
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Data deletions are permanent. We never sell or share your information.
          </p>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Stay in rhythm with your reflections</h2>
        <div className="border rounded-2xl p-8 bg-card">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium mb-1">Daily reflection reminders</h3>
                  <p className="text-sm text-muted-foreground">
                    Get a gentle nudge to reflect each morning
                  </p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="mt-1" />
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium mb-1">Weekly insight summaries</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive your patterns and themes every Sunday
                  </p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="mt-1" />
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium mb-1">Product updates & new lessons</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about new Journey modules
                  </p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="mt-1" />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
              Save Preferences
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
