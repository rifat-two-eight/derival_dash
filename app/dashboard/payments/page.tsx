"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ExternalLink
} from "lucide-react";

// Mock Data
const MOCK_PAYMENTS = [
  { id: "Pay-1", group: "Family Saving Circle", amount: 500, method: "Bank Account ***555", date: "2026-03-01", status: "Completed" },
  { id: "Pay-2", group: "Labib Circle", amount: 200, method: "Credit Card ***555", date: "2026-03-01", status: "Completed" },
  { id: "Pay-3", group: "Family Saving Circle", amount: 500, method: "Bank Account ***555", date: "2026-03-01", status: "Pending" },
  { id: "Pay-4", group: "Labib Circle", amount: 200, method: "Credit Card ***555", date: "2026-03-01", status: "Completed" },
  { id: "Pay-5", group: "Family Saving Circle", amount: 500, method: "Bank Account ***555", date: "2026-03-01", status: "Pending" },
  { id: "Pay-6", group: "Labib Circle", amount: 200, method: "Credit Card ***555", date: "2026-03-01", status: "Completed" },
  { id: "Pay-7", group: "Family Saving Circle", amount: 500, method: "Bank Account ***555", date: "2026-03-01", status: "Completed" },
];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 pb-20">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Payments" value="3" color="indigo" />
        <StatCard title="Completed" value="$1000" color="emerald" />
        <StatCard title="Pending" value="$200" color="orange" />
        <StatCard title="Failed" value="0" color="red" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2279]/10 focus:border-[#1A2279] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {["All", "Completed", "Pending", "Failed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                    ? "bg-[#1A2279] text-white shadow-md shadow-indigo-100"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Unified Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50">
        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Group</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Payment method</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-[10px] font-bold text-gray-900 text-center">
                    {payment.id}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs text-gray-700 text-center">
                    {payment.group}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-semibold text-gray-900 text-center">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs text-gray-500 text-center">
                    {payment.method}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-[10px] text-gray-500 text-center">
                    {payment.date}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${payment.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                        payment.status === "Pending" ? "bg-orange-50 text-orange-600" :
                          "bg-red-50 text-red-600"
                      }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    <button className="text-gray-300 hover:text-gray-500 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
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
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${page === 2
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

      {/* Disputes Banner */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex gap-4 relative z-10">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
            <AlertCircle className="w-6 h-6 text-orange-500" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Payment Disputes</h3>
              <p className="text-sm text-gray-500">
                Currently, there are no active payment disputes. Monitor this section for any issues that require attention.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Export Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-[#1A2279] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-100">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: "indigo" | "emerald" | "orange" | "red" }) {
  const colors = {
    indigo: "text-gray-900",
    emerald: "text-emerald-500",
    orange: "text-orange-500",
    red: "text-red-500",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50">
      <p className="text-gray-500 text-xs font-medium mb-1">{title}</p>
      <h3 className={`text-2xl font-bold ${colors[color]}`}>{value}</h3>
    </div>
  );
}
