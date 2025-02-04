import React from "react";
import { Menu, Moon, Search, Settings, User } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleSidebar } from "@/state";
import { signOut } from "aws-amplify/auth";
import { useGetAuthUserQuery } from "@/state/api";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useDispatch();
  const { data: currentUser } = useGetAuthUserQuery({});
  console.log(currentUser?.accessToken);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  const userDetail = currentUser?.userDetail;

  const { isSidebarCollapsed } = useSelector((state: any) => state.global); // eslint-disable-line @typescript-eslint/no-explicit-any
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
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
        <div className="hidden items-center justify-between md:flex">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!userDetail?.profilePictureUrl ? (
              <Image
                src={`https://pm-3s-images.s3.us-east-1.amazonaws.com/${userDetail.profilePictureUrl}`}
                alt="profile"
                className="h-full rounded-full"
                width={100}
                height={50}
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white"></User>
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {userDetail?.username}
          </span>
          <button
            className="hover-bg-blue-500 hidden rounded bg-blue-400 px-4 py-2 text-lg font-bold text-white md:block"
            onClick={handleSignOut}
          >
            Signout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
