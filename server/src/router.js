import { Router } from 'express';
import * as Employees from './controllers/employee_controller';
import signin, { signup } from './controllers/auth_controller';
import { requireAuth, requireSignin } from './utils/passport';

import * as Recipes from './controllers/recipes_controller';
import * as Users from './controllers/user_controller';
import * as Histories from './controllers/history_controller';
import * as Favorites from './controllers/favorites_controller';
import * as Directions from './controllers/directions_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our Lab3 api' });
});

router.post('/signin', requireSignin, signin);
router.post('/signup', signup);

router.route('/employees')
  .get(requireAuth, Employees.getEmployees)
  .post(Employees.createEmployee);

router.route('/employees/:id')
  .get(requireAuth, Employees.getEmployee)
  .put(requireAuth, Employees.updateEmployee)
  .delete(requireAuth, Employees.deleteEmployee);

router.route('/recipe/:id')
  .get(Recipes.getRecipe)
  .delete(requireAuth, Recipes.deleteRecipe)
  .put(requireAuth, Recipes.updateRecipe);


router.route('/recipes')
  .get(Recipes.getRecipes)
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
  .get(requireAuth, Favorites.getFavorites);

router.route('/directions')
  .put(requireAuth, Directions.updateDirection);

// router.route('/recipes')
//   .get(Recipes.getRecipes)
//   .post(Recipes.addRecipe);

export default router;
