import { configureStore } from '@reduxjs/toolkit';

import authReducer, {
  clearCurrentUser,
  selectCurrentUser,
  selectIsAuthenticated,
  setCurrentUser,
} from './authSlice';
import type { AuthUser } from '../types/userTypes';

const user: AuthUser = {
  id: '1',
  email: 'user@roomly.com',
  firstName: 'James',
  lastName: 'Brown',
  role: 'guest',
};

function makeStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

describe('authSlice', () => {
  describe('initial state', () => {
    it('should have no current user', () => {
      const store = makeStore();

      expect(selectCurrentUser(store.getState())).toBeNull();
    });

    it('should not be authenticated', () => {
      const store = makeStore();

      expect(selectIsAuthenticated(store.getState())).toBe(false);
    });
  });

  describe('setCurrentUser', () => {
    it('should set the current user', () => {
      const store = makeStore();

      store.dispatch(setCurrentUser(user));

      expect(selectCurrentUser(store.getState())).toEqual(user);
    });

    it('should set isAuthenticated to true', () => {
      const store = makeStore();

      store.dispatch(setCurrentUser(user));

      expect(selectIsAuthenticated(store.getState())).toBe(true);
    });
  });

  describe('clearCurrentUser', () => {
    it('should clear the current user', () => {
      const store = makeStore();

      store.dispatch(setCurrentUser(user));
      store.dispatch(clearCurrentUser());

      expect(selectCurrentUser(store.getState())).toBeNull();
    });

    it('should set isAuthenticated to false', () => {
      const store = makeStore();

      store.dispatch(setCurrentUser(user));
      store.dispatch(clearCurrentUser());

      expect(selectIsAuthenticated(store.getState())).toBe(false);
    });
  });
});
