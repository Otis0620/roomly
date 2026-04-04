import { beforeEach, describe, expect, it } from 'vitest';

import { clearAccessToken, getAccessToken, setAccessToken } from './accessToken';

describe('accessToken', () => {
  beforeEach(() => {
    clearAccessToken();
  });

  describe('getAccessToken', () => {
    it('should return null by default', () => {
      expect(getAccessToken()).toBeNull();
    });

    it('should return the token after it has been set', () => {
      setAccessToken('abc123');

      expect(getAccessToken()).toBe('abc123');
    });
  });

  describe('setAccessToken', () => {
    it('should store the token', () => {
      setAccessToken('my-token');

      expect(getAccessToken()).toBe('my-token');
    });

    it('should overwrite a previously stored token', () => {
      setAccessToken('first-token');
      setAccessToken('second-token');

      expect(getAccessToken()).toBe('second-token');
    });
  });

  describe('clearAccessToken', () => {
    it('should set the token to null', () => {
      setAccessToken('abc123');
      clearAccessToken();

      expect(getAccessToken()).toBeNull();
    });
  });
});
