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
  const [showPriority, setShowPriority] = React.useState(false);
  const dispatch = useDispatch();
  const { isSidebarCollapsed } = useSelector((state: any) => state.global);

  const sidebarClassname = `fixed flex flex-col h-full justify-between shadow-xl gap-8 transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white no-scrollbar ${!isSidebarCollapsed ? "w-0" : "w-64"}`;
  return (
    <div className={sidebarClassname}>
      <div className="flex w-full flex-col">
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
        <div className="transition-all duration-300">
          <button
            className="flex w-full items-center justify-between px-6 py-3 outline-none hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setShowProject(!showProject)}
          >
            <p className="text-md font-medium dark:text-gray-200">Project</p>
            {showProject ? (
              <ChevronUp className="dark:text-gray-200" />
            ) : (
              <ChevronDown className="dark:text-gray-200"></ChevronDown>
            )}
          </button>
          {showProject && (
            <nav className="">
              <SidebarLink href="/" icon={Home} label="Dashboard" />
              <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
              <SidebarLink href="/search" icon={Search} label="Search" />
              <SidebarLink href="/settings" icon={Settings} label="Settings" />
              <SidebarLink href="/user" icon={User} label="User" />
              <SidebarLink href="/team" icon={Users} label="Team" />
            </nav>
          )}
        </div>
        <div className="">
          <button
            className="flex w-full items-center justify-between px-6 py-3 outline-none hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setShowPriority(!showPriority)}
          >
            <p className="text-md font-medium dark:text-gray-200">Priority</p>
            {showPriority ? (
              <ChevronUp className="dark:text-gray-200" />
            ) : (
              <ChevronDown className="dark:text-gray-200" />
            )}
          </button>
          {showPriority && (
            <nav className="">
              <SidebarLink href="/" icon={Home} label="Dashboard" />
              <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
              <SidebarLink href="/search" icon={Search} label="Search" />
              <SidebarLink href="/settings" icon={Settings} label="Settings" />
              <SidebarLink href="/user" icon={User} label="User" />
              <SidebarLink href="/team" icon={Users} label="Team" />
            </nav>
          )}
        </div>
      </div>
      <div className="">
        <p className="text-lg font-bold">This is our info</p>
      </div>
    </div>
  );
};

export default Sidebar;
