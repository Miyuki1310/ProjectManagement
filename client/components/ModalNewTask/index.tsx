import React from "react";
import Modal from "@/components/Modal";
import { Form, Formik } from "formik";
import FormInput from "@/components/FormInput";
import TextAreaInput from "@/components/FormInput/TextAreaInput";
import { format, formatISO } from "date-fns";
import * as Yup from "yup";
import { TaskPriority, TaskStatus, useCreateTaskMutation } from "@/state/api";
import SelectInput from "../FormInput/SelectInput";

const schema = Yup.object({
  title: Yup.string().required("Task title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string()
    .required("Status is required")
    .oneOf(
      Object.values(TaskStatus),
      "You must select a valid status: To Do, Work In Progress, Under Review, Completed",
    ),
  priority: Yup.string()
    .required("Priority is required")
    .oneOf(
      Object.values(TaskPriority),
      "You must select a valid priority: Urgent, High, Medium, Low, Backlog",
    ),
  tags: Yup.string().required("Tags is required"),
  startDate: Yup.date().required("Date is required"),
  dueDate: Yup.date().required("End date is required"),
  authorUserId: Yup.string().required("Author is required"),
  assignedUserId: Yup.string().required("Assigned is required"),
});
type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string | null;
};

interface InputType {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string;
  startDate: string;
  dueDate: string;
  authorUserId: string;
  assignedUserId: string;
}

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading, isError }] = useCreateTaskMutation();
  const handleSubmit = async (values: InputType) => {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      authorUserId,
      assignedUserId,
    } = values;
    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "date",
    }); // explain: formatISO is a function that formats the date to ISO format
    const formattedEndDate = formatISO(new Date(dueDate), {
      representation: "date",
    });
    const { data: tasks } = await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedEndDate,
      authorUserId: Number(authorUserId),
      assignedUserId: Number(assignedUserId),
      projectId: Number(id),
    });
    if (tasks) {
      onClose();
      return;
    } else {
      console.log("Error creating task");
    }
  };
  return (
    <Modal name="Create new task" isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={schema}
        initialValues={{
          title: "",
          description: "",
          status: TaskStatus.ToDo,
          priority: TaskPriority.Backlog,
          tags: "",
          startDate: format(new Date(), "yyyy-MM-dd"),
          dueDate: format(new Date(), "yyyy-MM-dd"),
          authorUserId: "",
          assignedUserId: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <FormInput
            label="Task Title"
            name="title"
            type="text"
            placeholder="Enter your task title"
          ></FormInput>
          <TextAreaInput
            label="Description"
            name="description"
            type="text"
            placeholder="Enter your description"
          ></TextAreaInput>
          <SelectInput
            options={[...Object.values(TaskStatus)]}
            name="status"
            label="Choose status"
          />
          <SelectInput
            options={[...Object.values(TaskPriority)]}
            name="priority"
            label="Choose priority"
          />
          <FormInput
            name="tags"
            placeholder="Enter your tags"
            type="text"
            label="Enter tags"
          />
          <FormInput
            label="Start Date"
            name="startDate"
            type="date"
          ></FormInput>
          <FormInput label="End Date" name="dueDate" type="date"></FormInput>

          <FormInput
            label="Enter author ID"
            placeholder="Author User ID"
            name="authorUserId"
          />
          <FormInput
            label="Enter Assignee ID"
            placeholder="Assignee User ID"
            name="assignedUserId"
          />

          <button
            type="submit"
            className={`w-full rounded-lg bg-blue-primary p-2 font-bold text-white ${isLoading ? "opacity-50" : ""}`}
          >
            {isLoading ? "Creating task..." : "Create new task"}
          </button>
          {isError && <div className="text-red-500">Error creating task</div>}
        </Form>
      </Formik>
    </Modal>
  );
};

export default ModalNewTask;
