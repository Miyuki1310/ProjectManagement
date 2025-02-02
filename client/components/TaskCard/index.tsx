import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-3 flex flex-col gap-4 rounded-lg bg-white p-4 text-lg shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`https://pm-3s-images.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
                alt={`${task.attachments[0].fileName}`}
                width={400}
                height={200}
                className="h-auto w-full rounded-t-md"
              />
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between text-xl">
        <div className="flex items-center gap-2">
          <span className="font-bold">ID:</span>
          <p>{task.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Title:</span>
          <p>{task.title}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2">
        <span className="font-bold">Duration</span>
        <p>
          {task.startDate ? format(new Date(task.startDate), "P") : "Not set"} -{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold">Description:</span>
        <p>{task.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">Author:</span>
        <p>{task.author?.username}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">Assignee:</span>
        <p>{task.assignee?.username}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">Status:</span>
        <p>{task.status}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold">Tags:</span>
        <p>{task.tags}</p>
      </div>
    </div>
  );
};

export default TaskCard;
