import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface BurgerConstructorSliceState {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: BurgerConstructorSliceState = {
  items: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      if (payload.type === 'bun') {
        state.items.bun = payload;
      } else {
        state.items.ingredients.push(payload);
      }
    },
    removeIngredient: (state, { payload }: PayloadAction<number>) => {
      state.items.ingredients.splice(payload, 1);
    },
    moveUp: (state, { payload }: PayloadAction<number>) => {
      state.items.ingredients.splice(
        payload - 1,
        2,
        state.items.ingredients[payload],
        state.items.ingredients[payload - 1]
      );
    },
    moveDown: (state, { payload }: PayloadAction<number>) => {
      state.items.ingredients.splice(
        payload,
        2,
        state.items.ingredients[payload + 1],
        state.items.ingredients[payload]
      );
    }
  }
});
