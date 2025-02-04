"use client";
import {
  AppWindow,
  BatteryMedium,
  BookCheck,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Highlighter,
  Home,
  Lock,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/state";
import { RootState, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import { useGetAuthUserQuery } from "@/state/api";

const Sidebar = () => {
  const [showProject, setShowProject] = React.useState(false);
  const [showPriority, setShowPriority] = React.useState(false);
  const { data: projects } = useGetProjectsQuery();

  const dispatch = useDispatch();
  const { isSidebarCollapsed } = useSelector(
    (state: RootState) => state.global,
  );

  const { data: currentUser } = useGetAuthUserQuery({});
  console.log(currentUser?.accessToken);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  const userDetail = currentUser?.userDetail;

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
          <Image
            width={30}
            height={30}
            src="https://pm-3s-images.s3.us-east-1.amazonaws.com/logo.png"
            alt="logo"
          />
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
          <SidebarLink href="/users" icon={User} label="User" />
          <SidebarLink href="/teams" icon={Users} label="Team" />
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
              {projects?.map((project) => {
                return (
                  <SidebarLink
                    key={project.id}
                    href={`/project/${project.id}`}
                    label={project.name}
                    icon={AppWindow}
                  />
                );
              })}
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
              <SidebarLink
                href="/priority/urgent"
                icon={ShieldAlert}
                label="Urgent"
              />
              <SidebarLink href="/priority/low" icon={Briefcase} label="Low" />
              <SidebarLink
                href="/priority/backlog"
                icon={BookCheck}
                label="Back log"
              />
              <SidebarLink
                href="/priority/high"
                icon={Highlighter}
                label="High"
              />
              <SidebarLink
                href="/priority/medium"
                icon={BatteryMedium}
                label="Medium"
              />
            </nav>
          )}
        </div>
      </div>
      <div className="">
        <div className="hidden items-center justify-between md:flex">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!userDetail?.profilePictureUrl ? (
              <Image
                src={`https://pm-3s-images.s3.us-east-1.amazonaws.com/${userDetail.profilePictureUrl}`}
                alt="profile"
                className="h-full rounded-full"
                width={100}
                height={50}
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white"></User>
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {userDetail?.username}
          </span>
          <button
            className="hover-bg-blue-500 md-block hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white"
            onClick={handleSignOut}
          >
            Signout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
