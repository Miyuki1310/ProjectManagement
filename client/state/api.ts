import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}
export interface RootState {
  global: {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
  };
}
export enum TaskStatus {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum TaskPriority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}
 
export interface User {
  userId?: number;
  username: string;
  cognitoId?: string;
  profilePictureUrl?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface Search {
  tasks: Task[];
  projects: Project[];
  users: User[];
}

export interface Team {
  teamId: number;
  name: string;
  productOwnerUserId: number;
  projectManagerUserId: number;
  productOwnerUsername?: string;
  projectManagerUsername?: string;
}
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (header) => {
      const session = await fetchAuthSession();
      const accessToken = session?.tokens?.accessToken ?? {};
      if (accessToken) {
        header.set("Authorization", `Bearer ${accessToken}`);
      }
      return header;
    },
  }),
  reducerPath: "fetchApi",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        try {
          const user = await getCurrentUser();
          const sessions = await fetchAuthSession();
          if (!sessions) throw new Error("No session found");
          const { userSub } = sessions;
          const { accessToken } = sessions.tokens ?? {};

          const userDetailResponse = await baseQuery(`/users/${userSub}`);
          const userDetail = userDetailResponse.data as User;
          return { data: { userDetail, user, accessToken } };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
    getProjects: builder.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (body) => ({
        url: "projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"], // invalidates the cache for the "Project" tag mean that the cache for the "Project" tag will be cleared after this mutation
    }),
    getTasks: builder.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks" }], //explain: the cache for each task will be cleared after this query
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", taskId },
      ],
    }),
    getTasksByUser: builder.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),
    search: builder.query<Search, { query: string }>({
      query: ({ query }) => `search?query=${query}`,
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: builder.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
  }),
});

export const {} = api;
export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
  useGetTasksByUserQuery,
  useGetAuthUserQuery,
} = api;
