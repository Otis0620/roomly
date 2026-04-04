/**
 * Symbols used as injection tokens throughout the DI container.
 * Each key corresponds to a bound dependency in container.ts.
 */
export const IDENTIFIERS = {
  HttpClient: Symbol.for('HttpClient'),
  AuthApi: Symbol.for('AuthApi'),
  AuthService: Symbol.for('AuthService'),
};
