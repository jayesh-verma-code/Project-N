import React from "react";
import {
  Menu,
  ArrowLeftRight,
  AlertTriangle,
  Upload,
  Settings,
} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-16 bg-[#0b0f1a] flex flex-col items-center justify-between py-6 fixed left-0 top-0">
      {/* Top Icon - Hamburger */}
      <div className="text-white hover:text-blue-400 cursor-pointer">
        <Menu size={24} />
      </div>

      {/* Middle Icons */}
      <div className="flex flex-col gap-6 text-white">
        <div className="hover:text-blue-400 cursor-pointer">
          <ArrowLeftRight size={24} />
        </div>
        <div className="hover:text-blue-400 cursor-pointer">
          <AlertTriangle size={24} />
        </div>
        <div className="hover:text-blue-400 cursor-pointer">
          <Upload size={24} />
        </div>
      </div>

      {/* Bottom Icon */}
      <div className="text-white hover:text-blue-400 cursor-pointer">
        <Settings size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
