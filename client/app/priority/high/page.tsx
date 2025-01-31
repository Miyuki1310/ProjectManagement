import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { TaskPriority } from "@/state/api";

const HighPage = () => {
  return (
    <div>
      <ReusablePriorityPage priority={TaskPriority.High}></ReusablePriorityPage>
    </div>
  );
};

export default HighPage;
