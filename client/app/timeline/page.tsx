"use client";
import { RootState, useGetProjectsQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import React from "react";
import { useSelector } from "react-redux";
import { TaskTypeItems } from "../project/TimeLine";
import Header from "@/components/ProjectPage/Header";

const TimeLine = () => {
  const { isDarkMode } = useSelector((state: RootState) => state.global);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  console.log(isDarkMode);
  const [displayOption, setDisplayOption] = React.useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  const ganttTask = React.useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);
  const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOption((prev) => ({
      ...prev,
      viewMode: e.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div className="text-xl font-bold">Loading...</div>;
  if (isError || !projects)
    return <div className="text-xl font-bold">Error fetching task</div>;
  return (
    <div className="max-w-full p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 py-5">
        <Header name="Projects Timeline" />
        <div className="flex w-64 dark:bg-gray-800">
          <select
            name=""
            id=""
            value={displayOption.viewMode}
            className="flex-1 appearance-none rounded-lg border border-gray-300 bg-transparent p-2 outline-none hover:cursor-pointer hover:shadow-sm dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200"
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTask}
            {...displayOption}
            columnWidth={displayOption.viewMode === ViewMode.Month ? 200 : 150}
            listCellWidth="150px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1F2937"}
            projectProgressColor={isDarkMode ? "#1F2937" : "#AEB8C2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9BA1A6"}
          ></Gantt>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
