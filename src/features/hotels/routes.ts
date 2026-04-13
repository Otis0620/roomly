import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import GuestLayout from '@/layouts/GuestLayout';

export const hotelRoutes: RouteObject[] = [
  {
    element: createElement(GuestLayout),
    children: [
      {
        path: '/hotels',
        element: createElement(lazy(() => import('./presentation/HotelSearchPage'))),
        handle: { title: 'Search Hotels' },
      },
    ],
  },
];
