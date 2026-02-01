import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/constructor/selectors';
import { selectUser } from '../../services/user/selectors';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { fetchOrder } from '../../services/order/thunks';
import {
  selectOrderModalData,
  selectOrderRequest
} from '../../services/order/selectors';
import { orderSlice } from '../../services/order/slice';
import { burgerConstructorSlice } from '../../services/constructor/slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(selectConstructorItems);
  const user = useSelector(selectUser);

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = async () => {
    if (!user) {
      navigate({
        pathname: '/login',
        search: `?${createSearchParams({ redirect: '/' })}`
      });

      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ids = [
      constructorItems.bun?._id,
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    const response = await dispatch(fetchOrder(ids));

    if (!response.payload) {
      return;
    }

    dispatch(burgerConstructorSlice.actions.reset());
  };

  const closeOrderModal = () => {
    dispatch(orderSlice.actions.reset());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
