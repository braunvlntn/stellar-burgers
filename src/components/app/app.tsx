import { ConstructorPage, NotFound404 } from '@pages';
import '../../index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <ConstructorPage />
      }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
