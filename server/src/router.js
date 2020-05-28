import { Router } from 'express';
import signin, { signup } from './controllers/auth_controller';
import { requireAuth, requireSignin } from './utils/passport';

import * as Recipes from './controllers/recipes_controller';
import * as Users from './controllers/user_controller';
import * as Histories from './controllers/history_controller';
import * as Favorites from './controllers/favorites_controller';
import * as Ratings from './controllers/ratings_controller';
import * as Directions from './controllers/directions_controller';
import * as Categories from './controllers/categories_controller';
import * as Ingredients from './controllers/ingredients_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our Lab3 api' });
});

router.post('/signin', requireSignin, signin);
router.post('/signup', signup);

router.route('/recipe/:id')
  .get(requireAuth, Recipes.getRecipe)
  .delete(requireAuth, Recipes.deleteRecipe)
  .put(requireAuth, Recipes.updateRecipe);

router.route('/recipes')
  .get(requireAuth, Recipes.getRecipes)
  .post(requireAuth, Recipes.addRecipe);

router.route('/user/:id')
  .get(Users.getUser)
  .put(requireAuth, Users.updateUser)
  .delete(requireAuth, Users.deleteUser);

router.route('/users')
  .get(Users.getUsers);

router.route('/history/:id')
  .get(requireAuth, Histories.getHistory)
  .put(requireAuth, Histories.updateHistory)
  .delete(requireAuth, Histories.deleteHistory)
  .post(requireAuth, Histories.createHistory);

router.route('/histories')
  .get(requireAuth, Histories.getHistories);

router.route('/favorites')
  .get(requireAuth, Favorites.getFavorites)
  .post(requireAuth, Favorites.addFavorite);

router.route('/favorite')
  .get(requireAuth, Favorites.getFavorite)
  .delete(requireAuth, Favorites.deleteFavorite);

router.route('/ratings')
  .get(requireAuth, Ratings.getRatings)
  .post(requireAuth, Ratings.addRating)
  .put(requireAuth, Ratings.updateRating)
  .delete(requireAuth, Ratings.deleteRating);

router.route('/directions/:id')
  .put(requireAuth, Directions.updateDirection);

router.route('/categories/:id')
  .put(requireAuth, Categories.updateCategory);

router.route('/categories')
  .get(Categories.getCategory);

router.route('/ingredients/:id')
  .put(requireAuth, Ingredients.updateIngredient);

router.route('/ingredients/')
  .get(Ingredients.getIngredients);

export default router;
