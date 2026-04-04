import { createElement, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import AuthLayout from '@/layouts/AuthLayout';

export const authRoutes: RouteObject[] = [
  {
    element: createElement(AuthLayout),
    children: [
      { path: '/', element: createElement(Navigate, { to: '/login', replace: true }) },
      {
        path: '/login',
        element: createElement(lazy(() => import('./presentation/LoginPage'))),
        handle: { title: 'Sign in' },
      },
    ],
  },
];
