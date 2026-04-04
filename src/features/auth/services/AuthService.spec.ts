import 'reflect-metadata';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from './AuthService';
import type { AuthApi } from '../api/AuthApi';
import type { AuthUser } from '../types/authTypes';
import { getAccessToken } from '../utils/accessToken';

describe('AuthService', () => {
  let mockAuthApi: AuthApi;
  let authService: AuthService;

  beforeEach(() => {
    mockAuthApi = {
      login: vi.fn(),
    } as unknown as AuthApi;

    authService = new AuthService(mockAuthApi);
  });

  describe('login', () => {
    it('should return the user from the api response', async () => {
      const user: AuthUser = { id: '1', email: 'user@roomly.com', role: 'guest' };

      (mockAuthApi.login as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        token: 'abc123',
        user,
      });

      const result = await authService.login({ email: 'user@roomly.com', password: 'password' });

      expect(result).toEqual(user);
    });

    it('should set the access token from the api response', async () => {
      const user: AuthUser = { id: '1', email: 'user@roomly.com', role: 'guest' };

      (mockAuthApi.login as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        token: 'abc123',
        user,
      });

      await authService.login({ email: 'user@roomly.com', password: 'password' });

      expect(getAccessToken()).toBe('abc123');
    });

    it('should call the api with the provided credentials', async () => {
      const user: AuthUser = { id: '1', email: 'user@roomly.com', role: 'guest' };
      const credentials = { email: 'user@roomly.com', password: 'password' };

      (mockAuthApi.login as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        token: 'abc123',
        user,
      });

      await authService.login(credentials);

      expect(mockAuthApi.login).toHaveBeenCalledWith(credentials);
    });
  });
});
