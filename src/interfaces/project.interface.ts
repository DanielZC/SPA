import type { ServerErrorsInterface } from "./api.interfaces";

export interface ProjectInterface {
  id?: number;
  name: string;
  description: string;
  status: string;
}

export interface ApiResponseProject {
  status: null | number;
  serverResponse: boolean;
  success: boolean;
  data: [] | object | null;
  errors: object | null;
  server: ServerErrorsInterface | null;
}

export interface ProjectResponse {
  created?: boolean;
  data?: ProjectInterface[] | ProjectInterface;
  success: boolean;
  errors?: object | null;
  server?: ServerErrorsInterface | null;
}

export interface ProjectErrorsInterface {
  name: string[];
  description: string[];
  status: string[];
}
