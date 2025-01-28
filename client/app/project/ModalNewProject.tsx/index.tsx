import FormInput from "@/components/FormInput";
import TextAreaInput from "@/components/FormInput/TextAreaInput";
import { useCreateProjectMutation } from "@/state/api";
import { format, formatISO } from "date-fns";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface InputType {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
}
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const schema = Yup.object({
  projectName: Yup.string().required("Project name is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Date is required"),
  endDate: Yup.date().required("End date is required"),
});

const ModalNewProject = ({ onClose }: Props) => {
  const [createProject, { isLoading, isError }] = useCreateProjectMutation();

  const handleSubmit = async (values: InputType) => {
    const { projectName, description, startDate, endDate } = values;
    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "date",
    }); // explain: formatISO is a function that formats the date to ISO format
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "date",
    });
    const { data: project } = await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    if (project) {
      onClose();
      return;
    }
  };
  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={{
          projectName: "",
          description: "",
          startDate: format(new Date(), "yyyy-MM-dd"),
          endDate: format(new Date(), "yyyy-MM-dd"),
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <FormInput
            label="Project Name"
            name="projectName"
            type="text"
            placeholder="Enter your project name"
          ></FormInput>
          <TextAreaInput
            label="Description"
            name="description"
            type="text"
            placeholder="Enter your description"
          ></TextAreaInput>
          <FormInput
            label="Start Date"
            name="startDate"
            type="date"
          ></FormInput>
          <FormInput label="End Date" name="endDate" type="date"></FormInput>

          <button
            type="submit"
            className={`w-full rounded-lg bg-blue-primary p-2 font-bold text-white ${isLoading ? "opacity-50" : ""}`}
          >
            {isLoading ? "Creating task..." : "Create new task"}
          </button>
          {isError && <div className="text-red-500">Error creating task</div>}
        </Form>
      </Formik>
    </div>
  );
};

export default ModalNewProject;
