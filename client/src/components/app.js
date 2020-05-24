// change require to es6 import style
// import $ from 'jquery';
import '../style.scss';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

/* Custom imports */
import HomePage from './homepage';
import Signin from './signin';
import Signup from './signup';
import UserPage from './userpage';
import DetailedRecipe from './detailedRecipe';


const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <div className="screen-container">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/userpage" component={UserPage} />
          <Route exact path="/userpage/recipe/:id" component={DetailedRecipe} />
          {/* <Route path="/about" component={About} />
          <Route exact path="/test/:id" component={Test} /> */}
          <Route component={FallBack} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
