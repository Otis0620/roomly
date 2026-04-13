import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
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
  {
    element: createElement(AdminLayout),
    children: [
      {
        path: '/admin/dashboard',
        element: createElement(lazy(() => import('./presentation/AdminDashboardPage'))),
        handle: { title: 'Admin Dashboard' },
      },
    ],
  },
];
