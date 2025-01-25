"use client";
import ProjectHeader from "@/components/ProjectPage/ProjectHeader";
import { useParams } from "next/navigation";
import React from "react";
import BoardView from "../BoardView";

// type Props = {
//   params: {
//     id: string;
//   };
// };

const ProjectPage = () => {
  const projectId = String(useParams().id);
  const [activeTab, setActiveTab] = React.useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] =
    React.useState<boolean>(false);
  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};

export default ProjectPage;
