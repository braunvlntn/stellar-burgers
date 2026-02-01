import { orderSlice } from './slice';
import { fetchOrder, fetchUserOrders } from './thunks';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['1', '2', '3'],
  status: 'done',
  name: 'Краторный космический бургер',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 99999
};

describe('orderSlice', () => {
  describe('оформление заказа', () => {
    test('fetchOrder.pending', () => {
      const initialState = {
        request: false,
        modalData: null,
        userOrders: []
      };

      const result = orderSlice.reducer(
        initialState,
        fetchOrder.pending('', ['1', '2', '3'])
      );

      expect(result.request).toBe(true);
    });

    test('fetchOrder.fulfilled', () => {
      const initialState = {
        request: true,
        modalData: null,
        userOrders: []
      };

      const result = orderSlice.reducer(
        initialState,
        fetchOrder.fulfilled(mockOrder, '', ['1', '2', '3'])
      );

      expect(result.request).toBe(false);
      expect(result.modalData).toEqual(mockOrder);
    });

    test('fetchOrder.rejected', () => {
      const initialState = {
        request: true,
        modalData: null,
        userOrders: []
      };

      const result = orderSlice.reducer(
        initialState,
        fetchOrder.rejected(null, '', ['1', '2', '3'])
      );

      expect(result.request).toBe(false);
      expect(result.modalData).toBeNull();
    });
  });

  describe('заказы пользователя', () => {
    test('fetchUserOrders.pending', () => {
      const initialState = {
        request: false,
        modalData: null,
        userOrders: []
      };

      const result = orderSlice.reducer(
        initialState,
        fetchUserOrders.pending('', undefined)
      );

      expect(result.request).toBe(true);
    });

    test('fetchUserOrders.fulfilled', () => {
      const initialState = {
        request: true,
        modalData: null,
        userOrders: []
      };

      const mockOrders = [mockOrder, { ...mockOrder, _id: '2', number: 12346 }];

      const result = orderSlice.reducer(
        initialState,
        fetchUserOrders.fulfilled(mockOrders, '', undefined)
      );

      expect(result.request).toBe(false);
      expect(result.userOrders).toEqual(mockOrders);
    });

    test('fetchUserOrders.rejected', () => {
      const initialState = {
        request: true,
        modalData: null,
        userOrders: []
      };

      const result = orderSlice.reducer(
        initialState,
        fetchUserOrders.rejected(null, '', undefined)
      );

      expect(result.request).toBe(false);
      expect(result.userOrders).toEqual([]);
    });
  });
});
