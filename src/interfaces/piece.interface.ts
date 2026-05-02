import type { ServerErrorsInterface } from "./api.interfaces";

export interface PieceInterface {
  id?: number;
  name: string;
  standard_weight: string;
  real_weight: string;
  block_id: number;
  status: string;
  weight_difference?: number;
}

export interface ApiResponsePiece {
  status: null | number;
  serverResponse: boolean;
  success: boolean;
  data: [] | object | null;
  errors: object | null;
  server: ServerErrorsInterface | null;
}

export interface PieceResponse {
  created?: boolean;
  data?: PieceInterface[] | PieceInterface;
  success: boolean;
  errors?: object | null;
  server?: ServerErrorsInterface | null;
}

export interface PieceErrorsInterface {
  project_id: string[];
  name: string[];
  description: string[];
}
