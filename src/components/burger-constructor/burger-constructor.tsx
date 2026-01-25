import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectConstructorItems } from '../../services/constructor/selectors';
import { selectUser } from '../../services/user/selectors';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems);
  const user = useSelector(selectUser);

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!user) {
      navigate({
        pathname: '/login',
        search: `?${createSearchParams({ redirect: '/' })}`
      });

      return;
    }

    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
