import { Button } from "@/components/ui/button";
import { Bell, Lock, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your Camino experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Daily reflection reminders</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Weekly summary emails</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Learning path updates</span>
              <input type="checkbox" className="rounded" />
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-5 w-5" />
            <h2 className="text-lg font-bold">Appearance</h2>
          </div>
          <div className="space-y-3">
            <label className="text-sm block">Theme</label>
            <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-5 w-5" />
            <h2 className="text-lg font-bold">Privacy & Security</h2>
          </div>
          <div className="space-y-3">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Export My Data</Button>
          </div>
        </div>

        <div className="pt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
