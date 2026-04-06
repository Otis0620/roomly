import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import OwnerLayout from '@/layouts/OwnerLayout';

export const dashboardRoutes: RouteObject[] = [
  {
    element: createElement(OwnerLayout),
    children: [
      {
        path: '/owner/dashboard',
        element: createElement(lazy(() => import('./presentation/OwnerDashboardPage'))),
        handle: { title: 'Owner Dashboard' },
      },
    ],
  },
];
