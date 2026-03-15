"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  MoreHorizontal, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  Clock,
  UserX,
  Users as UsersIcon
} from "lucide-react";

// Mock Data
const MOCK_USERS = [
  { id: 1, name: "John Doe", email: "ibrahim1@gmail.com", phone: "+880 1745630673", groups: 4, contributions: 7654, status: "Active", joined: "2026-01-15" },
  { id: 2, name: "John Doe", email: "ibrahim1@gmail.com", phone: "+880 1745630673", groups: 7, contributions: 7654, status: "Blocked", joined: "2026-01-15" },
  { id: 3, name: "John Doe", email: "ibrahim1@gmail.com", phone: "+880 1745630673", groups: 3, contributions: 7654, status: "Active", joined: "2026-01-15" },
  { id: 4, name: "John Doe", email: "ibrahim1@gmail.com", phone: "+880 1745630673", groups: 5, contributions: 7654, status: "Active", joined: "2026-01-15" },
  { id: 5, name: "John Doe", email: "ibrahim1@gmail.com", phone: "+880 1745630673", groups: 9, contributions: 7654, status: "Blocked", joined: "2026-01-15" },
  { id: 6, name: "John Doe", email: "ibrahim1@gmail.com", phone: "+880 1745630673", groups: 1, contributions: 7654, status: "Active", joined: "2026-01-15" },
  { id: 7, name: "John Doe", email: "ibrahim1@gmail.com", phone: "+880 1745630673", groups: 3, contributions: 7654, status: "Active", joined: "2026-01-15" },
  { id: 8, name: "Jane Smith", email: "jane@example.com", phone: "+880 111222333", groups: 2, contributions: 1200, status: "Pending", joined: "2026-02-10" },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || user.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const stats = {
    total: MOCK_USERS.length,
    active: MOCK_USERS.filter(u => u.status === "Active").length,
    pending: MOCK_USERS.filter(u => u.status === "Pending").length,
    blocked: MOCK_USERS.filter(u => u.status === "Blocked").length,
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.total} color="indigo" />
        <StatCard title="Active" value={stats.active} color="emerald" />
        <StatCard title="Pending" value={stats.pending} color="orange" />
        <StatCard title="Blocked" value={stats.blocked} color="red" />
      </div>

      {/* Main Unified Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2279]/10 focus:border-[#1A2279] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {["All", "Active", "Pending", "Blocked"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#1A2279] text-white shadow-md shadow-indigo-100"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2279] text-white rounded-lg text-sm font-medium hover:bg-indigo-900 transition-all shadow-md shadow-indigo-100 ml-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Contact</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Groups</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Contributions</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-[10px] text-gray-400">Joined {user.joined}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <div>
                      <p className="text-xs text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700 text-center">
                    {user.groups}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">
                    ${user.contributions.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      user.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                      user.status === "Blocked" ? "bg-red-50 text-red-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {openMenuId === user.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenMenuId(null)}
                        ></div>
                        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                          {["Active", "Decline", "Block", "Approve"].map((action) => (
                            <button
                              key={action}
                              className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg"
                              onClick={() => {
                                console.log(`${action} user ${user.id}`);
                                setOpenMenuId(null);
                              }}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end px-6 py-6 border-t border-gray-50 mt-4">
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    page === 2
                      ? "bg-[#1A2279] text-white shadow-lg shadow-indigo-100 scale-110"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: "indigo" | "emerald" | "orange" | "red" }) {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50/50",
    emerald: "text-emerald-500 bg-emerald-50/50",
    orange: "text-orange-500 bg-orange-50/50",
    red: "text-red-500 bg-red-50/50",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50">
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className={`text-2xl font-bold ${colors[color].split(' ')[0]}`}>{value}</h3>
    </div>
  );
}
