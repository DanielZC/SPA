import type { AxiosError } from "axios";
import { apiResources } from "../api.config";
import type {
  ApiErrorAuth400,
  ApiResponseProject200,
} from "@/interfaces/api.interfaces";
import type { ApiResponseProject } from "@/interfaces/project.interface";

const resultResponse: ApiResponseProject = {
  status: 0,
  serverResponse: false,
  success: false,
  data: null,
  errors: null,
  server: null,
};

export const listProjects = async (): Promise<ApiResponseProject> => {
  const response = await apiResources
    .get("projects/list")
    .then((response) => {
      const { data } = response.data as ApiResponseProject200;
      return {
        ...resultResponse,
        status: response.status,
        success: true,
        data: data,
      };
    })
    .catch((error: AxiosError) => {
      error.response?.data;
      if (!error.response) {
        return {
          ...resultResponse,
          status: null,
          server: {
            error: "Error de conexion con el servidor",
            reason: "No se pudo establecer una conexion con el servidor",
          },
        };
      }

      return {
        ...resultResponse,
        status: error.response.status,
        serverResponse: true,
        server: {
          error: "Ha ocurrido un error con el servidor",
          reason: "Fallo del servidor al intentar responder la solicitud",
        },
      };
    });

  return response;
};

export const getProject = async (id: number): Promise<ApiResponseProject> => {
  const response = await apiResources
    .get(`projects/list/${id}`)
    .then((response) => {
      const { data } = response.data as ApiResponseProject200;

      return {
        ...resultResponse,
        status: response.status,
        success: true,
        data: data,
      };
    })
    .catch((error: AxiosError) => {
      error.response?.data;
      if (!error.response) {
        return {
          ...resultResponse,
          status: null,
          server: {
            error: "Error de conexion con el servidor",
            reason: "No se pudo establecer una conexion con el servidor",
          },
        };
      }

      return {
        ...resultResponse,
        status: error.response.status,
        serverResponse: true,
        server: {
          error: "Ha ocurrido un error con el servidor",
          reason: "Fallo del servidor al intentar responder la solicitud",
        },
      };
    });

  return response;
};

export const storeProject = async (
  data: object,
): Promise<ApiResponseProject> => {
  const response = await apiResources
    .post("projects/store", data)
    .then((response) => {
      return {
        ...resultResponse,
        status: response.status,
        success: true,
        data: data,
      };
    })
    .catch((error: AxiosError) => {
      error.response?.data;
      if (!error.response) {
        return {
          ...resultResponse,
          status: null,
          server: {
            error: "Error de conexion con el servidor",
            reason: "No se pudo establecer una conexion con el servidor",
          },
        };
      }
      if (error.response.status == 400) {
        const { errors } = error.response.data as ApiErrorAuth400;
        return {
          ...resultResponse,
          status: error.response.status,
          serverResponse: true,
          errors: errors,
        };
      } else {
        return {
          ...resultResponse,
          status: error.response.status,
          serverResponse: true,
          server: {
            error: "Ha ocurrido un error con el servidor",
            reason: "Fallo del servidor al intentar responder la solicitud",
          },
        };
      }
    });

  return response;
};

export const updateProject = async (
  id: number,
  data: object,
): Promise<ApiResponseProject> => {
  const response = await apiResources
    .put(`projects/update/${id}`, data)
    .then((response) => {
      return {
        ...resultResponse,
        status: response.status,
        success: true,
        data: response.data,
      };
    })
    .catch((error: AxiosError) => {
      error.response?.data;
      if (!error.response) {
        return {
          ...resultResponse,
          status: null,
          server: {
            error: "Error de conexion con el servidor",
            reason: "No se pudo establecer una conexion con el servidor",
          },
        };
      }
      if (error.response.status == 400) {
        const { errors } = error.response.data as ApiErrorAuth400;
        return {
          ...resultResponse,
          status: error.response.status,
          serverResponse: true,
          errors: errors,
        };
      } else {
        return {
          ...resultResponse,
          status: error.response.status,
          serverResponse: true,
          server: {
            error: "Ha ocurrido un error con el servidor",
            reason: "Fallo del servidor al intentar responder la solicitud",
          },
        };
      }
    });

  return response;
};

export const deleteProject = async (
  id: number,
): Promise<ApiResponseProject> => {
  const repsonse = await apiResources
    .delete(`projects/delete/${id}`)
    .then((response) => {
      return {
        ...resultResponse,
        status: response.status,
        success: true,
        data: response.data,
      };
    })
    .catch((error: AxiosError) => {
      error.response?.data;
      if (!error.response) {
        return {
          ...resultResponse,
          status: null,
          server: {
            error: "Error de conexion con el servidor",
            reason: "No se pudo establecer una conexion con el servidor",
          },
        };
      }
      if (error.response.status == 400) {
        const { errors } = error.response.data as ApiErrorAuth400;
        return {
          ...resultResponse,
          status: error.response.status,
          serverResponse: true,
          errors: errors,
        };
      } else {
        return {
          ...resultResponse,
          status: error.response.status,
          serverResponse: true,
          server: {
            error: "Ha ocurrido un error con el servidor",
            reason: "Fallo del servidor al intentar responder la solicitud",
          },
        };
      }
    });
  return repsonse;
};
