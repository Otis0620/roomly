import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import OwnerLayout from '@/layouts/OwnerLayout';

export const hotelRoutes: RouteObject[] = [
  {
    element: createElement(OwnerLayout),
    children: [
      {
        path: '/owner/listings',
        element: createElement(lazy(() => import('./presentation/OwnerListingsPage'))),
        handle: { title: 'My Listings' },
      },
    ],
  },
];
