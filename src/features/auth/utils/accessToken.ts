let accessToken: string | null = null;

/**
 * Returns the current in-memory access token.
 *
 * @returns The access token, or null if not set
 */
export function getAccessToken(): string | null {
  return accessToken;
}

/**
 * Stores the access token in memory.
 *
 * @param token - JWT returned from the login endpoint
 */
export function setAccessToken(token: string): void {
  accessToken = token;
}

/**
 * Clears the in-memory access token.
 */
export function clearAccessToken(): void {
  accessToken = null;
}
