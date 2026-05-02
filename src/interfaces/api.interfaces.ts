export interface ServerErrorsInterface {
  error: string;
  reason: string;
}

export interface ApiResponse {
  status: null | number;
  serverResponse: boolean;
  success: boolean;
  data: LoginData | null;
  errors: object | null;
  server: ServerErrorsInterface | null;
}

export interface ApiErrorAuth400 {
  errors: object;
}

export interface ApiResponseProject200 {
  data: [] | object;
}

export interface ApiResponse200 {
  data: [] | object;
}

export interface LoginData {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: null | string;
    created_at: null | string;
    updated_at: null | string;
  };
  token: string;
}
