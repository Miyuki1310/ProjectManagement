import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { TaskPriority } from "@/state/api";

const BackLogPage = () => {
  return (
    <div>
      <ReusablePriorityPage
        priority={TaskPriority.Backlog}
      ></ReusablePriorityPage>
    </div>
  );
};

export default BackLogPage;
