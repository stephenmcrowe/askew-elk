import mysql from 'mysql';
import { Database, cnfg } from '../db';

const WHERE_ID = 'WHERE RecipeID = ?';
const SELECT_ONE = `
SELECT RecipeName, RecipeAuthor, DateAdded, Description, Rating, NumberOfRatings
FROM recipes
`;
const SELECT_BY_ID = `${SELECT_ONE} ${WHERE_ID}`;
export const getRecipe = (req, res) => {
  // console.log(req.params.id);
  const db = new Database(cnfg);
  db.query(SELECT_BY_ID, req.params.id)
  .then((result) => {
    console.log(result);
    res.status(200).json({ error: null, response: result });
    return db.close();
  })
  .catch((err) => {
    db.close();
    console.log(err);
    res.status(500).json({ error: err.sqlMessage, response: null });
  });
};

 const SELECT_ALL =  
 `SELECT RecipeName, RecipeAuthor, Rating, DateAdded
 FROM Recipes`;
 const SELECT_WHERE = `${SELECT_ALL}
 WHERE ?`;
 export const getRecipes = (req, res) => {
  let query = [];

  // Parse in the query entries
  Object.entries(req.query).forEach(([k, v]) => {
    if (k === 'RecipeName' || k === 'RecipeAuthor') {
        query.push(`${k} LIKE '%${v}%'`);
    } else {
        query.push(`${k} = '${v}'`);
    }
  });

  // admin wants everything without query params
  const db = new Database(cnfg);   
  if (query.length === 0) {
    db.query(SELECT_ALL)
      .then((result) => {
        res.status(200).json({ error: null, response: result });
        return db.close();
      })
      .catch((err) => {
        db.close();
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  } else {
    query = mysql.raw(query.join(' AND '));
    db.query(SELECT_WHERE, query)
      .then((result) => {
        res.status(200).json({ error: null, response: result });
        return db.close();
      })
      .catch((err) => {
        db.close();
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
      });
  }
};


// need transaction eventually
// const ADD_RECIPE = 
// `INSERT INTO Recipes(RecipeName, RecipeAuthor, Description, DateAdded)
// VALUES(?,?,?,?)`;
const ADD_RECIPE = 
`INSERT INTO Recipes(RecipeName, Description, DateAdded) VALUES(?,?,?)`;
// VALUES (?,?,?),(?, ?, ?), (?, ?, ?);
const ADD_DIRECTIONS =
`INSERT INTO Directions (RecipeID, StepNumber, Direction) VALUES ? `;
const LAST_INSERT_ID = `last_insert_id()`;
const GET_LAST_INSERT_ID = `SELECT last_insert_id() AS ID`;

const CHECK_INGREDIENT = `SELECT IngredientID FROM Ingredients WHERE IngredientName = ?`;
const ADD_INGREDIENT = `INSERT INTO Ingredients (IngredientName) VALUES (?)`;
const ADD_RECIPE_JOIN_INGREDIENT = `INSERT INTO recipetoingredient VALUES (?, ?)`;

const CHECK_CATEGORY = `SELECT CategoryID FROM Categories WHERE CategoryName = ?`;
const ADD_CATEGORY = `INSERT INTO Categories (CategoryName) VALUES (?)`;
const ADD_RECIPE_JOIN_CATEGORY = `INSERT INTO recipetocategory VALUES (?, ?)`;

export const addRecipe = (req, res) => {
    
  let insertRecipe = [];
  insertRecipe.push(`${(req.body.RecipeName)}`);

  if (req.body.hasOwnProperty('Description')) {
      insertRecipe.push(req.body.Description);
  } else {
      insertRecipe.push(mysql.raw(`NULL`));
  }
  insertRecipe.push(mysql.raw("NOW()"));

  const db = new Database(cnfg);
  db.query(ADD_RECIPE, insertRecipe)
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });

  // build the directions list
  //{
  //  RecipeName:""
  //  Description:""
  //  Directions:{#, text},{#, text}}
  //  Ingredients:["","",""]
  //  Category:["","",""]
  //}
  
  let directions = []
  Object.entries(req.body.Directions).forEach(([k, v]) => {
      directions.push(`(${LAST_INSERT_ID},${k},"${v}")`)
  });
  directions = mysql.raw(directions.join(', '));
  
  db.query(ADD_DIRECTIONS, directions)
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });

  let recipe_id = 0;
  db.query(GET_LAST_INSERT_ID)
    .then((result) => {
      console.log(result);
      recipe_id = result[0].ID;
    });

  for (let i = 0; i < req.body.Ingredients.length; i++) {
    console.log(req.body.Ingredients[i]);
    db.query(CHECK_INGREDIENT, req.body.Ingredients[i])
    .then((result) => {
      if (result.length > 0) {
        // ingredient is present
        db.query(ADD_RECIPE_JOIN_INGREDIENT, [recipe_id, result[0].IngredientID])
          .catch((err) => {
            console.log(err);
          });
      } else {
        // two inserts
        db.query(ADD_INGREDIENT, req.body.Ingredients[i])
          .catch((err) => {
            console.log(err);
          });
        db.query(ADD_RECIPE_JOIN_INGREDIENT, [recipe_id, mysql.raw(LAST_INSERT_ID)])
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });

  }

  for (let i = 0; i < req.body.Categories.length; i++) {
    console.log(req.body.Categories[i]);
    db.query(CHECK_CATEGORY, req.body.Categories[i])
    .then((result) => {
      if (result.length > 0) {
        // ingredient is present
        db.query(ADD_RECIPE_JOIN_CATEGORY, [recipe_id, result[0].CategoryID])
          .catch((err) => {
            console.log(err);
          });
      } else {
        // two inserts
        db.query(ADD_CATEGORY, req.body.Categories[i])
          .catch((err) => {
            console.log(err);
          });
        db.query(ADD_RECIPE_JOIN_CATEGORY, [recipe_id, mysql.raw(LAST_INSERT_ID)])
        .catch((err) => {
          console.log(err);
        });
      }
    })
    .catch((err) => {
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
  }

  res.status(200).json({ error: null, response:"Success!" });
  // db.close(); // closing DB
  
  
  //db.commit(function(err) {
  //    if (err) {
  //      return db.rollback(function() {
  //        throw err;
  //      });
  //    }

};

const DELETE_RECIPE = `DELETE FROM RECIPES WHERE RecipeID = ? AND RecipeAuthor = ?`;
export const deleteRecipe = (req, res) => {
  console.log(req.user);
  const db = new Database(cnfg);
  db.query(DELETE_RECIPE, [req.params.id, req.user.userID])
    .then(() => {
      res.status(200).json({ error: null, response: "Delete succeeded" });
      return db.close();
    })
    .catch((err) => {
      // error here if no permissions
      db.close();
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
  });
};