import { ingredientsSlice } from './slice';
import { fetchIngredients } from './thunks';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'bun.jpg',
    image_mobile: 'bun-mobile.jpg',
    image_large: 'bun-large.jpg'
  },
  {
    _id: '2',
    name: 'Main',
    type: 'main',
    proteins: 15,
    fat: 8,
    carbohydrates: 25,
    calories: 300,
    price: 150,
    image: 'main.jpg',
    image_mobile: 'main-mobile.jpg',
    image_large: 'main-large.jpg'
  }
];

describe('ingredientsSlice', () => {
  test('fetchIngredients.pending', () => {
    const initialState = {
      buns: [],
      mains: [],
      sauces: [],
      loading: false
    };

    const result = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    expect(result.loading).toBe(true);
  });

  test('fetchIngredients.fulfilled', () => {
    const initialState = {
      buns: [],
      mains: [],
      sauces: [],
      loading: true
    };

    const result = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(result.loading).toBe(false);
    expect(result.buns).toHaveLength(1);
    expect(result.mains).toHaveLength(1);
  });

  test('fetchIngredients.rejected', () => {
    const initialState = {
      buns: [],
      mains: [],
      sauces: [],
      loading: true
    };

    const result = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.rejected(null, '', undefined)
    );

    expect(result.loading).toBe(false);
  });
});
