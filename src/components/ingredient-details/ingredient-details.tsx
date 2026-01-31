import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectLoading
} from '../../services/ingredients/selectors';

export const IngredientDetails: FC = () => {
  let { id } = useParams();

  const ingredientsLoading = useSelector(selectLoading);

  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData || ingredientsLoading) {
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
