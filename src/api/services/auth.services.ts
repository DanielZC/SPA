import type { AxiosError } from "axios";
import { apiAuth } from "../api.config";
import type {
  LoginInterface,
  RegisterInterface,
} from "@/interfaces/auth.interfaces";
import type { ApiErrorAuth400, ApiResponse } from "@/interfaces/api.interfaces";

const resultResponse: ApiResponse = {
  status: 0,
  serverResponse: false,
  success: false,
  data: null,
  errors: null,
  server: null,
};

export const login = async (data: LoginInterface): Promise<ApiResponse> => {
  const response: ApiResponse = await apiAuth
    .post("/login", data)
    .then((response) => {
      return {
        ...resultResponse,
        status: response.status,
        serverResponse: true,
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

export const register = async (data: RegisterInterface) => {
  const response: ApiResponse = await apiAuth
    .post("/register", data)
    .then((response) => {
      return {
        ...resultResponse,
        status: response.status,
        serverResponse: true,
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

export const logout = async (): Promise<boolean> => {
  apiAuth.defaults.headers.common["Authorization"] =
    `Bearer ${localStorage.getItem("token")}`;
  const response = await apiAuth
    .post(`/logout`)
    .then((_response) => {
      return true;
    })
    .catch((_error: AxiosError) => {
      return false;
    });
  return response;
};
