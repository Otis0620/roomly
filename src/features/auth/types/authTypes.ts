/**
 * Payload sent to the login endpoint.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Response returned from the login endpoint.
 */
export interface LoginResponse {
  token: string;
  user: AuthUser;
}

/**
 * Authenticated user returned after a successful login.
 */
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

/**
 * Permission level assigned to an authenticated user.
 */
export type UserRole = 'guest' | 'owner' | 'admin';
