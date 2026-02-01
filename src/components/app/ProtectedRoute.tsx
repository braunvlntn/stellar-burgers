import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/user/selectors';

export const ProtectedRoute = ({
  withoutAuth = false,
  children
}: {
  withoutAuth?: boolean;
  children: ReactNode;
}) => {
  const user = useSelector(selectUser);

  const location = useLocation();

  const to = `/login?redirect=${location.pathname}`;

  if (withoutAuth) {
    if (user) {
      return;
    }

    return children;
  }

  if (!user) {
    return <Navigate to={to} replace />;
  }

  return children;
};
