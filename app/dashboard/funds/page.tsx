"use client";

import { useState, useEffect } from "react";
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Download,
  Loader2
} from "lucide-react";
import { getFundsSummary, getGroupFundDetails } from "@/lib/api-auth";
import { toast } from "sonner";

export default function FundsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [groupFunds, setGroupFunds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({ total: 0, totalPage: 1 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getFundsSummary();
        if (response.success) {
          setSummary(response.data);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load funds summary");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  useEffect(() => {
    const fetchGroupFunds = async () => {
      setIsTableLoading(true);
      try {
        const response = await getGroupFundDetails({ page, limit: 10 });
        if (response.success) {
          setGroupFunds(response.data.data);
          setMeta(response.data.meta);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load group funds");
      } finally {
        setIsTableLoading(false);
      }
    };

    fetchGroupFunds();
  }, [page]);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#1A2279] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Funds" 
          value={`$${summary?.totalFunds?.toLocaleString() || 0}`} 
          icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          color="emerald"
        />
        <StatCard 
          title="Pending Funds" 
          value={`$${summary?.totalPending?.toLocaleString() || 0}`} 
          icon={<Clock className="w-5 h-5 text-orange-500" />}
          color="orange"
        />
        <StatCard 
          title="Monthly Inflow" 
          value={`$${summary?.monthlyInflow?.toLocaleString() || 0}`} 
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
        <div className="overflow-x-auto border border-gray-100 rounded-xl relative">
          {isTableLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#1A2279] animate-spin" />
            </div>
          )}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Group</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Contribution</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Members</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Total Pool</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Distributed</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {groupFunds.length > 0 ? (
                groupFunds.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Admin: {item.adminName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">${item.contributionAmount}</p>
                        <p className="text-[10px] text-gray-400 capitalize">{item.contributionFrequency}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-500 text-center">
                      {item.currentMembers}/{item.totalMembers}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">
                      ${item.totalPool?.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">
                      ${item.distributed?.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className={`px-3 py-1 text-[10px] font-bold rounded-full capitalize ${
                        item.status === "active" ? "bg-emerald-50 text-emerald-600" : 
                        item.status === "upcoming" ? "bg-orange-50 text-orange-600" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 italic">
                    No group fund details found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.totalPage > 1 && (
          <div className="flex items-center justify-end px-6 py-6 border-t border-gray-50 mt-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      page === p
                        ? "bg-[#1A2279] text-white shadow-lg shadow-indigo-100"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {p.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(meta.totalPage, p + 1))}
                disabled={page === meta.totalPage}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
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
