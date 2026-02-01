import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { burgerConstructorSlice } from '../../services/constructor/slice';
import { v4 } from 'uuid';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();

    const location = useLocation();

    const handleAdd = () => {
      dispatch(
        burgerConstructorSlice.actions.addIngredient({
          ...ingredient,
          id: v4()
        })
      );
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
