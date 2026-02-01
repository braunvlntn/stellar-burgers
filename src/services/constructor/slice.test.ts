import { burgerConstructorSlice } from './slice';
import { TConstructorIngredient } from '@utils-types';

const mockIngredient: TConstructorIngredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: 'test.jpg',
  image_mobile: 'test-mobile.jpg',
  image_large: 'test-large.jpg',
  id: 'test-id-1'
};

const mockBun: TConstructorIngredient = {
  ...mockIngredient,
  type: 'bun',
  name: 'Test Bun'
};

describe('burgerConstructorSlice', () => {
  test('добавление булочки', () => {
    const initialState = {
      items: {
        bun: null,
        ingredients: []
      }
    };

    const result = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addIngredient(mockBun)
    );

    expect(result.items.bun).toEqual(mockBun);
    expect(result.items.ingredients).toHaveLength(0);
  });

  test('добавление основного ингредиента', () => {
    const initialState = {
      items: {
        bun: null,
        ingredients: []
      }
    };

    const result = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addIngredient(mockIngredient)
    );

    expect(result.items.bun).toBeNull();
    expect(result.items.ingredients).toHaveLength(1);
    expect(result.items.ingredients[0]).toEqual(mockIngredient);
  });

  test('удаление ингредиента', () => {
    const initialState = {
      items: {
        bun: null,
        ingredients: [mockIngredient, { ...mockIngredient, id: 'test-id-2' }]
      }
    };

    const result = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.removeIngredient(0)
    );

    expect(result.items.ingredients).toHaveLength(1);
    expect(result.items.ingredients[0].id).toBe('test-id-2');
  });

  test('перемещение ингредиентов', () => {
    const ingredient1 = { ...mockIngredient, id: 'test-id-1' };
    const ingredient2 = { ...mockIngredient, id: 'test-id-2' };
    const ingredient3 = { ...mockIngredient, id: 'test-id-3' };

    const initialState = {
      items: {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      }
    };

    let result = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.moveUp(1)
    );

    expect(result.items.ingredients).toEqual([
      ingredient2,
      ingredient1,
      ingredient3
    ]);

    result = burgerConstructorSlice.reducer(
      result,
      burgerConstructorSlice.actions.moveDown(1)
    );

    expect(result.items.ingredients).toEqual([
      ingredient2,
      ingredient3,
      ingredient1
    ]);
  });
});
