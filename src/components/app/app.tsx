import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout';
import { OrderInfoWrapper } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ConstructorPage />,
        children: [
          {
            path: 'ingredients/:id',
            element: <IngredientDetails />
          }
        ]
      },
      {
        path: '/feed',
        element: <Feed />,
        children: [
          {
            path: ':number',
            element: <OrderInfoWrapper />
          }
        ]
      },
      {
        path: '/login',
        element: (
          <ProtectedRoute withoutAuth>
            <Login />
          </ProtectedRoute>
        )
      },
      {
        path: '/register',
        element: (
          <ProtectedRoute withoutAuth>
            <Register />
          </ProtectedRoute>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <ProtectedRoute withoutAuth>
            <ForgotPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/reset-password',
        element: (
          <ProtectedRoute withoutAuth>
            <ResetPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile/orders',
        element: (
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ':number',
            element: (
              <ProtectedRoute>
                <OrderInfoWrapper />
              </ProtectedRoute>
            )
          }
        ]
      },
      {
        path: '/ingredients/:id',
        element: <IngredientDetails />
      },
      {
        path: '*',
        element: <NotFound404 />
      }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
