"use client";
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Lock,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/state";
// import { usePathname } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import Link from "next/link";

const Sidebar = () => {
  const [showProject, setShowProject] = React.useState(false);
  const [showPriority, setShowPriority] = React.useState(true);
  const dispatch = useDispatch();
  const { isSidebarCollapsed } = useSelector((state: any) => state.global);

  const sidebarClassname = `fixed flex-col h-full justify-between shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white ${!isSidebarCollapsed ? "w-0 hidden" : "w-64 flex"}`;
  return (
    <div className={sidebarClassname}>
      <div className="flex h-full w-full flex-col">
        {/* Logo  */}
        <div className="flex min-h-14 w-full items-center justify-between px-6">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            Miyuki
          </p>
          <X
            className="cursor-pointer p-1 text-gray-700"
            onClick={() => {
              dispatch(toggleSidebar(!isSidebarCollapsed));
            }}
          ></X>
        </div>
        <div className="flex items-center gap-4 border-y px-6 py-4 dark:border-gray-800">
          <Image width={30} height={30} src={logo} alt="logo" />
          <p className="text-md flex flex-col font-bold tracking-wide dark:text-gray-200">
            Miyuki Team
            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Lock size={14} />
              Private
            </span>
          </p>
        </div>
        <nav className="w-full">
          <SidebarLink href="/" icon={Home} label="Dashboard" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/user" icon={User} label="User" />
          <SidebarLink href="/team" icon={Users} label="Team" />
        </nav>
        <button
          className="flex items-center justify-between px-6 py-3 outline-none hover:bg-gray-200"
          onClick={() => setShowProject(!showProject)}
        >
          <p className="text-md font-medium">Project</p>
          {showProject ? <ChevronUp /> : <ChevronDown></ChevronDown>}
        </button>
        <button
          className="flex items-center justify-between px-6 py-3 outline-none hover:bg-gray-200"
          onClick={() => setShowPriority(!showPriority)}
        >
          <p className="text-md font-medium">Priority</p>
          {showPriority ? <ChevronUp /> : <ChevronDown></ChevronDown>}
        </button>
      </div>
      <div className="">Info</div>
    </div>
  );
};

export default Sidebar;
