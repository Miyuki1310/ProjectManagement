import Header from "@/components/ProjectPage/Header";
import { RootState, useGetTasksQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";
import { useSelector } from "react-redux";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      return (
        <span className="text-md items-center rounded-full bg-green-100 px-2 py-1 font-semibold text-green-600">
          {params.value}
        </span>
      );
    },
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => {
      return params.value.username;
    },
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(id) });
  const { isDarkMode } = useSelector((state: RootState) => state.global);
  if (isLoading) return <div className="text-xl font-bold">Loading...</div>;
  if (isError) return <div className="text-xl font-bold">Error</div>;
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          isSmallText
          buttonComponent={
            <button
              className="flex items-center rounded-lg bg-blue-primary px-3 py-2 text-lg font-semibold text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        className={dataGridClassName}
        sx={dataGridSxStyles(isDarkMode)}
      ></DataGrid>
    </div>
  );
};

export default TableView;
