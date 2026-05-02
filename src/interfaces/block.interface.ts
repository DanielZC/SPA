import type { ServerErrorsInterface } from "./api.interfaces";

export interface BlockInterface {
  id?: number;
  project_id: number;
  name: string;
  description: string;
}

export interface ApiResponseBlock {
  status: null | number;
  serverResponse: boolean;
  success: boolean;
  data: [] | object | null;
  errors: object | null;
  server: ServerErrorsInterface | null;
}

export interface BlockResponse {
  created?: boolean;
  data?: BlockInterface[] | BlockInterface;
  success: boolean;
  errors?: object | null;
  server?: ServerErrorsInterface | null;
}

export interface BlockErrorsInterface {
  project_id: string[];
  name: string[];
  description: string[];
}
