import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from './ingredients/slice';
import { initialState as burgerConstructorInitialState } from './constructor/slice';
import { initialState as userInitialState } from './user/slice';
import { initialState as orderInitialState } from './order/slice';
import { initialState as feedInitialState } from './feed/slice';

describe('rootReducer', () => {
  test('обработка неизвестного экшена', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState.ingredients).toEqual(ingredientsInitialState);
    expect(initialState.burgerConstructor).toEqual(
      burgerConstructorInitialState
    );
    expect(initialState.user).toEqual(userInitialState);
    expect(initialState.order).toEqual(orderInitialState);
    expect(initialState.feed).toEqual(feedInitialState);
  });
});
