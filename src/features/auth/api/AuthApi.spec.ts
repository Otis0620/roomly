import 'reflect-metadata';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { IHttpClient } from '@/core/api/IHttpClient';

import { AuthApi } from './AuthApi';

describe('AuthApi', () => {
  let mockHttpClient: IHttpClient;
  let authApi: AuthApi;

  beforeEach(() => {
    mockHttpClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    authApi = new AuthApi(mockHttpClient);
  });

  describe('login', () => {
    it('should call post with the correct url and credentials', async () => {
      const credentials = { email: 'user@roomly.com', password: 'password123' };
      const expectedResponse = { token: 'abc123' };

      (mockHttpClient.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce(expectedResponse);

      const result = await authApi.login(credentials);

      expect(mockHttpClient.post).toHaveBeenCalledWith('/api/v1/auth/login', credentials);
      expect(result).toEqual(expectedResponse);
    });
  });
});
