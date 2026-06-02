export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthRespose {
  success: boolean;
  message?: string;
  accessToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
