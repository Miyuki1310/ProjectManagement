"use client";
import { columns } from "@/app/project/TableView";
import ModalNewTask from "@/components/ModalNewTask";
import Header from "@/components/ProjectPage/Header";
import TaskCard from "@/components/TaskCard";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";
import {
  RootState,
  TaskPriority,
  useGetAuthUserQuery,
  useGetTasksByUserQuery,
} from "@/state/api";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  priority: TaskPriority;
};

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = React.useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = React.useState(false);
  const { data: currentUser } = useGetAuthUserQuery({});
  const userId = currentUser?.userDetail?.userId || null;
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksByUserQuery(userId || 0, { skip: userId === null });
  const { isDarkMode } = useSelector((state: RootState) => state.global);

  const filteredTasks =
    tasks?.filter((task) => task.priority === priority) || [];

  if (isLoading) return <div className="text-lg font-bold">Loading...</div>;
  if (isError || !tasks)
    return <div className="text-lg font-bold">Error fetching data</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      ></ModalNewTask>
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-300"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"} rounded-lg outline-none`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"} rounded-lg outline-none`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <p className="text-lg font-bold">Loading...</p>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => {
            return <TaskCard key={task.id} task={task}></TaskCard>;
          })}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassName}
              sx={dataGridSxStyles(isDarkMode)}
            ></DataGrid>
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
