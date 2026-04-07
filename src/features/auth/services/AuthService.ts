import { inject, injectable } from 'inversify';

import { IDENTIFIERS } from '@/core/di/identifiers';
import type { AuthUser } from '@/core/types/userTypes';

import type { AuthApi } from '../api/AuthApi';
import type { LoginRequest } from '../types/authTypes';
import { setAccessToken } from '../utils/accessToken';

@injectable()
export class AuthService {
  /**
   * @param authApi - The authentication API client
   */
  constructor(@inject(IDENTIFIERS.AuthApi) private readonly authApi: AuthApi) {}

  /**
   * Authenticates a user and stores the returned access token.
   *
   * @param credentials - User email and password
   * @returns The authenticated user
   */
  async login(credentials: LoginRequest): Promise<AuthUser> {
    const { user, token } = await this.authApi.login(credentials);

    setAccessToken(token);

    return user;
  }
}
