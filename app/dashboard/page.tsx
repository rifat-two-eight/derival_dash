"use client";

import {
  Users,
  Component,
  DollarSign,
  Clock,
  ArrowUp,
  ArrowDown,
  UserCheck,
  PlayCircle
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'JAN', revenue: 3500 },
  { name: 'FEB', revenue: 3800 },
  { name: 'MAR', revenue: 3200 },
  { name: 'APR', revenue: 2000 },
  { name: 'MAY', revenue: 3200 },
  { name: 'JUN', revenue: 2800 },
  { name: 'JUL', revenue: 3500 },
  { name: 'AUG', revenue: 2500 },
  { name: 'SEP', revenue: 1800 },
  { name: 'OCT', revenue: 4200 },
  { name: 'NOV', revenue: 3100 },
  { name: 'DEC', revenue: 4500 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 mx-auto">

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Users */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-indigo-50 p-2.5 rounded-xl">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 font-medium text-sm">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>12%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Users</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">3</h3>
            <p className="text-xs text-gray-400">2 active</p>
          </div>
        </div>

        {/* Card 2: Groups */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-emerald-50 p-2.5 rounded-xl">
              <Component className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 font-medium text-sm">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>8%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Active Groups</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">2</h3>
            <p className="text-xs text-gray-400">2 total</p>
          </div>
        </div>

        {/* Card 3: Funds */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 p-2.5 rounded-xl">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 font-medium text-sm">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>15%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Funds</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">$1,000</h3>
            <p className="text-xs text-gray-400">This month</p>
          </div>
        </div>

        {/* Card 4: Actions */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-orange-50 p-2.5 rounded-xl">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-1 text-red-500 font-medium text-sm">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Pending Actions</p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">2</h3>
            <p className="text-xs text-gray-400">1 users, 1 payments</p>
          </div>
        </div>

      </div>

      {/* Main Content Grid (Charts & Lists) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Monthly Revenue</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-gray-900">$12.7k</h3>
                <span className="text-xs font-medium text-emerald-500">↑ 1.3%</span>
              </div>
            </div>
            <select className="bg-gray-50 border-none text-xs font-medium text-gray-500 rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer">
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A227F" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1A227F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ display: 'none' }}
                  itemStyle={{ color: '#111827', fontWeight: 600 }}
                  formatter={(value: any) => [`$${value?.toLocaleString()}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1A227F"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Column */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-gray-900">User Growth</h3>
            <span className="bg-emerald-100 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">+23%</span>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 font-medium">Active Users</span>
                <span className="text-gray-900 font-semibold">6</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 font-medium">Pending Users</span>
                <span className="text-gray-900 font-semibold">3</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-orange-400 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 font-medium">Blocked Users</span>
                <span className="text-gray-900 font-semibold">1</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900">Recent Users</h3>
            <button className="text-[#1A227F] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: 'John Doe', email: 'john@example.com', status: 'Active', color: 'emerald' },
              { name: 'Jane Smith', email: 'jane@example.com', status: 'Active', color: 'emerald' },
              { name: 'Mike Johnson', email: 'mike@example.com', status: 'Pending', color: 'orange' }
            ].map((user, i) => (
              <div key={i} className="p-4 px-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full ${user.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden mt-6 lg:mt-0">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6 space-y-6">

            <div className="flex gap-4 items-start">
              <div className="bg-indigo-50 p-2 rounded-full shrink-0">
                <UserCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900"><span className="font-medium text-gray-600">New user registered:</span> John Doe</p>
                <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-emerald-50 p-2 rounded-full shrink-0">
                <Component className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900"><span className="font-medium text-gray-600">New group created:</span> Tech Savings</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-purple-50 p-2 rounded-full shrink-0">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900"><span className="font-medium text-gray-600">Payment completed:</span> $500</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-indigo-50 p-2 rounded-full shrink-0">
                <UserCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900"><span className="font-medium text-gray-600">User verified:</span> Jane Smith</p>
                <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
