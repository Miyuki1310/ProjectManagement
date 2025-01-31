import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { TaskPriority } from "@/state/api";

const LowPage = () => {
  return (
    <div>
      <ReusablePriorityPage priority={TaskPriority.Low}></ReusablePriorityPage>
    </div>
  );
};

export default LowPage;
