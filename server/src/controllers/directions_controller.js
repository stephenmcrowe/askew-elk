// import mysql from 'mysql';
// import { Database, cnfg } from '../db';

// const CHECK_RECIPE = 'SELECT RecipeAuthor FROM Recipes WHERE RecipeID = ?';
// const UPDATE_DIRECTION = 'UPDATE directions SET Direction = ? WHERE RecipeID = ? AND StepNumber = ?';
// export const updateDirection = (req, res) => {
//   const db = new Database(cnfg);

//   db.query(CHECK_RECIPE, [req.params.id]).then((result) => {
//     if (result.RecipeAuthor === req.user.userID) {

//     } else {
//       db.query(UPDATE_DIRECTION, [req.body.Direction, req.params.id, req.body.StepNumber])
//         .then(() => {
//           res.status(200).json({ error: null, response: 'Update succeeded' });
//           return db.close();
//         })
//         .catch((err) => {
//           db.close();
//           console.log(err);
//           res.status(500).json({ error: err.sqlMessage, response: null });
//         });
//     }
    
  
//   };


// export const bunchabull = (req, res) => {

// };
