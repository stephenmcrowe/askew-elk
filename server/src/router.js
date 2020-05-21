import { Router } from 'express';
import * as Employees from './controllers/employee_controller';
import signin, { testauth } from './controllers/auth_controller';
import { requireAuth, requireSignin } from './utils/passport';

import * as Recipes from './controllers/recipes_controller';
import * as Users from './controllers/user_controller';
import * as Histories from './controllers/history_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our Lab3 api' });
});

router.post('/signin', requireSignin, signin);
router.post('/testauth', requireAuth, testauth);

router.route('/employees')
  .get(requireAuth, Employees.getEmployees)
  .post(Employees.createEmployee);

router.route('/employees/:id')
  .get(requireAuth, Employees.getEmployee)
  .put(requireAuth, Employees.updateEmployee)
  .delete(requireAuth, Employees.deleteEmployee);


router.route('/recipe/:id')
  .get(Recipes.getRecipe);

router.route('/recipes')
  .get(Recipes.getRecipes)
    .post(Recipes.addRecipe);

router.route('/user/:id')
    .get(Users.getUser)
    .put(Users.updateUser)
    .delete(Users.deleteUser);

router.route('/users')
    .get(Users.getUsers);

router.route('/history')
    .get(Histories.getHistory)
    .put(Histories.updateHistory)
    .delete(Histories.deleteHistory);

router.route('/histories')
    .get(Histories.getHistories)
    .post(Histories.createHistories);
    

// router.route('/recipes')
//   .get(Recipes.getRecipes)
//   .post(Recipes.addRecipe);

export default router;
