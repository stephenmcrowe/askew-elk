import mysql from 'mysql';
import { Database, cnfg } from '../db';


const GET_RATINGS = `SELECT r.RecipeName, rates.Rating
FROM recipes r
JOIN rates ON r.RecipeID = rates.RecipeID
WHERE rates.UserID = ?`;
export const getRatings = (req, res) => {
  const db = new Database(cnfg);
  db.query(GET_RATINGS, req.user.userID)
    .then((result) => {
      res.status(200).json({ error: null, response: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

const ADD_RATING = 'INSERT INTO rates (RecipeID, UserID, Rating) VALUES(?,?,?)';

const UPDATE_NUMBER_OF_RATINGS = 'UPDATE recipes SET NumberOfRatings = (SELECT COUNT(*) FROM rates WHERE RecipeID = ?)  WHERE RecipeID = ?';

const UPDATE_AVERAGE_RATING = 'UPDATE recipes SET Rating = (SELECT AVG(Rating) FROM rates WHERE RecipeID = ?) WHERE RecipeID = ?';


export const addRating = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(ADD_RATING, [req.body.RecipeID, req.user.userID, req.body.Rating])
      .then(() => {
        return db.query(UPDATE_NUMBER_OF_RATINGS, [req.body.RecipeID, req.body.RecipeID]);
      })
      .then(() => {
        return db.query(UPDATE_AVERAGE_RATING, [req.body.RecipeID, req.body.RecipeID]);
      });
  })
    .then((result) => {
      res.status(200).json({ error: null, response: 'success' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};


const UPDATE_RATING = 'UPDATE rates SET Rating = ? WHERE UserID = ? AND RecipeID = ?';
export const updateRating = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(UPDATE_RATING, [req.body.Rating, req.user.userID, req.body.RecipeID])
      .then(() => {
        return db.query(UPDATE_NUMBER_OF_RATINGS, [req.body.RecipeID, req.body.RecipeID]);
      })
      .then(() => {
        return db.query(UPDATE_AVERAGE_RATING, [req.body.RecipeID, req.body.RecipeID]);
      });
  })
    .then((result) => {
      res.status(200).json({ error: null, response: 'success' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

const DELETE_RATING = 'DELETE FROM rates WHERE UserID = ? AND RecipeID = ?';
export const deleteRating = (req, res) => {
  const db = new Database(cnfg);
  db.createTransaction(() => {
    return db.query(DELETE_RATING, [req.user.userID, req.body.RecipeID])
      .then(() => {
        return db.query(UPDATE_NUMBER_OF_RATINGS, [req.body.RecipeID, req.body.RecipeID]);
      })
      .then(() => {
        return db.query(UPDATE_AVERAGE_RATING, [req.body.RecipeID, req.body.RecipeID]);
      });
  })
    .then((result) => {
      res.status(200).json({ error: null, response: 'success' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.sqlMessage, response: null });
    });
};
