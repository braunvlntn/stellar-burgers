import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectLoading
} from '../../services/ingredients/selectors';
import {
  selectFeedData,
  selectFeedLoading
} from '../../services/feed/selectors';
import { useParams } from 'react-router-dom';
import { selectUserOrders } from '../../services/order/selectors';

export const OrderInfo: FC<{
  setTitle?: (title: string) => void;
}> = ({ setTitle }) => {
  const { number } = useParams();
  const feed = useSelector(selectFeedData);
  const userOrders = useSelector(selectUserOrders);
  const feedLoading = useSelector(selectFeedLoading);
  const orderData =
    feed?.orders.find((order) => order.number === Number(number)) ||
    userOrders.find((order) => order.number === Number(number));
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectLoading);

  useEffect(() => {
    if (orderData) {
      setTitle?.(`Заказ ${orderData.number}`);
    }
  }, [orderData]);

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

  return <OrderInfoUI orderInfo={orderInfo} />;
};
