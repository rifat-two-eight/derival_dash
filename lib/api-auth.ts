import axiosInstance from "./axios";

export const login = async (data: any) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await axiosInstance.post("/auth/refresh-token", {
    refreshToken: token,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getUsers = async (params: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  const response = await axiosInstance.get("/admin/users", { params });
  return response.data;
};

export const updateUserStatus = async (userId: string, status: string) => {
  const response = await axiosInstance.patch(`/admin/users/${userId}/status`, { status });
  return response.data;
};

export const getDashboardSummary = async () => {
  const response = await axiosInstance.get("/admin/dashboard/summary");
  return response.data;
};

export const getRecentActivities = async () => {
  const response = await axiosInstance.get("/admin/dashboard/recent-activities");
  return response.data;
};

export const getFundsSummary = async () => {
  const response = await axiosInstance.get("/admin/funds/summary");
  return response.data;
};

export const getGroupFundDetails = async (params: { page?: number; limit?: number }) => {
  const response = await axiosInstance.get("/admin/funds/group-details", { params });
  return response.data;
};

export const getUserGrowth = async () => {
  const response = await axiosInstance.get("/admin/dashboard/user-growth");
  return response.data;
};

export const getRevenueChartData = async () => {
  const response = await axiosInstance.get("/admin/dashboard/revenue-chart");
  return response.data;
};

export const getPerformanceAnalytics = async () => {
  const response = await axiosInstance.get("/admin/reports/performance");
  return response.data;
};

export const getGroups = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => {
  const response = await axiosInstance.get("/admin/groups", { params });
  return response.data;
};

export const createGroup = async (data: any) => {
  const response = await axiosInstance.post("/groups", data);
  return response.data;
};

export const getGroupDetails = async (groupId: string) => {
  const response = await axiosInstance.get(`/groups/${groupId}`);
  return response.data;
};

export const getNotifications = async (params?: { page?: number; limit?: number }) => {
  const response = await axiosInstance.get("/notifications", { params });
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await axiosInstance.patch("/notifications/mark-all-read");
  return response.data;
};

export const markNotificationRead = async (notificationId: string) => {
  const response = await axiosInstance.patch(`/notifications/${notificationId}/read`);
  return response.data;
};
