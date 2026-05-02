import type { AxiosError } from "axios";
import { apiResources } from "../api.config";
import type { ApiResponseBlock } from "@/interfaces/block.interface";
import type {
  ApiErrorAuth400,
  ApiResponse200,
} from "@/interfaces/api.interfaces";

const resultResponse: ApiResponseBlock = {
  status: 0,
  serverResponse: false,
  success: false,
  data: null,
  errors: null,
  server: null,
};

export const listBlocks = async (): Promise<ApiResponseBlock> => {
  const response = await apiResources
    .get("blocks/list")
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

export const getBlock = async (id: number): Promise<ApiResponseBlock> => {
  const response = await apiResources
    .get(`blocks/list/${id}`)
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

export const storeBlock = async (data: object): Promise<ApiResponseBlock> => {
  const response = await apiResources
    .post("blocks/store", data)
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

export const updateBlock = async (
  id: number,
  data: object,
): Promise<ApiResponseBlock> => {
  const response = await apiResources
    .put(`blocks/update/${id}`, data)
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

export const deleteBlock = async (id: number): Promise<ApiResponseBlock> => {
  const response = await apiResources
    .delete(`blocks/delete/${id}`)
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
