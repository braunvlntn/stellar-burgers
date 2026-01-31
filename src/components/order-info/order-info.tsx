import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIngredients,
  selectLoading
} from '../../services/ingredients/selectors';
import {
  selectFeedData,
  selectFeedLoading
} from '../../services/feed/selectors';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchIngredients } from '../../services/ingredients/thunks';
import { fetchFeed } from '../../services/feed/thunks';
import { Modal } from '../modal';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const navigate = useNavigate();
  const feed = useSelector(selectFeedData);
  const feedLoading = useSelector(selectFeedLoading);
  const location = useLocation();
  const orderData = feed?.orders.find(
    (order) => order.number === Number(number)
  );
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectLoading);

  useEffect(() => {
    if (!ingredients.length && !ingredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [ingredients, ingredientsLoading]);

  useEffect(() => {
    if (!feed && !feedLoading) {
      dispatch(fetchFeed());
    }
  }, [feed, feedLoading]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || !ingredients.length || ingredientsLoading || feedLoading) {
    return <Preloader />;
  }

  return (
    <Modal
      title={`Заказ ${orderInfo.number}`}
      onClose={() => {
        navigate(location.pathname.split('/').slice(0, -1).join('/'));
      }}
    >
      <OrderInfoUI orderInfo={orderInfo} />
    </Modal>
  );
};
