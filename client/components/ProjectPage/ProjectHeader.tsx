"use client";
import React from "react";
import Header from "./Header";
import {
  Briefcase,
  Clock,
  Filter,
  List,
  LucideIcon,
  Share,
  Table,
} from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

type TabButtonProps = {
  name: string;
  icon: LucideIcon;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [modelProjectOpen, setModelProjectOpen] = React.useState(false);
  return (
    <div className="px-4 xl:px-6">
      <div className="py-6 lg:pb-4 lg:pt-8">
        <Header name="Project Design Development" />
      </div>
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={Briefcase}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            icon={List}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={Clock}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            icon={Table}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-lg p-4 text-gray-500 hover:bg-gray-200 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-6 w-6"></Filter>
          </button>
          <button className="rounded-lg p-4 text-gray-500 hover:bg-gray-200 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share className="h-6 w-6"></Share>
          </button>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Table className="h-6 w-6"></Table>
            <input
              className="bg-transparent outline-none dark:text-gray-200"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({
  name,
  icon: Icon,
  activeTab,
  setActiveTab,
}: TabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-3 py-4 text-gray-500 ${isActive ? "text-blue-500" : ""} outline-none hover:bg-gray-200 dark:hover:bg-gray-900`}
      onClick={() => setActiveTab(name)}
    >
      <Icon className="h-6 w-6"></Icon>
      {name}
    </button>
  );
};

export default ProjectHeader;
