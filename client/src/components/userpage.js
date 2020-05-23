/* React imports */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo-sidebar.png';


/* Custom imports */
import Recipe from './recipe';

// const TopBarSignOut = (props) => {
//     return (
//         <div className="buttons-container">
//         <button type="submit" id="signOutButton">SIGN OUT</button>
//       </div>
//     );
// };

const SideBar = (props) => {
  return (
    <div className="sidebar-container">
      <img src={logo} id="logoSideBar" alt="Logo" />
      <NavLink to="/signup"> <button type="button" id="signUpButton">Browse</button></NavLink>
      <NavLink to="/signin"><button type="button" id="signInButton">Your Recipes</button></NavLink>
      <NavLink to="/signin"><button type="button" id="signInButton">Favorites</button></NavLink>
      <NavLink to="/signin"><button type="button" id="signInButton">Saved Notes</button></NavLink>
    </div>
  );
};

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'current username',
    };
  }

  render() {
    return (
      <div className="userpage">
        <SideBar />
        <div className="user-area">
          <div className="recipes-container">
            <div className="recipe-container">
              Hello
              {this.state.username}
              <Recipe />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default UserPage;
