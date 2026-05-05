"use client";

import { useState, useEffect } from "react";
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
  CheckCircle2,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { getGroups, createGroup, getGroupDetails } from "@/lib/api-auth";
import { format } from "date-fns";

interface Group {
  _id: string;
  name: string;
  description: string;
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  contributionAmount: number;
  contributionFrequency: string;
  totalMembers: number;
  currentMembers: number;
  startDate: string;
  inviteCode: string;
  poolAmount: number;
  status: string;
  createdAt: string;
}

export default function GroupsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState({ total: 0 });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contributionAmount: "1000",
    contributionFrequency: "monthly",
    totalMembers: "5",
    totalCycles: "2",
    startDate: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    fetchGroups();
  }, [activeTab, searchQuery]);

  const fetchGroups = async () => {
    setIsLoading(true);
    try {
      const params: any = {};
      if (activeTab !== "All") params.status = activeTab.toLowerCase();
      if (searchQuery) params.search = searchQuery;

      const response = await getGroups(params);
      if (response.success) {
        setGroups(response.data.data);
        setMeta(response.data.meta);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch groups");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        contributionAmount: Number(formData.contributionAmount),
        contributionFrequency: formData.contributionFrequency,
        totalMembers: Number(formData.totalMembers),
        totalCycles: Number(formData.totalCycles),
        // startDate: formData.startDate
      };

      const response = await createGroup(payload);
      if (response.success) {
        toast.success("Group created successfully!");
        setIsModalOpen(false);
        setCurrentStep(1);
        setFormData({
          name: "",
          description: "",
          contributionAmount: "1000",
          contributionFrequency: "monthly",
          totalMembers: "5",
          totalCycles: "2",
          startDate: format(new Date(), 'yyyy-MM-dd')
        });
        fetchGroups(); // Refresh list
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create group");
    }
  };

  const handleViewDetails = async (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsDetailModalOpen(true);
    setIsDetailLoading(true);
    try {
      const response = await getGroupDetails(groupId);
      if (response.success) {
        setSelectedGroup(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch group details");
      setIsDetailModalOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const stats = {
    total: meta.total,
    active: groups.filter(g => g.status === 'active').length,
    Upcoming: groups.filter(g => g.status === 'upcoming').length,
    totalMembers: groups.reduce((acc, curr) => acc + curr.currentMembers, 0)
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
        <StatCard title="Total Groups" value={stats.total} color="indigo" />
        <StatCard title="Active" value={stats.active} color="emerald" />
        <StatCard title="Upcoming" value={stats.Upcoming} color="orange" />
        <StatCard title="Total Members" value={stats.totalMembers} color="indigo" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A2279]/10 focus:border-[#1A2279] transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {["All", "Active", "Upcoming", "Completed"].map((tab) => (
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
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100/50 shadow-sm">
          <Loader2 className="w-8 h-8 text-[#1A2279] animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading groups...</p>
        </div>
      ) : groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard 
              key={group._id} 
              group={group} 
              onClick={() => handleViewDetails(group._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100/50 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <Component className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No groups found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Group Details Modal Overlay */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {isDetailLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#1A2279] animate-spin mb-4" />
                <p className="text-gray-500 font-medium font-sans">Loading group details...</p>
              </div>
            ) : selectedGroup ? (
              <>
                <div className="bg-gradient-to-r from-[#4F5BDB] to-[#1A2279] p-6 text-white relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider">{selectedGroup.status}</span>
                    <button onClick={() => setIsDetailModalOpen(false)} className="hover:opacity-80 transition-opacity">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{selectedGroup.name}</h2>
                  <p className="text-indigo-100 text-sm line-clamp-2">{selectedGroup.description}</p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-xs text-gray-500 font-medium mb-1">Contribution</p>
                      <p className="text-xl font-bold text-gray-900">${selectedGroup.contributionAmount}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{selectedGroup.contributionFrequency}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-xs text-gray-500 font-medium mb-1">Total Pool</p>
                      <p className="text-xl font-bold text-emerald-600">${selectedGroup.poolAmount}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Payout</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Info className="w-4 h-4 text-[#1A2279]" />
                        <span className="text-sm font-medium text-gray-600">Invite Code</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-[#1A2279] bg-white px-3 py-1 rounded-lg border border-indigo-100">{selectedGroup.inviteCode}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-[#1A2279]" />
                        <span className="text-sm font-medium text-gray-600">Current Members</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{selectedGroup.currentMembers} / {selectedGroup.totalMembers}</span>
                    </div>

                    {/* <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[#1A2279]" />
                        <span className="text-sm font-medium text-gray-600">Start Date</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {selectedGroup.startDate ? (() => {
                          const date = new Date(selectedGroup.startDate);
                          return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'MMMM dd, yyyy');
                        })() : 'N/A'}
                      </span>
                    </div> */}
                  </div>

                  <button 
                    onClick={() => setIsDetailModalOpen(false)}
                    className="w-full py-4 bg-[#1A2279] text-white rounded-2xl font-bold hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-100"
                  >
                    Close Details
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

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
                        placeholder="1000" 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all"
                        value={formData.contributionAmount}
                        onChange={e => setFormData({...formData, contributionAmount: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500">Contribution Frequency</label>
                      <select 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all cursor-pointer"
                        value={formData.contributionFrequency}
                        onChange={e => setFormData({...formData, contributionFrequency: e.target.value})}
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500">Total Members</label>
                        <input 
                          type="number" 
                          placeholder="5" 
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all"
                          value={formData.totalMembers}
                          onChange={e => setFormData({...formData, totalMembers: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500">Total Cycles</label>
                        <input 
                          type="number" 
                          placeholder="2" 
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all"
                          value={formData.totalCycles}
                          onChange={e => setFormData({...formData, totalCycles: e.target.value})}
                        />
                      </div>
                    </div>
                    {/* <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500">Start Date</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-[#1A2279] outline-none transition-all"
                        value={formData.startDate}
                        onChange={e => setFormData({...formData, startDate: e.target.value})}
                      />
                    </div> */}
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">Each member will contribute ${formData.contributionAmount} {formData.contributionFrequency}</p>
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
                      <span className="text-xs font-semibold text-gray-900">${formData.contributionAmount} / {formData.contributionFrequency}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Group Size</span>
                      <span className="text-xs font-semibold text-gray-900">{formData.totalMembers} members</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Total Cycles</span>
                      <span className="text-xs font-semibold text-gray-900">{formData.totalCycles} cycles</span>
                    </div>
                    {/* <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Start Date</span>
                      <span className="text-xs font-semibold text-gray-900">{formData.startDate}</span>
                    </div> */}
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Total Payout</span>
                      <span className="text-xs font-bold text-indigo-600">${Number(formData.contributionAmount) * Number(formData.totalMembers)}</span>
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

function GroupCard({ group, onClick }: { group: Group; onClick: () => void }) {
  const progress = Math.round((group.currentMembers / group.totalMembers) * 100);

  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-between hover:shadow-md transition-all group cursor-pointer active:scale-[0.98]"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-gray-900 group-hover:text-[#1A2279] transition-colors line-clamp-1">{group.name}</h3>
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full capitalize ${
            group.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
            group.status === 'upcoming' ? 'bg-orange-50 text-orange-600' : 
            'bg-gray-50 text-gray-600'
          }`}>{group.status}</span>
        </div>
        <p className="text-sm text-gray-400 mb-6 line-clamp-2 min-h-[40px]">{group.description}</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{group.currentMembers}/{group.totalMembers} members</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-400 font-bold">$</span>
            <span className="font-medium">${group.contributionAmount} / {group.contributionFrequency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium">
              Starts: {group.startDate ? (() => {
                const date = new Date(group.startDate);
                return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'MMM dd, yyyy');
              })() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-gray-400 font-medium">Admin:</span>
          <span className="text-xs font-bold text-gray-700">{group.createdBy.fullName}</span>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#1A2279] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-400 font-bold">{progress}% filled</p>
        </div>
      </div>
    </div>
  );
}
