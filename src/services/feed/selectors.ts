import { RootState } from '../store';

export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedData = (state: RootState) => state.feed.data;
export const selectOrder = (state: RootState) => state.feed.order;
