import { createContext } from 'react';

import type { AuthService } from '@/features/auth/services/AuthService';

/**
 * Defines the services available to the component tree via the DI context.
 * To expose a new service, add it as a property here and resolve it in DiProvider.
 */
export interface DiContextValue {
  authService: AuthService;
}

export const DiContext = createContext<DiContextValue | null>(null);
