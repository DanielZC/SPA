import {
  deleteProject,
  getProject,
  listProjects,
  storeProject,
  updateProject,
} from "@/api/services/project.services";
import type {
  ProjectInterface,
  ProjectResponse,
} from "@/interfaces/project.interface";
import { initialState, projectReducer } from "@/reducers/ProjectReducer";
import { createContext, useReducer, type PropsWithChildren } from "react";

interface ProjectContextProps {
  action: number;
  handleCreate: (data: ProjectInterface) => Promise<ProjectResponse>;
  handleUpdate: (
    id: number,
    data: ProjectInterface,
  ) => Promise<ProjectResponse>;
  handleGet: (id: number) => Promise<ProjectResponse>;
  handleDelete: (id: number) => Promise<ProjectResponse>;
  handleList: () => Promise<ProjectResponse>;
}

export const ProjectContext = createContext({} as ProjectContextProps);

export const ProjectContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const { action } = state;

  const handleCreate = async (
    projectData: ProjectInterface,
  ): Promise<ProjectResponse> => {
    const { success, errors, server } = await storeProject(projectData);

    if (!success) {
      return { success: success, errors: errors, server: server };
    }

    dispatch({ type: "ACTION" });
    return { success: success };
  };

  const handleUpdate = async (
    id: number,
    projectData: ProjectInterface,
  ): Promise<ProjectResponse> => {
    const { success, errors, server } = await updateProject(id, projectData);

    if (!success) {
      return { success: success, errors: errors, server: server };
    }

    dispatch({ type: "ACTION" });
    return { success: success };
  };

  const handleGet = async (id: number): Promise<ProjectResponse> => {
    const { success, server, data } = await getProject(id);
    if (!success) {
      return { success, server };
    }

    dispatch({ type: "ACTION" });
    const project = data as ProjectInterface;
    return { success, data: project };
  };
  const handleDelete = async (id: number): Promise<ProjectResponse> => {
    const { success, server, data } = await deleteProject(id);
    if (!success) {
      return { success, server };
    }

    dispatch({ type: "ACTION" });
    const project = data as ProjectInterface;
    return { success, data: project };
  };

  const handleList = async (): Promise<ProjectResponse> => {
    const { success, data, server } = await listProjects();
    if (!success) {
      return { success, server };
    }

    const projects = data as ProjectInterface[];
    return { success, data: projects };
  };

  return (
    <ProjectContext
      value={{
        action: action,
        handleCreate: handleCreate,
        handleUpdate: handleUpdate,
        handleGet: handleGet,
        handleDelete: handleDelete,
        handleList: handleList,
      }}
    >
      {children}
    </ProjectContext>
  );
};
