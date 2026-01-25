import { RootState } from '../store';

export const selectLoading = (state: RootState) => state.ingredients.loading;
export const selectBuns = (state: RootState) => state.ingredients.buns;
export const selectMains = (state: RootState) => state.ingredients.mains;
export const selectSauces = (state: RootState) => state.ingredients.sauces;

export const selectIngredients = (state: RootState) => [
  ...state.ingredients.buns,
  ...state.ingredients.mains,
  ...state.ingredients.sauces
];
