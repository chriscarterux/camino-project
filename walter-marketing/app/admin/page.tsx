import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // TODO: Fetch real data
  const stats = {
    totalUsers: 156,
    activeSubscribers: 42,
    monthlyRevenue: 838,
    courseCompletions: 28,
  };

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of Camino platform metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="border rounded-xl p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Total Users</span>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground mt-2">+12 this month</p>
        </div>

        <div className="border rounded-xl p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Active Subscribers</span>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{stats.activeSubscribers}</div>
          <p className="text-xs text-muted-foreground mt-2">Journey + Coach tiers</p>
        </div>

        <div className="border rounded-xl p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">MRR</span>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">${stats.monthlyRevenue}</div>
          <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
        </div>

        <div className="border rounded-xl p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Completions</span>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{stats.courseCompletions}</div>
          <p className="text-xs text-muted-foreground mt-2">Module completions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6 bg-card">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b">
              <span>New signup: alex@example.com</span>
              <span className="text-muted-foreground">2 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span>Journey subscription: sarah@example.com</span>
              <span className="text-muted-foreground">15 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span>Module completed: john@example.com</span>
              <span className="text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-card">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <div className="space-y-2">
            <a
              href="http://lms.localhost:8000/app/lms-settings"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border rounded-lg hover:border-[#E2C379] hover:bg-[#E2C379]/5 transition-colors"
            >
              <div className="font-medium">Frappe LMS Admin</div>
              <div className="text-xs text-muted-foreground">Manage courses & content</div>
            </a>
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border rounded-lg hover:border-[#E2C379] hover:bg-[#E2C379]/5 transition-colors"
            >
              <div className="font-medium">Stripe Dashboard</div>
              <div className="text-xs text-muted-foreground">Manage payments</div>
            </a>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border rounded-lg hover:border-[#E2C379] hover:bg-[#E2C379]/5 transition-colors"
            >
              <div className="font-medium">Supabase Dashboard</div>
              <div className="text-xs text-muted-foreground">Manage database</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
