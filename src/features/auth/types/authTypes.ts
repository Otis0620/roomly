export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

/**
 * Permission level assigned to an authenticated user.
 */
export type UserRole = 'guest' | 'owner' | 'admin';
