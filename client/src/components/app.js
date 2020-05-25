// change require to es6 import style
// import $ from 'jquery';
import '../style.scss';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

/* Custom imports */
import PrivateRoute from './privateRoute';
import HomePage from './homepage';
import Signin from './signin';
import Signup from './signup';
import UserPage from './userpage';
import DetailedRecipe from './detailedRecipe';
import NewRecipe from './newRecipe';
import SavedNotes from './savednotes';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <div className="screen-container">
      <Router>
        <Switch>
          <Route exact path="/homepage" component={HomePage} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/recipe/create" component={NewRecipe} />
          <PrivateRoute exact path="/recipe/:id" component={DetailedRecipe} />
          <PrivateRoute exact path="/savednotes" component={SavedNotes} />
          <PrivateRoute path="/" component={UserPage} />
          <Route component={FallBack} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
