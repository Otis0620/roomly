import { inject, injectable } from 'inversify';

import type { IHttpClient } from '@/core/api/IHttpClient';
import { IDENTIFIERS } from '@/core/di/identifiers';

import type { LoginRequest, LoginResponse } from '../types/authTypes';

/**
 * Handles all HTTP requests for the auth feature.
 */
@injectable()
export class AuthApi {
  constructor(@inject(IDENTIFIERS.HttpClient) private readonly httpClient: IHttpClient) {}

  /**
   * Sends login credentials to the auth endpoint.
   *
   * @param data - User email and password
   * @returns Token on successful authentication
   */
  login(data: LoginRequest): Promise<LoginResponse> {
    return this.httpClient.post<LoginResponse>('/api/v1/auth/login', data);
  }
}
