import { useContext } from 'react';

import { DiContext } from '@/core/di/DiContext';

import type { AuthService } from '../services/AuthService';

export function useAuthService(): AuthService {
  const context = useContext(DiContext);

  if (!context) {
    throw new Error('useAuthService must be used within DiProvider');
  }

  return context.authService;
}
