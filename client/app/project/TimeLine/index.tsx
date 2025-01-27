"use client";
import { RootState, useGetTasksQuery } from "@/state/api";
import React from "react";
import { useSelector } from "react-redux";
import { Gantt, ViewMode, DisplayOption } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const TimeLine = ({ id, setIsModalNewTaskOpen }: Props) => {
  const { isDarkMode } = useSelector((state: RootState) => state.global);
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(id) });
  console.log(isDarkMode);
  const [displayOption, setDisplayOption] = React.useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });
  const ganttTask = React.useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);
  const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOption((prev) => ({
      ...prev,
      viewMode: e.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div className="text-xl font-bold">Loading...</div>;
  if (isError) return <div className="text-xl font-bold">Error</div>;
  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-xl font-bold dark:text-white">
          Project Task Timeline
        </h1>
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
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1e6"}
          ></Gantt>
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => {
              setIsModalNewTaskOpen(true);
            }}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
