import { createElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { authRoutes } from '@/features/auth/routes';

import TitleHandler from './TitleHandler';

const router = createBrowserRouter([
  {
    element: createElement(TitleHandler),
    children: [...authRoutes],
  },
]);

export default router;
