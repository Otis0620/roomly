import { useMemo } from 'react';

import type { AuthService } from '@/features/auth/services/AuthService';

import { container } from './container';
import { DiContext } from './DiContext';
import { IDENTIFIERS } from './identifiers';

/**
 * Resolves all services from the DI container once on mount and makes them available
 * to the component tree via DiContext. To expose a new service, add it to DiContextValue
 * and resolve it here.
 *
 * @param children - The component tree to provide services to
 */
export function DiProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(
    () => ({
      authService: container.get<AuthService>(IDENTIFIERS.AuthService),
    }),
    [],
  );

  return <DiContext.Provider value={value}>{children}</DiContext.Provider>;
}
