import { Database, cnfg } from '../db';

const GET_FAVORITES = `
SELECT r.RecipeID AS id, r.RecipeName, u.UserName AS RecipeAuthor, r.DateAdded, r.Description
FROM favorites f
JOIN recipes r ON f.RecipeID = r.RecipeID
JOIN Users u ON r.RecipeAuthor = u.UserID
WHERE u.UserID = ?`;
export const getFavorites = (req, res) => {
  const db = new Database(cnfg);
  // let params = [];
  let query = GET_FAVORITES;
  // params.push(req.user.userID);
  if ('RecipeName' in req.query) {
    console.log('executed the filter block');
    query = `${GET_FAVORITES} AND RecipeName LIKE '%${req.query.RecipeName}%'`;
    // params.push(req.body.RecipeName);
  }

  db.query(query, req.user.userID)
    .then((result) => {
      res.status(200).json({ error: null, response: result });
      db.close();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
      db.close();
    });
};


const GET_FAVORITE = 'SELECT r.RecipeName, r.RecipeAuthor, r.DateAdded, r.Description FROM favorites f JOIN recipes r ON f.RecipeID = r.RecipeID WHERE f.UserID = ? AND r.RecipeID = ?';
export const getFavorite = (req, res) => {
  const db = new Database(cnfg);
  db.query(GET_FAVORITE, [req.user.userID, req.body.RecipeID])
    .then((result) => {
      res.status(200).json({ error: null, response: result[0] });
      db.close();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
      db.close();
    });
};

const ADD_FAVORITE = `INSERT INTO FAVORITES (UserID, RecipeID)
VALUE(?, ?)`;
export const addFavorite = (req, res) => {
  const db = new Database(cnfg);

  db.query(ADD_FAVORITE, [req.user.userID, req.body.RecipeID])
    .then(() => {
      res.status(200).json({ error: null, response: 'Favorite added successfully' });
      db.close();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
      db.close();
    });
};

const DELETE_FAVORITE = `DELETE FROM FAVORITES
WHERE UserID = ?
AND RecipeID = ?`;
export const deleteFavorite = (req, res) => {
  const db = new Database(cnfg);
  db.query(DELETE_FAVORITE, [req.user.userID, req.body.RecipeID])
    .then(() => {
      res.status(200).json({ error: null, response: 'Deleted Successfully' });
      db.close();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
      db.close();
    });
};
