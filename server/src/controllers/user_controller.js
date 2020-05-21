import mysql from 'mysql';
import db from '../db';

const WHERE_ID = 'WHERE UserID = ?';
const SELECT_ONE = ` SELECT UserName FROM users `;
const SELECT_BY_ID = `${SELECT_ONE} ${WHERE_ID}`;
export const getUser = (req, res) => {
    db.query(SELECT_BY_ID, req.params.id)
        .then((result) => {
            console.log(result);
            res.status(200).json({ error: null, response: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.sqlMessage, response: null });
        });
};

const SELECT_ALL = `SELECT UserID, UserName FROM users`;
export const getUsers = (req, res) => {
    db.query(SELECT_ALL)
        .then((result) => {
            res.status(200).json({ error: null, response: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.sqlMessage, response: null });
        });
};

export const updateUser = (req, res) => {

};

export const deleteUser = (req, res) => {

};
