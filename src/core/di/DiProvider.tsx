import { useMemo } from 'react';

import type { AuthService } from '@/features/auth/services/AuthService';

import { container } from './container';
import { DiContext } from './DiContext';
import { IDENTIFIERS } from './identifiers';

export function DiProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(
    () => ({
      authService: container.get<AuthService>(IDENTIFIERS.AuthService),
    }),
    [],
  );

  return <DiContext.Provider value={value}>{children}</DiContext.Provider>;
}
