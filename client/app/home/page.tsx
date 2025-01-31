"use client";
import Header from "@/components/ProjectPage/Header";
import {
  RootState,
  Task,
  TaskPriority,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  Cell,
} from "recharts";
import { useSelector } from "react-redux";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";

const taskColumns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 150,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 150,
  },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: 1 });

  const { data: projects, isLoading: isProjectLoading } = useGetProjectsQuery();
  const { isDarkMode } = useSelector((state: RootState) => state.global);
  if (isLoading || isProjectLoading) return <div>Loading...</div>;
  if (isError || !tasks || !projects) return <div>Error fetching data</div>;
  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as TaskPriority] = (acc[priority as TaskPriority] || 0) + 1;
      return acc;
    },
    {},
  );
  console.log(priorityCount);

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key as TaskPriority],
  }));
  console.log(taskDistribution);
  const statusCount = projects.reduce(
    (acc: Record<string, number>, project) => {
      const projectDate = project.endDate
        ? new Date(project.endDate.split(" ")[0])
        : new Date();

      const status =
        projectDate <= new Date(2024, 1, 1) ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const charColors = isDarkMode
    ? { bar: "#8884d8", barGrid: "#303030", pieFill: "#4a90e2", text: "#fff" }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82CA9D",
        text: "#000",
      };

  return (
    <div className="container h-full w-full bg-gray-100 bg-transparent p-8">
      <Header name="Project Management Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={charColors.barGrid}
              />
              <XAxis dataKey="name" stroke={charColors.text} />
              <YAxis stroke={charColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill={charColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d">
                {projectStatus.map((entry, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  );
                })}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <div className="">
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={isLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassName}
              sx={dataGridSxStyles(isDarkMode)}
            ></DataGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
