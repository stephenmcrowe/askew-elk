import mysql from 'mysql';
import db from '../db';

const WHERE_ID = 'WHERE RecipeID = ?';
const SELECT_ONE = `
SELECT RecipeName, RecipeAuthor, DateAdded, Description, Rating, NumberOfRatings
FROM recipes
`;
const SELECT_BY_ID = `${SELECT_ONE} ${WHERE_ID}`;
export const getRecipe = (req, res) => {
    // console.log(req.params.id);
    db.query(SELECT_BY_ID, req.params.id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ error: null, response: result });

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    })
    ;
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
     if (query.length === 0) {
       db.query(SELECT_ALL)
         .then((result) => {
           res.status(200).json({ error: null, response: result });
         })
         .catch((err) => {
           console.log(err);
           res.status(500).json({ error: err.sqlMessage, response: null });
         });
     } else {
       query = mysql.raw(query.join(' AND '));
       db.query(SELECT_WHERE, query)
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
const ADD_RECIPE = 
`INSERT INTO Recipes(RecipeName, Description, DateAdded) VALUES(?,?,?)`;
// VALUES (?,?,?),(?, ?, ?), (?, ?, ?);
const ADD_DIRECTIONS =
`INSERT INTO Directions (RecipeID, StepNumber, Direction) VALUES ? `;
const LAST_INSERT_ID = `last_insert_id()`;

export const addRecipe = (req, res) => {
    let insertRecipe = [];
    insertRecipe.push(`"${mysql.raw(req.body.RecipeName)}"`);
    // insertRecipe.push(req.user.UserID)

    if (req.body.hasOwnProperty('description')) {
        insertRecipe.push(req.body.Description);
    } else {
        insertRecipe.push(mysql.raw(`NULL`));
    }
    insertRecipe.push(mysql.raw("NOW()"));


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

    res.status(200).json({ error: null, response:"Success!" });

    
    
    //db.commit(function(err) {
    //    if (err) {
    //      return db.rollback(function() {
    //        throw err;
    //      });
    //    }

};