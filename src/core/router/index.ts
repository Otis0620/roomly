import { createElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { authRoutes } from '@/features/auth/routes';
import { dashboardRoutes } from '@/features/dashboard/routes';
import { hotelRoutes } from '@/features/hotels/routes';

import TitleHandler from './TitleHandler';

const router = createBrowserRouter([
  {
    element: createElement(TitleHandler),
    children: [...authRoutes, ...hotelRoutes, ...dashboardRoutes],
  },
]);

export default router;
