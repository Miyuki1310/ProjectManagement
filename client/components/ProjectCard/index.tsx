import { Project } from "@/state/api";
import { format } from "date-fns";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div>
      <div className="mb-3 flex flex-col gap-4 rounded-lg bg-white p-4 text-lg shadow dark:bg-dark-secondary dark:text-white">
        <div className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2">
            <span className="font-bold">ID:</span>
            <p>{project.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Title:</span>
            <p>{project.name}</p>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <span className="font-bold">Duration</span>
          <p>
            {project.startDate
              ? format(new Date(project.startDate), "P")
              : "Not set"}{" "}
            -{" "}
            {project.endDate
              ? format(new Date(project.endDate), "P")
              : "Not set"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold">Description:</span>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
