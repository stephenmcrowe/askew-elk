import { tokenForUser } from '../utils/encrypt';

/*
 * Signin route. Most of the work is done in passport.js.
 * Provide the username and password through POST body
 * return - a JWT token, the logged in user's uuid, and
 *          whether they are an admin
*/
const signin = (req, res) => {
  // Handle error to give more information back to the user
  if (req.user.error) { // req.user comes from passport
    res.status(req.user.status).json({
      error: req.user.error,
      response: null,
    });
  } else {
    res.status(200).json({
      error: null,
      response: {
        userID: req.user.userID,
        username: req.user.username,
        token: tokenForUser(req.user),
      },
    });
  }
};

export const testauth = (req, res) => {
  res.json(req.user);
};

export default signin;
