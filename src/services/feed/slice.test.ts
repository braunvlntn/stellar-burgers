import { feedSlice } from './slice';
import { fetchFeed } from './thunks';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['1', '2', '3'],
  status: 'done',
  name: 'Test Burger',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345
};

const mockFeedData = {
  orders: [mockOrder, { ...mockOrder, _id: '2', number: 12346 }],
  total: 100,
  totalToday: 50
};

describe('feedSlice', () => {
  test('fetchFeed.pending', () => {
    const initialState = {
      loading: false,
      data: null
    };

    const result = feedSlice.reducer(
      initialState,
      fetchFeed.pending('', undefined)
    );

    expect(result.loading).toBe(true);
  });

  test('fetchFeed.fulfilled', () => {
    const initialState = {
      loading: true,
      data: null
    };

    const result = feedSlice.reducer(
      initialState,
      fetchFeed.fulfilled(mockFeedData, '', undefined)
    );

    expect(result.loading).toBe(false);
    expect(result.data).toEqual(mockFeedData);
  });

  test('fetchFeed.rejected', () => {
    const initialState = {
      loading: true,
      data: mockFeedData
    };

    const result = feedSlice.reducer(
      initialState,
      fetchFeed.rejected(null, '', undefined)
    );

    expect(result.loading).toBe(false);
    expect(result.data).toEqual(mockFeedData);
  });
});
