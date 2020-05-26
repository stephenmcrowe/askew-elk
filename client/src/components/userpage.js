/* eslint-disable react/jsx-props-no-spreading */
/* React imports */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/* Custom imports */
import Recipe from './recipe';
import SearchBar from './searchbar';
import SideBar from './sideBar';
import SignOutButton from './signOutButton';

/* Redux imports */
import { getRecipes } from '../actions/recipeApi';

class UserPage extends Component {
  componentDidMount() {
    // this.props.getRecipes();
  }

  render() {
    return (
      <div className="userpage">
        <SideBar />
        <div className="user-area">
          <SignOutButton />
          <SearchBar pathname={this.props.location.pathname} />
          <div className="user-container">
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


export default withRouter(connect(null, { getRecipes })(UserPage));
