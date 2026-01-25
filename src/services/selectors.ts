import { RootState } from './store';

export const selectLoading = (state: RootState) => state.loading;
export const selectBuns = (state: RootState) => state.buns;
export const selectMains = (state: RootState) => state.mains;
export const selectSauces = (state: RootState) => state.sauces;
