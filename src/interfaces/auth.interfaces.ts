import type { LoginData, ServerErrorsInterface } from "./api.interfaces";

export interface AuthResponse {
  auth?: boolean | null;
  registered?: boolean;
  data?: null | LoginData;
  errors: object | null;
  server?: ServerErrorsInterface | null;
}

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginErrorsInterface {
  name: string[];
  email: string[];
  auth?: string[];
}

export interface RegisterErrorsInterface {
  name: string[];
  email: string[];
  password: string[];
  password_confirmation: string[];
}

export interface ServerErrorInteface {
  error: string;
  reason: string;
}
