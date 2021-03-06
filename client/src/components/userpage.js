/* eslint-disable react/jsx-props-no-spreading */
/* React imports */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

/* Third-party imports */
import PulseLoader from 'react-spinners/PulseLoader';

/* Custom imports */
import Recipe from './recipe';
import SearchBar from './searchbar';
import SideBar from './sideBar';
import SignOutButton from './signOutButton';

/* Redux imports */
import { getRecipes, getFavorites } from '../actions/recipeApi';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.search(this.props.location.pathname, null);
  }

  search = (pathname, searchterm) => {
    this.setState({ loading: true });
    if (searchterm) {
      switch (pathname) {
        case '/browse':
          this.props.getRecipes({ RecipeName: searchterm })
            .then(() => { this.setState({ loading: false }); });
          break;
        case '/browse/yourrecipes':
          this.props.getRecipes({
            RecipeName: searchterm,
            byUser: true,
          })
            .then(() => { this.setState({ loading: false }); });
          break;
        case '/browse/favorites':
          this.props.getFavorites({
            RecipeName: searchterm,
          })
            .then(() => { this.setState({ loading: false }); });
          break;
        default:
          this.props.getRecipes()
            .then(() => { this.setState({ loading: false }); });
      }
    } else {
      switch (pathname) {
        case '/browse':
          this.props.getRecipes()
            .then(() => { this.setState({ loading: false }); });
          break;
        case '/browse/yourrecipes':
          this.props.getRecipes({ byUser: true })
            .then(() => { this.setState({ loading: false }); });
          break;
        case '/browse/favorites':
          this.props.getFavorites()
            .then(() => { this.setState({ loading: false }); });
          break;
        default:
          this.props.getRecipes()
            .then(() => { this.setState({ loading: false }); });
      }
    }
  }

  renderTitle = () => {
    switch (this.props.location.pathname) {
      case '/browse':
        return (
          <h2>Browse</h2>
        );
      case '/browse/favorites':
        return (
          <h2>Favorites</h2>
        );
      case '/browse/yourrecipes':
        return (
          <h2>Your Recipes</h2>
        );
      default:
        return (
          <h2> </h2>
        );
    }
  }

  renderContent = () => {
    if (this.state.loading) {
      return (
        <PulseLoader />
      );
    }
    return (
      <>
        <div className="pageHeader">
          {this.renderTitle()}
        </div>
        <SearchBar
          history={this.props.history}
          search={this.search}
          pathname={this.props.location.pathname}
        />
        <div className="user-container">
          <Recipe />
        </div>
      </>
    );
  }

  render() {
    return (
      <div className="userpage">
        <SideBar search={this.search} />
        <div className="user-area">
          <div className="buttons-container">
            <SignOutButton />
          </div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}


export default withRouter(connect(null, { getRecipes, getFavorites })(UserPage));
