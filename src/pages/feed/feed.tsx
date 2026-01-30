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
import {
  selectIngredients,
  selectLoading
} from '../../services/ingredients/selectors';
import { fetchIngredients } from '../../services/ingredients/thunks';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const feedLoading = useSelector(selectFeedLoading);
  const ingredientsLoading = useSelector(selectLoading);
  const orders: TOrder[] = useSelector(selectFeedData)?.orders || [];
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (!ingredients.length && !ingredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [ingredients]);

  useEffect(() => {
    if (!orders.length && !feedLoading) {
      dispatch(fetchFeed());
    }
  }, [orders, feedLoading]);

  if (
    !orders.length ||
    feedLoading ||
    !ingredients.length ||
    ingredientsLoading
  ) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
