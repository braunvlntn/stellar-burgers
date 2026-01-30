import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIngredients,
  selectLoading
} from '../../services/ingredients/selectors';
import { fetchIngredients } from '../../services/ingredients/thunks';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const ingredients = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectLoading);

  useEffect(() => {
    if (!ingredients.length && !ingredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [ingredients, ingredientsLoading]);

  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData || ingredientsLoading) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
