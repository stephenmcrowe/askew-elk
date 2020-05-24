import mysql from 'mysql';
import db from '../db';
import { createMySqlDate } from '../utils/format';
import { genSaltedPassword } from '../utils/encrypt';


const GET_RATINGS =
`SELECT r.RecipeName, ratings.Rating
FROM recipes r
JOIN rates ON r.RecipeID = rates.RecipeID
WHERE rates.UserID = ?`;
export const getRatings = (req, res) => {
    db.query(GET_RATINGS, req.user.userID)
    .then((result) => {
        res.status(200).json({error: null, response: result });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

};

const ADD_RATING =
`INSERT INTO rates (RecipeID, UserID, Rating)
VALUES(?,?,?)`;

const UPDATE_NUMBER_OF_RATINGS = 
`UPDATE recipes WHERE RecipeID = ?
SET NumberOfRatings = (SELECT COUNT(*) FROM rates WHERE RecipeID = ?) + 1`

const UPDATE_AVERAGE_RATING
`UPDATE recipes WHERE RecipeID = ?
SET Rating = (SELECT SUM(Rating) FROM rates WHERE RecipeID = ?) /
(SELECT NumberOfRatings FROM recipes WHERE RecipeID = ?)  `;


export const addRating = (req, res) => {
    db.query(ADD_RATING, [req.body.RecipeID. req.user.userID, req.body.rating])
    .then((result) => {
        res.status(200).json({error: null, response: result });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

};

const UPDATE_RATING =
`INSERT INTO rates (RecipeID, UserID, Rating)
VALUES(?,?,?)`;
export const updateRating = (req, res) => {
    db.query(UPDATE_RATING, [req.params.id. req.user.userID, req.params.rating])
    .then((result) => {
        res.status(200).json({error: null, response: result });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

};

const DELETE_RATING =
`DELETE FROM rates 
WHERE UserID = ?
AND RecipeID = ?`;
export const deleteRating = (req, res) => {
    db.query(DELETE_RATING, [req.params.id. req.user.userID])
    .then((result) => {
        res.status(200).json({error: null, response: result });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

};