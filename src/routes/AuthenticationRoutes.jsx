import React from 'react';
import { lazy } from 'react';
// project imports
import Loadable from 'component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('../views/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/Register')));
const LandingPage = Loadable(lazy(() => import('../views/LandingPage')));

// ==============================|| AUTHENTICATION ROUTES ||============================== //
const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/application/land',
      element: <LandingPage />
    },
    {
      path: '/application/login',
      element: <AuthLogin />
    },
    {
      path: '/application/register',
      element: <AuthRegister />
    }
  ]
};

export default AuthenticationRoutes;