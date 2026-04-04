import type { RootState } from '@/core/store/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AuthUser } from '../types/authTypes';

interface AuthState {
  currentUser: AuthUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Sets the current authenticated user.
     *
     * @param state - The current auth state
     * @param action - The action containing the authenticated user
     */
    setCurrentUser(state, action: PayloadAction<AuthUser>) {
      state.currentUser = action.payload;
    },

    /**
     * Clears the current authenticated user on logout or session expiry.
     *
     * @param state - The current auth state
     */
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;

/**
 * Selects the current authenticated user from state.
 *
 * @param state - The root Redux state
 * @returns The current authenticated user, or null if not authenticated
 */
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

/**
 * Selects whether the user is currently authenticated.
 *
 * @param state - The root Redux state
 * @returns True if a user is authenticated, false otherwise
 */
export const selectIsAuthenticated = (state: RootState) => state.auth.currentUser !== null;

export default authSlice.reducer;
