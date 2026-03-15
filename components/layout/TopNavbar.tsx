import { Bell } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      {/* Title Area */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 leading-none mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
          <span>View Mobile App</span>
        </button>
      </div>
    </header>
  );
}
