import { Button } from "@/components/ui/button";
import { User, Mail, Calendar } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold">
            W
          </div>
          <div>
            <h2 className="text-xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">Member since October 2025</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>user@example.com</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Journey Started</label>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>October 1, 2025</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
}
