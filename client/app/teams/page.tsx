"use client";
import Header from "@/components/ProjectPage/Header";
import { dataGridClassName, dataGridSxStyles } from "@/lib/utils";
import { RootState, useGetTeamsQuery } from "@/state/api";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
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

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useSelector((state: RootState) => state.global.isDarkMode);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error</div>;
  return (
    <div className="mx-auto flex w-min flex-col px-8 py-8 md:px-24">
      <Header name="Teams" />
      <div className="">
        <DataGrid
          rows={teams || []}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
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

export default Teams;
