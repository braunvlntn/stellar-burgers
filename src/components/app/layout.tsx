import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchUser } from '../../services/user/thunks';

export const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};
