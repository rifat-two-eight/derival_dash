"use client";

import { useState } from "react";
import { 
  Bell, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  MoreVertical,
  Trash2,
  Check
} from "lucide-react";

// Mock Notifications
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "success",
    title: "Payment Received",
    message: "A payment of $500 has been received for the 'Family Saving Circle' group.",
    time: "2 minutes ago",
    isRead: false
  },
  {
    id: 2,
    type: "info",
    title: "New Member Joined",
    message: "Sarah Jenkins has joined the 'Labib Circle' group.",
    time: "1 hour ago",
    isRead: false
  },
  {
    id: 3,
    type: "warning",
    title: "Payment Overdue",
    message: "John Doe's payment for 'Family Saving Circle' is 2 days overdue.",
    time: "5 hours ago",
    isRead: true
  },
  {
    id: 4,
    type: "error",
    title: "Transaction Failed",
    message: "Attempt to distribute funds for 'Weekly Savings' failed due to bank error.",
    time: "Yesterday",
    isRead: true
  },
  {
    id: 5,
    type: "success",
    title: "Group Completed",
    message: "The 12-month cycle for 'Retirement Plan A' has been successfully completed.",
    time: "2 days ago",
    isRead: true
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-2 rounded-lg">
            <Bell className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <p className="text-xs text-gray-500">Stay updated with your platform's latest activities</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={markAllAsRead}
            className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
          >
            Mark all as read
          </button>
          <button 
            onClick={() => setNotifications([])}
            className="text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <NotificationItem 
              key={n.id} 
              notification={n} 
              onMarkAsRead={() => markAsRead(n.id)}
              onDelete={() => deleteNotification(n.id)}
            />
          ))
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Bell className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">All caught up!</h3>
            <p className="text-sm text-gray-500">You don't have any new notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({ notification: n, onMarkAsRead, onDelete }: { notification: any, onMarkAsRead: () => void, onDelete: () => void }) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    info: <Info className="w-5 h-5 text-indigo-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-orange-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />
  };

  const bgs = {
    success: "bg-emerald-50",
    info: "bg-indigo-50",
    warning: "bg-orange-50",
    error: "bg-red-50"
  };

  return (
    <div className={`group bg-white p-6 rounded-2xl border transition-all ${
      n.isRead ? "border-gray-100 opacity-70" : "border-indigo-100 shadow-sm"
    } relative overflow-hidden`}>
      {!n.isRead && (
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600" />
      )}
      
      <div className="flex gap-4">
        <div className={`${bgs[n.type as keyof typeof bgs]} w-12 h-12 rounded-2xl flex items-center justify-center shrink-0`}>
          {icons[n.type as keyof typeof icons]}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">{n.title}</h3>
            <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {n.time}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed md:max-w-xl">
            {n.message}
          </p>
          <div className="pt-2 flex items-center gap-4">
            {!n.isRead && (
              <button 
                onClick={onMarkAsRead}
                className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline"
              >
                <Check className="w-3 h-3" />
                Mark as read
              </button>
            )}
            <button 
              onClick={onDelete}
              className="text-[10px] font-bold text-red-500 flex items-center gap-1 hover:underline group-hover:visible"
            >
              <Trash2 className="w-3 h-3" />
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
