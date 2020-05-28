/* eslint-disable no-await-in-loop */
import mysql from 'mysql';
import { Database, cnfg } from '../db';

const WHERE_ID = 'WHERE recipeID = ?';
const SELECT_ONE = `
SELECT r.*, 
GROUP_CONCAT(DISTINCT c.CategoryName ORDER BY c.CategoryName DESC SEPARATOR '|') as Categories,
GROUP_CONCAT(DISTINCT i.IngredientName ORDER BY i.IngredientName DESC SEPARATOR '|') as Ingredients,
GROUP_CONCAT(DISTINCT d.Direction ORDER BY d.StepNumber ASC SEPARATOR '|') as Directions
FROM recipes r
JOIN recipetoingredient ri  ON ri.RecipeID = r.RecipeID
JOIN ingredients i ON i.IngredientID = ri.IngredientID
JOIN recipetocategory rc ON rc.RecipeID = r.RecipeID
JOIN categories c ON c.CategoryID = rc.CategoryID
JOIN directions d ON r.RecipeID = d.RecipeID
WHERE r.RecipeID = ?
`;
const STEPHENS_CODE = `
SELECT r.*, GROUP_CONCAT(DISTINCT c.categoryID SEPARATOR ', '),
GROUP_CONCAT(DISTINCT c.CategoryName ORDER BY c.CategoryName DESC SEPARATOR ', ')
FROM recipes r
JOIN recipetocategory rc ON rc.RecipeID = r.RecipeID
JOIN categories c ON c.CategoryID = rc.CategoryID
WHERE r.recipeID = 4;`;
// export const getRecipe = (req, res) => {
//   const db = new Database(cnfg);
//   db.query(SELECT_BY_ID, req.params.id)
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({ error: null, response: result });
//       return db.close();
//     })
//     .catch((err) => {
//       db.close();
//       console.log(err);
//       res.status(500).json({ error: err.sqlMessage, response: null });
//     });
// };

/* Transaction version */
export const getRecipe = (req, res) => {
  // console.log(req.params.id);
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(SELECT_ONE, req.params.id);
  })
    .then((result) => {
      const recipe = result[0];
      recipe.Categories = recipe.Categories.split('|');
      recipe.Ingredients = recipe.Ingredients.split('|');
      recipe.Directions = recipe.Directions.split('|');
      res.status(200).json({ error: null, response: recipe });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

const SELECT_ALL = `
SELECT RecipeID as id, RecipeName, RecipeAuthor, Rating, DateAdded, Description
FROM Recipes`;
const SELECT_WHERE = `${SELECT_ALL}
WHERE ?`;
// export const getRecipes = (req, res) => {
//   let query = [];

//   // Parse in the query entries
//   Object.entries(req.query).forEach(([k, v]) => {
//     if (k === 'RecipeName') {
//       query.push(`${k} LIKE '%${v}%'`);
//     } else {
//       query.push(`${k} = '${v}'`);
//     }
//   });

//   const db = new Database(cnfg);
//   if (query.length === 0) {
//     db.query(SELECT_ALL)
//       .then((result) => {
//         res.status(200).json({ error: null, response: result });
//         return db.close();
//       })
//       .catch((err) => {
//         db.close();
//         console.log(err);
//         res.status(500).json({ error: err.sqlMessage, response: null });
//       });
//   } else {
//     query = mysql.raw(query.join(' AND '));
//     db.query(SELECT_WHERE, query)
//       .then((result) => {
//         res.status(200).json({ error: null, response: result });
//         return db.close();
//       })
//       .catch((err) => {
//         db.close();
//         console.log(err);
//         res.status(500).json({ error: err.sqlMessage, response: null });
//       });
//   }
// };

/* Transaction version */
export const getRecipes = (req, res) => {
  let query = [];

  // Parse in the query entries
  Object.entries(req.query).forEach(([k, v]) => {
    if (k === 'RecipeName') {
      query.push(`${k} LIKE '%${v}%'`);
    } else {
      query.push(`${k} = '${v}'`);
    }
  });

  const db = new Database(cnfg);
  if (query.length === 0) {
    db.createTransaction(() => {
      return db.query(SELECT_ALL);
    })
      .then((result) => {
        res.status(200).json({ error: null, response: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  } else {
    query = mysql.raw(query.join(' AND '));
    db.createTransaction(() => {
      return db.query(SELECT_WHERE, query);
    })
      .then((result) => {
        res.status(200).json({ error: null, response: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  }
};


// need transaction eventually
// const ADD_RECIPE =
// `INSERT INTO Recipes(RecipeName, RecipeAuthor, Description, DateAdded)
// VALUES(?,?,?,?)`;
const ADD_RECIPE = 'INSERT INTO Recipes(RecipeName,RecipeAuthor, Description, DateAdded) VALUES(?,?,?,?)';
// VALUES (?,?,?),(?, ?, ?), (?, ?, ?);
const ADD_DIRECTIONS = 'INSERT INTO Directions (recipeID, StepNumber, Direction) VALUES ? ';
const LAST_INSERT_ID = 'last_insert_id()';
const GET_LAST_INSERT_ID = 'SELECT last_insert_id() AS ID';

const CHECK_INGREDIENT = 'SELECT IngredientID FROM Ingredients WHERE IngredientName = ?';
const ADD_INGREDIENT = 'INSERT INTO Ingredients (IngredientName) VALUES (?)';
const ADD_RECIPE_JOIN_INGREDIENT = 'INSERT INTO recipetoingredient VALUES (?, ?)';

const CHECK_CATEGORY = 'SELECT CategoryID FROM Categories WHERE CategoryName = ?';
const ADD_CATEGORY = 'INSERT INTO Categories (CategoryName) VALUES (?)';
const ADD_RECIPE_JOIN_CATEGORY = 'INSERT INTO recipetocategory VALUES (?, ?)';

// export const addRecipe = (req, res) => {
//   const insertRecipe = [];
//   insertRecipe.push(`${(req.body.RecipeName)}`);

//   if ('Description' in req.body) {
//     insertRecipe.push(req.body.Description);
//   } else {
//     insertRecipe.push(mysql.raw('NULL'));
//   }
//   insertRecipe.push(mysql.raw('NOW()'));

//   const db = new Database(cnfg);
//   db.query(ADD_RECIPE, insertRecipe)
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err.sqlMessage, response: null });
//     });

//   // build the directions list
//   // {
//   //  RecipeName:""
//   //  Description:""
//   //  Directions:{#, text},{#, text}}
//   //  Ingredients:["","",""]
//   //  Category:["","",""]
//   // }

//   let directions = [];
//   Object.entries(req.body.Directions).forEach(([k, v]) => {
//     directions.push(`(${LAST_INSERT_ID},${k},"${v}")`);
//   });
//   directions = mysql.raw(directions.join(', '));

//   db.query(ADD_DIRECTIONS, directions)
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err.sqlMessage, response: null });
//     });

//   let recipeID = 0;
//   db.query(GET_LAST_INSERT_ID)
//     .then((result) => {
//       console.log(result);
//       recipeID = result[0].ID;
//     });

//   for (let i = 0; i < req.body.Ingredients.length; i += 1) {
//     console.log(req.body.Ingredients[i]);
//     db.query(CHECK_INGREDIENT, req.body.Ingredients[i])
//       .then((result) => {
//         if (result.length > 0) {
//         // ingredient is present
//           db.query(ADD_RECIPE_JOIN_INGREDIENT, [recipeID, result[0].IngredientID])
//             .catch((err) => {
//               console.log(err);
//             });
//         } else {
//         // two inserts
//           db.query(ADD_INGREDIENT, req.body.Ingredients[i])
//             .catch((err) => {
//               console.log(err);
//             });
//           db.query(ADD_RECIPE_JOIN_INGREDIENT, [recipeID, mysql.raw(LAST_INSERT_ID)])
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ error: err.sqlMessage, response: null });
//       });
//   }

//   for (let i = 0; i < req.body.Categories.length; i += 1) {
//     console.log(req.body.Categories[i]);
//     db.query(CHECK_CATEGORY, req.body.Categories[i])
//       .then((result) => {
//         if (result.length > 0) {
//         // ingredient is present
//           db.query(ADD_RECIPE_JOIN_CATEGORY, [recipeID, result[0].CategoryID])
//             .catch((err) => {
//               console.log(err);
//             });
//         } else {
//         // two inserts
//           db.query(ADD_CATEGORY, req.body.Categories[i])
//             .catch((err) => {
//               console.log(err);
//             });
//           db.query(ADD_RECIPE_JOIN_CATEGORY, [recipeID, mysql.raw(LAST_INSERT_ID)])
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//       })
//       .catch((err) => {
//         db.close();
//         console.log(err);
//         res.status(500).json({ error: err.sqlMessage, response: null });
//       });
//   }

//   res.status(200).json({ error: null, response: 'Success!' });
// };

export const addRecipe = (req, res) => {
  const insertRecipe = [];
  console.log(req.user.userID);

  insertRecipe.push(`${(req.body.RecipeName)}`);
  insertRecipe.push(`${(req.user.userID)}`);

  if ('Description' in req.body) {
    insertRecipe.push(req.body.Description);
  } else {
    insertRecipe.push(mysql.raw('NULL'));
  }
  insertRecipe.push(mysql.raw('NOW()'));

  let recipeID = 0;
  const db = new Database(cnfg);
  console.log('starting transaction');
  db.createTransaction(() => {
    return db.query(ADD_RECIPE, insertRecipe)
      .then(() => {
        return db.query(GET_LAST_INSERT_ID);
      })
      .then((lastInsertIDResult) => {
        console.log('trying to get recipe id');
        console.log(lastInsertIDResult);
        recipeID = lastInsertIDResult[0].ID;
        /* build the directions list
         * {
         *  RecipeName:""
         *  Description:""
         *  Directions:{#, text},{#, text}}
         *  Ingredients:["","",""]
         *  Category:["","",""]
         * }
         */
        // start here
        let directions = [];
        Object.entries(req.body.Directions).forEach(([k, v]) => {
          directions.push(`(${LAST_INSERT_ID},${k},"${v}")`);
        });
        directions = mysql.raw(directions.join(', '));
        return db.query(ADD_DIRECTIONS, directions);
      })
      .then(() => {
        const checkIngredientPromises = req.body.Ingredients.map((i) => {
          return db.query(CHECK_INGREDIENT, i);
        });
        return Promise.all(checkIngredientPromises);
      })
      .then(async (checkResult) => {
        const ingredientToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            ingredientToLink.push(db.query(
              ADD_RECIPE_JOIN_INGREDIENT, [recipeID, queryRes[0].IngredientID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_INGREDIENT, req.body.Ingredients[i]);
            await db.query(ADD_RECIPE_JOIN_INGREDIENT,
              [recipeID, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(ingredientToLink);
      })
      .then(() => {
        if (!Array.isArray(req.body.Categories)) {
          return Promise.resolve();
        }
        const checkCategoryPromises = req.body.Categories.map((c) => {
          return db.query(CHECK_CATEGORY, c);
        });
        return Promise.all(checkCategoryPromises);
      })
      .then(async (checkResult) => {
        if (!checkResult) {
          return Promise.resolve();
        }
        const categoryToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            categoryToLink.push(db.query(
              ADD_RECIPE_JOIN_CATEGORY, [recipeID, queryRes[0].CategoryID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_CATEGORY, req.body.Categories[i]);
            await db.query(ADD_RECIPE_JOIN_CATEGORY,
              [recipeID, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(categoryToLink);
      })
      .then(() => { return Promise.resolve(recipeID); });
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({ error: null, response: recipeID });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

const DELETE_RECIPE = 'DELETE FROM RECIPES WHERE recipeID = ? AND RecipeAuthor = ?';
export const deleteRecipe = (req, res) => {
  console.log(req.user);
  const db = new Database(cnfg);
  db.query(DELETE_RECIPE, [req.params.id, req.user.userID])
    .then(() => {
      res.status(200).json({ error: null, response: 'Delete succeeded' });
      return db.close();
    })
    .catch((err) => {
      // error here if no permissions
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

const UPDATE_BOTH = 'UPDATE RECIPES SET Description = ?, RecipeName = ? WHERE RecipeID = ? AND RecipeAuthor = ?';
const DELETE_DIRECTIONS = 'DELETE FROM Directions WHERE RecipeID = ?';
const DELETE_RECIPE_TO_INGREDIENTS = 'DELETE FROM recipetoingredient WHERE RecipeID = ?';
const DELETE_RECIPE_TO_CATEGORY = 'DELETE FROM recipetocategory WHERE RecipeID = ?';
export const updateRecipe = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(UPDATE_BOTH, [req.body.Description, req.body.RecipeName, mysql.raw(req.params.id), (req.user.userID)])
      .then(() => {
        return db.query(DELETE_DIRECTIONS, mysql.raw(req.params.id))
      })
      .then(() => {
        return db.query(DELETE_RECIPE_TO_INGREDIENTS, mysql.raw(req.params.id))
      })
      .then(() => {
        return db.query(DELETE_RECIPE_TO_CATEGORY, mysql.raw(req.params.id))
      }).then(() => {
        let directions = [];
        Object.entries(req.body.Directions).forEach(([k, v]) => {
          directions.push(`(${req.params.id},${k},"${v}")`);
        });
        directions = mysql.raw(directions.join(', '));
        return db.query(ADD_DIRECTIONS, directions);
      })
      .then(() => {
        const checkIngredientPromises = req.body.Ingredients.map((i) => {
          return db.query(CHECK_INGREDIENT, i);
        });
        return Promise.all(checkIngredientPromises);
      })
      .then(async (checkResult) => {
        const ingredientToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            ingredientToLink.push(db.query(
              ADD_RECIPE_JOIN_INGREDIENT, [req.params.id, queryRes[0].IngredientID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_INGREDIENT, req.body.Ingredients[i]);
            await db.query(ADD_RECIPE_JOIN_INGREDIENT,
              [req.params.id, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(ingredientToLink);
      })
      .then(() => {
        if (!Array.isArray(req.body.Categories)) {
          return Promise.resolve();
        }
        const checkCategoryPromises = req.body.Categories.map((c) => {
          return db.query(CHECK_CATEGORY, c);
        });
        return Promise.all(checkCategoryPromises);
      })
      .then(async (checkResult) => {
        if (!checkResult) {
          return Promise.resolve();
        }
        const categoryToLink = [];
        for (let i = 0; i < checkResult.length; i += 1) {
          const queryRes = checkResult[i];
          if (queryRes.length > 0) {
            categoryToLink.push(db.query(
              ADD_RECIPE_JOIN_CATEGORY, [req.params.id, queryRes[0].CategoryID],
            ));
          } else {
            // Because LAST_INSERT_ID is being used here, queries must be done
            // sequentially, not parallelized like with Promise.all.
            // throw the error to the above catch block (transaction)
            await db.query(ADD_CATEGORY, req.body.Categories[i]);
            await db.query(ADD_RECIPE_JOIN_CATEGORY,
              [req.params.id, mysql.raw(LAST_INSERT_ID)]);
          }
        }
        return Promise.all(categoryToLink);
      })
      .then(() => { return Promise.resolve(req.params.id); });
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({ error: null, response: req.params.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
}
