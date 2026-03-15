"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Download, 
  ChevronDown, 
  TrendingUp,
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock Data for the chart
const REVENUE_DATA = [
  { month: "Jan", revenue: 400000 },
  { month: "Feb", revenue: 550000 },
  { month: "Mar", revenue: 450000 },
  { month: "Apr", revenue: 700000 },
  { month: "May", revenue: 800000 },
  { month: "Jun", revenue: 850000 },
  { month: "Jul", revenue: 750000 },
  { month: "Aug", revenue: 900000 },
  { month: "Sep", revenue: 800000 },
  { month: "Oct", revenue: 950000 },
  { month: "Nov", revenue: 880000 },
  { month: "Dec", revenue: 1000000 },
];

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    <div className="space-y-6 pb-20">
      {/* Report Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportSummaryCard 
          title="Financial Report"
          description="Comprehensive overview of all transactions, contributions, and fund distributions"
          icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
        <ReportSummaryCard 
          title="User Activity Report"
          description="Detailed analysis of user engagement, registrations, and activity patterns"
          icon={<Users className="w-5 h-5 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <ReportSummaryCard 
          title="Fund Distribution Report"
          description="Track fund allocation, distribution cycles, and group performance metrics"
          icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
          bgColor="bg-purple-50"
        />
      </div>

      {/* Performance Analytics Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Performance Analytics</h2>
        </div>

        {/* Chart Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Yearly Revenue Trend</h3>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-xs font-medium text-gray-600">{selectedYear}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A2279" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1A2279" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9CA3AF", fontSize: 10, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9CA3AF", fontSize: 10, fontWeight: 500 }}
                  tickFormatter={(value) => `$${value/1000}K`}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1A2279] p-3 rounded-xl shadow-xl border border-white/10 text-white animate-in fade-in zoom-in duration-200">
                          <p className="text-[10px] opacity-60 font-medium mb-1">13% Revenue</p>
                          <p className="text-sm font-bold">${payload[0].value.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1A2279" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GrowthStatCard 
            title="New Users (This Month)" 
            value="+234" 
            trend="↑ 18% from last month" 
            bgColor="bg-indigo-50/50" 
            textColor="text-indigo-600" 
          />
          <GrowthStatCard 
            title="Active Users" 
            value="1,847" 
            trend="↑ 12% from last month" 
            bgColor="bg-emerald-50/50" 
            textColor="text-emerald-500" 
          />
          <GrowthStatCard 
            title="Retention Rate" 
            value="87%" 
            trend="↑ 3% from last month" 
            bgColor="bg-purple-50/50" 
            textColor="text-purple-600" 
          />
        </div>

        {/* Group Performance Metrics */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <h3 className="text-sm font-bold text-gray-900 mb-6">Group Performance Metrics</h3>
          <PerformanceBar label="Average Group Completion Rate" percentage={92} color="bg-emerald-500" />
          <PerformanceBar label="On-Time Payment Rate" percentage={88} color="bg-indigo-600" />
          <PerformanceBar label="Average Group Fill Rate" percentage={75} color="bg-purple-600" />
        </div>
      </div>

      {/* Footer Export Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-[#1A2279] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-100">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}

function ReportSummaryCard({ title, description, icon, bgColor }: { title: string; description: string; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 group hover:shadow-md transition-all">
      <div className={`${bgColor} w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{description}</p>
      <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all group-hover:underline">
        Generate Report <Download className="w-3 h-3" />
      </button>
    </div>
  );
}

function GrowthStatCard({ title, value, trend, bgColor, textColor }: { title: string; value: string; trend: string; bgColor: string; textColor: string }) {
  return (
    <div className={`${bgColor} p-6 rounded-2xl border border-gray-100/50`}>
      <p className="text-gray-500 text-[10px] font-medium mb-1 uppercase tracking-wider">{title}</p>
      <h4 className={`text-2xl font-bold ${textColor} mb-1`}>{value}</h4>
      <p className={`text-[10px] ${textColor} opacity-80 font-medium`}>{trend}</p>
    </div>
  );
}

function PerformanceBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-bold text-gray-900">
        <span className="opacity-70">{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div 
          className={`${color} h-full rounded-full transition-all duration-1000`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

