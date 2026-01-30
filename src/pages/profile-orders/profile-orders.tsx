import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserOrders } from '../../services/order/selectors';
import { fetchUserOrders } from '../../services/order/thunks';
import { fetchIngredients } from '../../services/ingredients/thunks';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
