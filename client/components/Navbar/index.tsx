import React from "react";
import { Menu, Moon, Search, Settings } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleSidebar } from "@/state";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isSidebarCollapsed } = useSelector((state: any) => state.global);
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* SearchBar */}
      <div className="flex items-center gap-6">
        {isSidebarCollapsed ? null : (
          <button
            className="p-1"
            onClick={() => dispatch(toggleSidebar(!isSidebarCollapsed))}
          >
            <Menu className="h-6 w-6"></Menu>
          </button>
        )}
        <div className="flex h-min items-center gap-2 rounded-full border bg-gray-100 p-2 dark:border-none dark:bg-gray-900 dark:text-white">
          <Search className="h-5 w-5 cursor-pointer"></Search>
          <input
            className="bg-transparent outline-none"
            placeholder="Search..."
          ></input>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            dispatch(toggleDarkMode());
          }}
          className="rounded p-1 outline-none"
        >
          <Moon className="h-6 w-6 cursor-pointer dark:text-white"></Moon>
        </button>
        <Link
          href={"/settings"}
          className="h-min w-min rounded p-2 hover:bg-gray-100"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Navbar;
