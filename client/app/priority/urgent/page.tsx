import React from "react";
import ReusablePriorityPage from "../reusablePriority";
import { TaskPriority } from "@/state/api";

const UrgentPage = () => {
  return (
    <div>
      <ReusablePriorityPage
        priority={TaskPriority.Urgent}
      ></ReusablePriorityPage>
    </div>
  );
};

export default UrgentPage;
