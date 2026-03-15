"use client";

import { useState } from "react";
import { 
  Users, 
  Component, 
  Search, 
  Plus, 
  Info,
  Calendar,
  X,
  ChevronLeft,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

// Mock Data
const MOCK_GROUPS = [
  { 
    id: 1, 
    name: "Family Savings Circle", 
    description: "Monthly savings for family members", 
    members: 7, 
    totalMembers: 10, 
    amount: 500, 
    frequency: "monthly", 
    nextDate: "4/1/2026", 
    admin: "John Doe",
    status: "Active",
    progress: 70
  },
  { 
    id: 2, 
    name: "Tech Startup Fund", 
    description: "Weekly contributions for startup employees", 
    members: 5, 
    totalMembers: 5, 
    amount: 200, 
    frequency: "weekly", 
    nextDate: "3/16/2026", 
    admin: "Sarah Williams",
    status: "Active",
    progress: 100
  },
];

export default function GroupsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "500",
    frequency: "monthly",
    size: "10"
  });

  const handleCreateGroup = () => {
    toast.success("Group created successfully!");
    setIsModalOpen(false);
    setCurrentStep(1);
    setFormData({
      name: "",
      description: "",
      amount: "500",
      frequency: "monthly",
      size: "10"
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1A2279] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-900 transition-all shadow-md shadow-indigo-100"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Groups" value={2} color="indigo" />
        <StatCard title="Active" value={2} color="emerald" />
        <StatCard title="Pending" value={0} color="orange" />
        <StatCard title="Total Members" value={12} color="indigo" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2279]/10 focus:border-[#1A2279] transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {["All", "Active", "Pending", "Completed"].map((tab) => (
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
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_GROUPS.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {/* Create Group Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-b-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#4F5BDB] to-[#1A2279] p-4 text-white relative rounded-b-3xl">
              <div className="flex items-center justify-center gap-2">
                <ChevronLeft className="w-5 h-5 absolute left-4 cursor-pointer hover:opacity-80" onClick={() => currentStep > 1 ? setCurrentStep(s => s - 1) : setIsModalOpen(false)} />
                <h2 className="text-lg font-semibold">Create Group</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between px-10 py-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === step ? "bg-[#1A2279] text-white ring-4 ring-indigo-50" : 
                    currentStep > step ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && <div className={`h-0.5 w-12 mx-2 ${currentStep > step ? "bg-emerald-500" : "bg-gray-100"}`}></div>}
                </div>
              ))}
            </div>

            {/* Modal Content */}
            <div className="px-8 pb-8">
              {currentStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Basic Information</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500">Group Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Family Savings Circle" 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500">Description</label>
                      <textarea 
                        placeholder="Describe the purpose of this group..." 
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all resize-none"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Contribution Settings</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500">Contribution Amount ($)</label>
                      <input 
                        type="number" 
                        placeholder="500" 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all"
                        value={formData.amount}
                        onChange={e => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500">Contribution Frequency</label>
                      <select 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all cursor-pointer"
                        value={formData.frequency}
                        onChange={e => setFormData({...formData, frequency: e.target.value})}
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500">Group Size (Total Members)</label>
                      <input 
                        type="number" 
                        placeholder="10" 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all"
                        value={formData.size}
                        onChange={e => setFormData({...formData, size: e.target.value})}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">Each member will contribute ${formData.amount} {formData.frequency}</p>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900">Review Details</h3>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-4 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Group Name</span>
                      <span className="text-xs font-semibold text-gray-900">{formData.name || "Latif Circle"}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Description</span>
                      <span className="text-xs font-semibold text-gray-900 text-right max-w-[150px]">{formData.description || "We are from Dhaka and we use the platform."}</span>
                    </div>
                    <div className="flex justify-between items-start border-t border-gray-200 pt-4">
                      <span className="text-xs font-medium text-gray-500">Contribution</span>
                      <span className="text-xs font-semibold text-gray-900">${formData.amount} / {formData.frequency}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Group Size</span>
                      <span className="text-xs font-semibold text-gray-900">{formData.size} members</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Total Payout</span>
                      <span className="text-xs font-bold text-indigo-600">${Number(formData.amount) * Number(formData.size)}</span>
                    </div>
                  </div>
                  <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                    <p className="text-[10px] text-indigo-700 leading-relaxed">
                      💡 As the group admin, you'll be able to manage members and invite others using a unique invite code.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                {currentStep > 1 && (
                  <button 
                    onClick={() => setCurrentStep(s => s - 1)}
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all border border-gray-200"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={() => currentStep < 3 ? setCurrentStep(s => s + 1) : handleCreateGroup()}
                  className="flex-1 px-4 py-2.5 bg-[#1A2279] text-white rounded-xl text-sm font-semibold hover:bg-indigo-900 transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {currentStep === 3 ? "Create Group" : "Continue"}
                  {currentStep < 3 && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: "indigo" | "emerald" | "orange" }) {
  const colors = {
    indigo: "text-indigo-600",
    emerald: "text-emerald-500",
    orange: "text-orange-500",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50">
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className={`text-2xl font-bold ${colors[color]}`}>{value}</h3>
    </div>
  );
}

function GroupCard({ group }: { group: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-between hover:shadow-md transition-all group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-gray-900 group-hover:text-[#1A2279] transition-colors">{group.name}</h3>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">{group.status}</span>
        </div>
        <p className="text-sm text-gray-400 mb-6 line-clamp-2">{group.description}</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{group.members}/{group.totalMembers} members</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-400 font-bold">$</span>
            <span className="font-medium">${group.amount} / {group.frequency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Next: {group.nextDate}</span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-400 font-medium">Admin:</span>
          <span className="text-xs font-bold text-gray-700">{group.admin}</span>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#1A2279] h-full rounded-full transition-all duration-500" 
              style={{ width: `${group.progress}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-400 font-bold">{group.progress}% filled</p>
        </div>
      </div>
    </div>
  );
}
