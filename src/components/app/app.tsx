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
import { OrderInfo } from '../order-info';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ConstructorPage />
      },
      {
        path: '/feed',
        element: <Feed />,
        children: [
          {
            path: '/feed:number',
            element: (
              <Modal title='Информация о заказе' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            )
          }
        ]
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/reset-password',
        element: <ResetPassword />
      },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: '/profile/orders',
            element: <ProfileOrders />,
            children: [
              {
                path: '/profile/orders/:number',
                element: (
                  <Modal title='Информация о заказе' onClose={() => {}}>
                    <OrderInfo />
                  </Modal>
                )
              }
            ]
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
