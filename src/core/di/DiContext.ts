import { createContext } from 'react';

import type { AuthService } from '@/features/auth/services/AuthService';

export interface DiContextValue {
  authService: AuthService;
}

export const DiContext = createContext<DiContextValue | null>(null);
