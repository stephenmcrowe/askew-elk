import mysql from 'mysql';
import db from '../db';
import { createMySqlDate } from '../utils/format';
import { genSaltedPassword } from '../utils/encrypt';

const GET_FAVORITES = 
`SELECT r.RecipeName, r.RecipeAuthor, r.Rating, r.dateAdded, c.CategoryName
FROM recipes r
JOIN favorites f ON f.RecipeID = r.RecipeID
JOIN recipetocategory rtc ON rtc.RecipeID = f.RecipeID
JOIN categories c on rtc.CategoryID = c.CategoryID
WHERE f.UserID = ?`
export const getFavorites = (req, res) => {
    db.query(GET_FAVORITES, req.user.userID)
    .then((result) => {
        res.status(200).json({error: null, response: result });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

};

const GET_FAVORITE = 
`SELECT r.RecipeName, r.RecipeAuthor,  r.Rating, r.NumberOfRatings,
r.Description, r.DateAdded,
FROM recipes r
JOIN favorites f ON f.RecipeID = r.RecipeID
WHERE f.UserID = ?
AND f.recipeID = ?`;

const GET_INGREDIENTS = 
`SELECT i.IngredientName
FROM ingredients i
JOIN recipeToIngredient r ON r.IngredientID = i.IngredientID 
WHERE r.RecipeID = ?`;

const GET_DIRECTIONS = 
`SELECT d.StepNumber, d.Direction
FROM directions d
WHERE d.RecipeID = ?
ORDER BY d.StepNumber ASC`

const GET_NUTRITION = 
`SELECT Fat, Sodium, Calories, Protein
FROM nutrition
WHERE RecipeID = ?`

export const getFavorite = (req, res) => {
    let respHeader = [];
    db.query(GET_FAVORITE, [req.user.userID, req.params.id])
    .then((result) => {
        respHeader.push(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

    db.query(GET_INGREDIENTS, req.params.id)
    .then((result) => {
        respHeader.push(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

    db.query(GET_DIRECTIONS, req.params.id)
    .then((result) => {
        respHeader.push(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });

    db.query(GET_NUTRITION, req.params.id)
    .then((result) => {
        respHeader.push(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null});
    });
    res.status(200).json({ error: null,
                            description: respHeader[0],
                            ingredients: respHeader[1],
                            directions: respHeader[2],
                            nutrition: respHeader[3]});

};

const ADD_FAVORITE =
`INSERT INTO FAVORITES (UserID, RecipeID)
VALUE(?, ?)`;
export const addFavorite = (req, res) => {
    db.query(ADD_FAVORITE, [req.user.UserID, req.params.id])
    .then(() => {
        status(200).json({ error: null, response: result });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
    });
};

const DELETE_FAVORITE = 
`DELETE FROM FAVORITES
WHERE UserID = ?
AND RecipeID = ?`;
export const addFavorite = (req, res) => {
    db.query(DELETE_FAVORITE, [req.user.UserID, req.params.id])
    .then(() => {
        status(200).json({ error: null, response: 'Deleted Successfully' });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.sqlMessage, response: null });
    });
};