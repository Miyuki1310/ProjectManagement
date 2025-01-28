import { Task, useGetTasksQuery, useUpdateTaskMutation } from "@/state/api";
import { EllipsisVertical, Plus } from "lucide-react";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { format } from "date-fns";
import Image from "next/image";
type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under View", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskMutation(); // we must have [updateTaskStatus] to avoid infinite loop in useEffect
  const moveTask = (taskId: number, status: string) => {
    updateTaskStatus({ taskId: taskId, status: status });
  };
  if (isLoading) return <div className="text-xl font-bold">Loading...</div>;
  if (isError) return <div className="text-xl font-bold">Error</div>;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            task={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

interface TaskColumnProps {
  status: string;
  task: Task[];
  moveTask: (taskId: number, status: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = ({
  status,
  task,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { taskId: number }) => moveTask(item.taskId, status),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const taskCounter = task.filter((t) => t.status === status).length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusColor: any = {
    "To Do": "bg-red-500",
    "Work In Progress": "bg-yellow-500",
    "Under View": "bg-blue-500",
    Completed: "bg-green-500",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-lg py-2 xl:px-2 xl:py-4 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 ${statusColor[status]} rounded-s-lg`}
          style={{ background: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {taskCounter}
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <button className="flex rounded-lg p-2 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800">
              <EllipsisVertical className="h-5 w-5" />
            </button>
            <button
              className="flex rounded-lg p-1 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {task
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCark key={task.id} task={task} />
        ))}
    </div>
  );
};

const TaskCark = ({ task }: { task: Task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { taskId: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const taskTagsSplit = task.tags ? task.tags?.split(",") : [];
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  // const numberOfComments = task?.comments?.length || 0;

  const PriorityTag = ({ priority }: { priority: Task["priority"] }) => {
    return (
      <div
        className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent" ? "bg-red-200 text-red-500" : priority === "High" ? "bg-yellow-200 text-yellow-700" : priority === "Medium" ? "bg-green-200 text-green-700" : priority === "Low" ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-gray-500"}`}
      >
        {priority}
      </div>
    );
  };

  return (
    <div
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
      ref={(instance) => {
        drag(instance);
      }}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={`${task.attachments[0].fileName}`}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => {
                return (
                  <div
                    key={tag}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <button className="flex flex-shrink-0 items-center justify-center rounded-lg p-1 hover:bg-gray-200 dark:text-neutral-500 dark:hover:bg-gray-800">
            <EllipsisVertical className="h-6 w-6" />
          </button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-lg font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-md font-semibold dark:text-white">
              {task.points} points
            </div>
          )}
        </div>

        <div className="text-md mb-3 text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate}</span>}
          {formattedDueDate && <span> - {formattedDueDate}</span>}
        </div>
        <p className="text-md font-semibold text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark"></div>

        <div className="mt-3 flex items-center -space-x-2">
          {task.assignee && (
            <Image
              src={`/${task.assignee.profilePictureUrl!}`}
              alt={task.assignee.username}
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
            />
          )}
          {task.author && (
            <Image
              src={`/${task.author.profilePictureUrl}`}
              alt={task.author.username}
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default BoardView;
