"use client";

import { useEffect, useState } from "react";
import { Search, User, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserData {
  id: string;
  email: string;
  name?: string;
  plan: string;
  created_at: string;
  streak_days: number;
  lms_synced: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      // TODO: Fetch from Supabase
      // Mock data for now
      const mockUsers: UserData[] = [
        {
          id: '1',
          email: 'alex@example.com',
          name: 'Alex Thompson',
          plan: 'journey',
          created_at: '2025-01-15',
          streak_days: 7,
          lms_synced: true,
        },
        {
          id: '2',
          email: 'sarah@example.com',
          name: 'Sarah Chen',
          plan: 'reflect',
          created_at: '2025-01-10',
          streak_days: 12,
          lms_synced: false,
        },
      ];

      setUsers(mockUsers);
      setIsLoading(false);
    }

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#E2C379] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage Camino users and subscriptions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
          />
        </div>

        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
        >
          <option value="all">All Plans</option>
          <option value="reflect">Reflect (Free)</option>
          <option value="journey">Journey</option>
          <option value="coach">Coach</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">{users.filter(u => u.plan === 'reflect').length}</div>
          <div className="text-xs text-muted-foreground">Free Users</div>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#E2C379]">{users.filter(u => u.plan === 'journey').length}</div>
          <div className="text-xs text-muted-foreground">Journey Subs</div>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#E2C379]">{users.filter(u => u.plan === 'coach').length}</div>
          <div className="text-xs text-muted-foreground">Coach Clients</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="border rounded-xl overflow-hidden bg-card">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold">User</th>
              <th className="text-left p-4 font-semibold">Plan</th>
              <th className="text-left p-4 font-semibold">Streak</th>
              <th className="text-left p-4 font-semibold">LMS Access</th>
              <th className="text-left p-4 font-semibold">Joined</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b last:border-0 hover:bg-muted/20">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E2C379]/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-[#2D2F33]" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name || 'Anonymous'}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.plan === 'reflect' ? 'bg-gray-100 text-gray-700' :
                    user.plan === 'journey' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-[#E2C379] font-semibold">{user.streak_days} days</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.lms_synced ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.lms_synced ? 'Synced' : 'Not Synced'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No users found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}
