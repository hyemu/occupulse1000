import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

// Lazy loading views
const Homepage = Loadable(lazy(() => import('views/Homepage')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const PredictionPage = Loadable(lazy(() => import('views/PredictionPage')));
const EvaluationPage = Loadable(lazy(() => import('views/EvaluationPage')));
const StudentProfile = Loadable(lazy(() => import('views/StudentProfile')));
const StudentData = Loadable(lazy(() => import('views/StudentData')));
const SettingsPage = Loadable(lazy(() => import('views/SettingsPage')));
const AdminDashboard = Loadable(lazy(() => import('views/AdminDashboard')));
const MessagePage = Loadable(lazy(() => import('views/MessagePage')));
const PLPData = Loadable(lazy(() => import('views/PLPData')));


// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />, // Reuse MainLayout for both admin and user
  children: [
    // User Routes
    {
      path: '/',
      element: <Navigate to="/homepage" />
    },
    {
      path: '/homepage',
      element: <Homepage />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/prediction', element: <PredictionPage /> },
    { path: '/evaluation', element: <EvaluationPage /> },
    { path: '/student', element: <StudentProfile /> },
    { path: '/student-data', element: <StudentData /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '/message', element: <MessagePage /> },
    { path: '/plpdata', element: <PLPData /> },


    
    // Admin Routes
    {
      path: '/admin',
      element: <Navigate to="/admin/dashboard" />
    },
    {
      path: '/admin/dashboard',
      element: <AdminDashboard />
    },
    
    // Add more admin-specific routes as needed
  ]
};

export default MainRoutes;




/*
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

const Homepage = Loadable(lazy(() => import('views/Homepage')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const PredictionPage = Loadable(lazy(() => import('views/PredictionPage')));
const EvaluationPage = Loadable(lazy(() => import('views/EvaluationPage')));
const StudentProfile = Loadable(lazy(() => import('views/StudentProfile')));
const StudentData = Loadable(lazy(() => import('views/StudentData')));
const SettingsPage = Loadable(lazy(() => import('views/SettingsPage')));
const AdminDashboard = Loadable(lazy(() => import('views/AdminDashboard')));
const MessagePage = Loadable(lazy(() => import('views/MessagePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/application/land" />  // Redirect to /application/land
    },
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: '/homepage',
      element: <Homepage />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/prediction', element: <PredictionPage /> },
    { path: '/evaluation', element: <EvaluationPage /> },
    { path: '/student', element: <StudentProfile /> },
    { path: '/student-data', element: <StudentData /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/message', element: <MessagePage /> }
  ]
};

export default MainRoutes;




*/


/*

OLD ROUTE
import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const Homepage = Loadable(lazy(() => import('views/Homepage')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const PredictionPage = Loadable(lazy(() => import('views/PredictionPage')));
const EvaluationPage = Loadable(lazy(() => import('views/EvaluationPage')));
const StudentProfile = Loadable(lazy(() => import('views/StudentProfile')));
const StudentData = Loadable(lazy(() => import('views/StudentData')));
const SettingsPage = Loadable(lazy(() => import('views/SettingsPage')));
const AdminDashboard = Loadable(lazy(() => import('views/AdminDashboard')));


// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: '/homepage',
      element: <Homepage />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/prediction', element: <PredictionPage /> },
    { path: '/evaluation', element: <EvaluationPage /> },
    { path: '/student', element: <StudentProfile /> },
    { path: '/student-data', element: <StudentData /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '/admin', element: <AdminDashboard /> },

  ]
};

export default MainRoutes;
*/
