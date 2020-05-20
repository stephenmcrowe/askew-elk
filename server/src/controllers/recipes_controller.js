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

// const SELECT_ALL =  
// `SELECT RecipeName, RecipeAuthor, Rating, DateAdded
// FROM Recipes`;
// const SELECT_WHERE = `${SELECT_ALL}
// WHERE ?`;
// export const getRecipes = (req, res) => {
//     let query = [];

//     // Parse in the query entries
//     Object.entries(req.query).forEach(([k, v]) => {
//       query.push(`${k} = '${v}'`);
//     });
  
//     // admin wants everything without query params
//     if (query.length === 0) {
//       db.query(SELECT_ALL)
//         .then((result) => {
//           res.status(200).json({ error: null, response: result });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({ error: err.sqlMessage, response: null });
//         });
//     } else {
//       query = mysql.raw(query.join(' AND '));
//       db.query(SELECT_WHERE, query)
//         .then((result) => {
//           res.status(200).json({ error: null, response: result });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json({ error: err.sqlMessage, response: null });
//         });
//     }
// };


// export const addRecipe = (req, res) => {
//     db.beginTransaction(funtion(err) {
//         if (err) { throw err; }
//         let insertRecipe = [];
//         insertRecipe.push(req.body.recipeName);
//         if req.body.hasOwnProperty('description') {
//             insertRecipe.push(req.description);
//         }
//         else {
//             insertRecipe.push(`NULL`);
//         }
//         insertRecipe.push(db.date());


//         db.query(`INSERT INTO Recipes(RecipeName, Description, DateAdded)
//                 VALUES(?,?,?)`, insertRecipe, function (error, results, fields) {
//           if (error) {
//             return connection.rollback(function() {
//               throw error;
//             });
        
//           }
//         })
//         db.commit(function(err) {
//             if (err) {
//               return db.rollback(function() {
//                 throw err;
//               });
//             }
//     });



// };