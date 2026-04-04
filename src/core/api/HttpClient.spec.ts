import 'reflect-metadata';
import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { HttpClient } from './HttpClient';

vi.mock('axios');

const mockedAxiosCreate = vi.mocked(axios.create);

describe('HttpClient', () => {
  let fakeInstance: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    interceptors: {
      request: {
        use: ReturnType<typeof vi.fn>;
      };
    };
  };
  let httpClient: HttpClient;

  beforeEach(() => {
    fakeInstance = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        request: {
          use: vi.fn(),
        },
      },
    };

    mockedAxiosCreate.mockReturnValue(fakeInstance as never);

    httpClient = new HttpClient(() => null);
  });

  describe('constructor', () => {
    it('should create an axios instance with the base URL and default headers', () => {
      expect(mockedAxiosCreate).toHaveBeenCalledWith({
        baseURL: undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should register a request interceptor', () => {
      expect(fakeInstance.interceptors.request.use).toHaveBeenCalledOnce();
    });

    it('should attach Authorization header when token is set', () => {
      mockedAxiosCreate.mockReturnValue(fakeInstance as never);

      new HttpClient(() => 'my-token');

      const interceptorFn = fakeInstance.interceptors.request.use.mock.calls[1][0];
      const config = { headers: {} };

      const result = interceptorFn(config);

      expect(result.headers.Authorization).toBe('Bearer my-token');
    });

    it('should not attach Authorization header when token is null', () => {
      const interceptorFn = fakeInstance.interceptors.request.use.mock.calls[0][0];
      const config = { headers: {} };

      const result = interceptorFn(config);

      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe('get', () => {
    it('should return response data', async () => {
      fakeInstance.get.mockResolvedValueOnce({ data: { id: 1 } });

      const result = await httpClient.get('/test');

      expect(fakeInstance.get).toHaveBeenCalledWith('/test', {
        headers: undefined,
        params: undefined,
        timeout: undefined,
      });
      expect(result).toEqual({ id: 1 });
    });

    it('should forward config to axios', async () => {
      fakeInstance.get.mockResolvedValueOnce({ data: { id: 1 } });

      await httpClient.get('/test', {
        headers: { Authorization: 'Bearer token' },
        params: { page: 1 },
        timeout: 5000,
      });

      expect(fakeInstance.get).toHaveBeenCalledWith('/test', {
        headers: { Authorization: 'Bearer token' },
        params: { page: 1 },
        timeout: 5000,
      });
    });
  });

  describe('post', () => {
    it('should return response data', async () => {
      fakeInstance.post.mockResolvedValueOnce({ data: { token: 'abc' } });

      const result = await httpClient.post('/login', { email: 'a@b.com', password: 'pass' });

      expect(fakeInstance.post).toHaveBeenCalledWith(
        '/login',
        { email: 'a@b.com', password: 'pass' },
        {
          headers: undefined,
          params: undefined,
          timeout: undefined,
        },
      );
      expect(result).toEqual({ token: 'abc' });
    });

    it('should forward config to axios', async () => {
      fakeInstance.post.mockResolvedValueOnce({ data: { token: 'abc' } });

      await httpClient.post(
        '/login',
        { email: 'a@b.com', password: 'pass' },
        { headers: { Authorization: 'Bearer token' }, timeout: 3000 },
      );

      expect(fakeInstance.post).toHaveBeenCalledWith(
        '/login',
        { email: 'a@b.com', password: 'pass' },
        {
          headers: { Authorization: 'Bearer token' },
          params: undefined,
          timeout: 3000,
        },
      );
    });
  });

  describe('put', () => {
    it('should return response data', async () => {
      fakeInstance.put.mockResolvedValueOnce({ data: { updated: true } });

      const result = await httpClient.put('/resource/1', { name: 'test' });

      expect(fakeInstance.put).toHaveBeenCalledWith(
        '/resource/1',
        { name: 'test' },
        {
          headers: undefined,
          params: undefined,
          timeout: undefined,
        },
      );
      expect(result).toEqual({ updated: true });
    });

    it('should forward config to axios', async () => {
      fakeInstance.put.mockResolvedValueOnce({ data: { updated: true } });

      await httpClient.put(
        '/resource/1',
        { name: 'test' },
        { headers: { Authorization: 'Bearer token' }, timeout: 3000 },
      );

      expect(fakeInstance.put).toHaveBeenCalledWith(
        '/resource/1',
        { name: 'test' },
        {
          headers: { Authorization: 'Bearer token' },
          params: undefined,
          timeout: 3000,
        },
      );
    });
  });

  describe('patch', () => {
    it('should return response data', async () => {
      fakeInstance.patch.mockResolvedValueOnce({ data: { patched: true } });

      const result = await httpClient.patch('/resource/1', { name: 'test' });

      expect(fakeInstance.patch).toHaveBeenCalledWith(
        '/resource/1',
        { name: 'test' },
        {
          headers: undefined,
          params: undefined,
          timeout: undefined,
        },
      );
      expect(result).toEqual({ patched: true });
    });

    it('should forward config to axios', async () => {
      fakeInstance.patch.mockResolvedValueOnce({ data: { patched: true } });

      await httpClient.patch(
        '/resource/1',
        { name: 'test' },
        { headers: { Authorization: 'Bearer token' }, timeout: 3000 },
      );

      expect(fakeInstance.patch).toHaveBeenCalledWith(
        '/resource/1',
        { name: 'test' },
        {
          headers: { Authorization: 'Bearer token' },
          params: undefined,
          timeout: 3000,
        },
      );
    });
  });

  describe('delete', () => {
    it('should return response data', async () => {
      fakeInstance.delete.mockResolvedValueOnce({ data: { deleted: true } });

      const result = await httpClient.delete('/resource/1');

      expect(fakeInstance.delete).toHaveBeenCalledWith('/resource/1', {
        headers: undefined,
        params: undefined,
        timeout: undefined,
      });
      expect(result).toEqual({ deleted: true });
    });

    it('should forward config to axios', async () => {
      fakeInstance.delete.mockResolvedValueOnce({ data: { deleted: true } });

      await httpClient.delete('/resource/1', {
        headers: { Authorization: 'Bearer token' },
        timeout: 3000,
      });

      expect(fakeInstance.delete).toHaveBeenCalledWith('/resource/1', {
        headers: { Authorization: 'Bearer token' },
        params: undefined,
        timeout: 3000,
      });
    });
  });
});
