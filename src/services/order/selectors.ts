import { RootState } from '../store';

export const selectOrderRequest = (state: RootState) => state.order.request;
export const selectOrderModalData = (state: RootState) => state.order.modalData;
export const selectUserOrders = (state: RootState) => state.order.userOrders;
