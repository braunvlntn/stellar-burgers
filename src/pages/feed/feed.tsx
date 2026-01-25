import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeedData,
  selectFeedLoading
} from '../../services/feed/selectors';
import { fetchFeed } from '../../services/feed/thunks';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectFeedLoading);
  const orders: TOrder[] = useSelector(selectFeedData)?.orders || [];

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeed());
    }
  }, []);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
