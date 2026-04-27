"use client";

import { useState } from "react";
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Download
} from "lucide-react";

// Mock Data
const MOCK_FUNDS = [
  { id: 1, group: "Family Saving Circle", admin: "John Doe", contribution: 500, frequency: "Monthly", members: "7/10", totalPoll: 3500, distributed: 10500, status: "Active" },
  { id: 2, group: "Labib Circle", admin: "Labib", contribution: 300, frequency: "Weekly", members: "5/5", totalPoll: 1000, distributed: 8000, status: "Blocked" },
  { id: 3, group: "Family Saving Circle", admin: "John Doe", contribution: 500, frequency: "Monthly", members: "7/10", totalPoll: 3500, distributed: 10500, status: "Active" },
  { id: 4, group: "Labib Circle", admin: "Labib", contribution: 300, frequency: "Weekly", members: "5/5", totalPoll: 1000, distributed: 8000, status: "Active" },
  { id: 5, group: "Family Saving Circle", admin: "John Doe", contribution: 500, frequency: "Monthly", members: "7/10", totalPoll: 3500, distributed: 10500, status: "Blocked" },
  { id: 6, group: "Labib Circle", admin: "Labib", contribution: 300, frequency: "Weekly", members: "5/5", totalPoll: 1000, distributed: 8000, status: "Active" },
  { id: 7, group: "Family Saving Circle", admin: "John Doe", contribution: 500, frequency: "Monthly", members: "7/10", totalPoll: 3500, distributed: 10500, status: "Active" },
];

export default function FundsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Funds" 
          value="$1,000" 
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          color="emerald"
        />
        <StatCard 
          title="Pending Funds" 
          value="$200" 
          icon={<Clock className="w-5 h-5 text-orange-500" />}
          color="orange"
        />
        <StatCard 
          title="Monthly Inflow" 
          value="$15,000" 
          icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
          color="indigo"
        />
      </div>

      {/* Main Unified Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Group Fund Details</h2>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Group</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Contribution</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Members</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Total Poll</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Distributed</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_FUNDS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.group}</p>
                      <p className="text-[10px] text-gray-400">Admin: {item.admin}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">${item.contribution}</p>
                      <p className="text-[10px] text-gray-400">{item.frequency}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-500 text-center">
                    {item.members}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">
                    ${item.totalPoll.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">
                    ${item.distributed.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end px-6 py-6 border-t border-gray-50 mt-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    page === 2
                      ? "bg-[#1A2279] text-white shadow-lg shadow-indigo-100"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: "emerald" | "orange" | "indigo" }) {
  const bgColors = {
    emerald: "bg-emerald-50",
    orange: "bg-orange-50",
    indigo: "bg-indigo-50",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-center h-32">
      <div className="flex gap-4 items-center">
        <div className={`${bgColors[color]} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
    </div>
  );
}
