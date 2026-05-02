import type { AxiosError } from "axios";
import { apiResources } from "../api.config";
import type { ApiResponsePiece } from "@/interfaces/piece.interface";
import type {
  ApiErrorAuth400,
  ApiResponse200,
} from "@/interfaces/api.interfaces";

const resultResponse: ApiResponsePiece = {
  status: 0,
  serverResponse: false,
  success: false,
  data: null,
  errors: null,
  server: null,
};

export const listPieces = async (): Promise<ApiResponsePiece> => {
  const response = await apiResources
    .get("pieces/list")
    .then((response) => {
      const { data } = response.data as ApiResponse200;
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

export const getPiece = async (id: number): Promise<ApiResponsePiece> => {
  const response = await apiResources
    .get(`pieces/list/${id}`)
    .then((response) => {
      const { data } = response.data as ApiResponse200;

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

export const storePiece = async (data: object): Promise<ApiResponsePiece> => {
  const response = await apiResources
    .post("pieces/store", data)
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

export const updatePiece = async (
  id: number,
  data: object,
): Promise<ApiResponsePiece> => {
  const response = await apiResources
    .put(`pieces/update/${id}`, data)
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

export const deletePiece = async (id: number): Promise<ApiResponsePiece> => {
  const response = await apiResources
    .delete(`pieces/delete/${id}`)
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
