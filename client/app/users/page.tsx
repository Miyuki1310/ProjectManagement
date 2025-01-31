"use client";
import Header from "@/components/ProjectPage/Header";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";
import { RootState, useGetUsersQuery } from "@/state/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (param) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${param.value}`}
            alt={param.row.username}
            width={32}
            height={32}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useSelector((state: RootState) => state.global.isDarkMode);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error</div>;
  return (
    <div className="mx-auto flex w-min flex-col p-8 md:w-1/2 lg:w-1/3">
      <Header name="Users" />
      <div className="" style={{ width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          pageSizeOptions={[10]}
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassName}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;
