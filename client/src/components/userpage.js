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
        <NavLink to="/userpage/browse"> <button type="button" id="browseButton">Browse</button></NavLink>
        <NavLink to="/userpage/yourrecipes"><button type="button" id="yourRecipesButton">Your Recipes</button></NavLink>
        <NavLink to="/userpage/favorites"><button type="button" id="favoritesButton">Favorites</button></NavLink>
        <NavLink to="/userpage/savednotes"><button type="button" id="savedNotesButton">Saved Notes</button></NavLink>
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
