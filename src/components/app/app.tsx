import { ConstructorPage, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConstructorPage />,
    errorElement: <NotFound404 />
  }
]);

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <RouterProvider router={router} />
  </div>
);

export default App;
