import { useContext } from 'react';

import { DiContext } from '@/core/di/DiContext';

import type { AuthService } from '../services/AuthService';

/**
 * Provides access to the AuthService from the DI context.
 * Abstracts the context lookup so components stay decoupled from the DI container directly.
 *
 * @returns The AuthService instance
 */
export function useAuthService(): AuthService {
  const context = useContext(DiContext);

  if (!context) {
    throw new Error('useAuthService must be used within DiProvider');
  }

  return context.authService;
}
