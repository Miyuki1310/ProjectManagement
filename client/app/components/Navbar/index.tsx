import React from "react";
import { Search, Settings } from "lucide-react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black  ">
      {/* SearchBar */}
      <div className="flex items-center gap-8">
        <div className="flex h-min p-2 border rounded-full gap-2 items-center bg-gray-100 dark:bg-gray-900 dark:text-white">
          <Search className="cursor-pointer w-5 h-5"></Search>
          <input
            className="outline-none bg-transparent"
            placeholder="Search..."
          ></input>
        </div>
      </div>
      <div className="flex items-center">
        <Link
          href={"/settings"}
          className="h-min w-min rounded p-2 hover:bg-gray-100"
        >
          <Settings className=" h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Navbar;
