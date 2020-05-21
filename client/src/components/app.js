// change require to es6 import style
// import $ from 'jquery';
import '../style.scss';
import React from 'react';
// import Figure from 'react-bootstrap/Figure';
// import ReactDOM from 'react-dom';
// import {
//   BrowserRouter as Router, Route, NavLink, Switch,
// } from 'react-router-dom';
// import Counter from './counter';
// import Controls from './controls';
import pic1 from '../img/mainpage_pic1.png';
import pic2 from '../img/mainpage_pic2.png';
import logo from '../img/title_logo.png';


// const $num = 0;

// const About = (props) => {
//   return <div> All there is to know about me </div>;
// };

const TopBar = (props) => {
  return (
    <div className="buttons-container">
      <button type="submit" id="signUpButton">SIGN UP</button>
      <button type="submit" id="signInButton">SIGN IN</button>
    </div>
  );
};

const HomePage = (props) => {
  return (
    <div className="main-container">
      <div className="main-container-left">
        <div className="main-container-left-row1">
          <img src={logo} id="logoPic" alt="Title Logo" />
        </div>
        <div className="main-container-left-row2">
          A place to browse, view, and share your favorite recipes!
        </div>
        <div className="main-container-left-row3">
          <img src={pic2} id="food2Pic" alt="food pic 2" />
        </div>
      </div>
      <div className="main-container-right">
        <img src={pic1} id="food1Pic" alt="food pic 1" />
      </div>

    </div>
  );
};
// const Test = (props) => {
//   return <div> ID: {props.match.params.id} </div>;
// };
// const FallBack = (props) => {
//   return <div>URL Not Found</div>;
// };

const App = (props) => {
  return (
    <div className="screen-container">
      <TopBar />
      <HomePage />
    </div>
  );
};

// <Router>
// <div>
/* <Nav /> */
/* <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
          <Route exact path="/test/:id" component={Test} />
          <Route component={FallBack} />
        </Switch> */
/* adding in the counter component */
/* <Counter /> */
/* adding in the button 'control' component */
/* <Controls /> */
// </div>
// </Router>d

// const Nav = (props) => {
//   return (
//     <nav>
//       <ul>
//         <li><NavLink to="/" exact>Home</NavLink></li>
//         <li><NavLink to="/about">About</NavLink></li>
//         <li><NavLink to="/test/id1">test id1</NavLink></li>
//         <li><NavLink to="/test/id2">test id2</NavLink></li>
//       </ul>
//     </nav>
//   );
// };

export default App;

// ReactDOM.render(<App />, document.getElementById('main'));
