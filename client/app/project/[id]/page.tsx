"use client";
import ProjectHeader from "@/components/ProjectPage/ProjectHeader";
import { useParams } from "next/navigation";
import React from "react";
import BoardView from "@/app/project/BoardView";
import ListView from "@/app/project/ListView";
import TimeLine from "@/app/project/TimeLine";
import TableView from "@/app/project/TableView";
import ModalNewTask from "@/components/ModalNewTask";

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
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={projectId}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "List" && (
        <ListView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Timeline" && (
        <TimeLine
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Table" && (
        <TableView
          id={projectId}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};

export default ProjectPage;
