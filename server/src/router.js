import { Router } from 'express';
import * as Employees from './controllers/employee_controller';
import signin from './controllers/auth_controller';
import { requireAuth, requireSignin } from './utils/passport';

import * as Recipes from './controllers/recipes_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our Lab3 api' });
});

router.post('/signin', requireSignin, signin);

router.route('/employees')
  .get(requireAuth, Employees.getEmployees)
  .post(requireAuth, Employees.createEmployee);

router.route('/employees/:id')
  .get(requireAuth, Employees.getEmployee)
  .put(requireAuth, Employees.updateEmployee)
  .delete(requireAuth, Employees.deleteEmployee);


router.route('/recipe/:id')
  .get(Recipes.getRecipe);

router.route('/recipes')
  .get(Recipes.getRecipes)
  .post(Recipes.addRecipe);

export default router;
