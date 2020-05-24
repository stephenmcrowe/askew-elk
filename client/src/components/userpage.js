/* React imports */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';


/* Custom imports */
import logo from '../img/logo-sidebar.png';
import Recipe from './recipe';
import SearchBar from './searchbar';
import { signoutUser } from '../actions/userApi';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  sideBar = () => {
    return (
      <div className="sidebar-container">
        <img src={logo} id="logoSideBar" alt="Logo" />
        <NavLink to="/signup"> <button type="button" id="signUpButton">Browse</button></NavLink>
        <NavLink to="/signin"><button type="button" id="signInButton">Your Recipes</button></NavLink>
        <NavLink to="/signin"><button type="button" id="signInButton">Favorites</button></NavLink>
        <NavLink to="/signin"><button type="button" id="signInButton">Saved Notes</button></NavLink>
      </div>
    );
  }

  handleSignOut = () => {
    this.props.signoutUser()
      .then(() => { this.props.history.push('/'); });
  }

  topBarSignOut = () => {
    return (
      <div className="buttons-container">
        <button
          type="button"
          onClick={this.handleSignOut}
          id="signOutButton"
        >SIGN OUT
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="userpage">
        {this.sideBar()}
        <div className="user-area">
          {this.topBarSignOut()}
          <SearchBar />
          <div className="recipes-container">
            {/* <div className="recipe-container"> */}
            <Recipe />
            <Recipe />
            <Recipe />
            <Recipe />
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(connect(null, { signoutUser })(UserPage));
