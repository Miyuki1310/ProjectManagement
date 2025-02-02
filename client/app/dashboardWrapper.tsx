"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "@/app/redux";
import { useSelector } from "react-redux";
import { RootState } from "@/state/api";
// import AuthProvider from "./authProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarCollapsed, isDarkMode } = useSelector(
    (state: RootState) => state.global,
  );
  console.log(isSidebarCollapsed, isDarkMode);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* {sidebar} */}
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 text-gray-900 transition-all duration-300 dark:bg-dark-bg ${isSidebarCollapsed && "pl-64"}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {/* <AuthProvider> */}
      <DashboardLayout>{children}</DashboardLayout>
      {/* </AuthProvider> */}
    </StoreProvider>
  );
};

export default DashboardWrapper;
