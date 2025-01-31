import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { TaskPriority } from "@/state/api";

const MediumPage = () => {
  return (
    <div>
      <ReusablePriorityPage
        priority={TaskPriority.Medium}
      ></ReusablePriorityPage>
    </div>
  );
};

export default MediumPage;
