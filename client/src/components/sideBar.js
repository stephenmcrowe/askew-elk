
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo-sidebar.png';

const SideBar = (props) => {
  const username = localStorage.getItem('username');
  return (
    <div className="sidebar-container">
      <img src={logo} id="logoSideBar" alt="Logo" />
      <NavLink to="/browse">
        <button type="button"
          id="browseButton"
          onClick={() => props.search('/browse', null)}
        >Browse
        </button>
      </NavLink>
      <NavLink to="/browse/yourrecipes">
        <button type="button"
          id="yourRecipesButton"
          onClick={() => props.search('/browse/yourrecipes', null)}
        >Your Recipes
        </button>
      </NavLink>
      <NavLink to="/browse/favorites">
        <button
          type="button"
          id="favoritesButton"
          onClick={() => props.search('/browse/favorites', null)}
        >Favorites
        </button>
      </NavLink>
      <NavLink to="/savednotes">
        <button
          type="button"
          id="savedNotesButton"
        >Saved Notes
        </button>
      </NavLink>
      <div className="signedInAs">
        <h3> <span> Signed in as: </span> {username}</h3>
      </div>
    </div>
  );
};

export default SideBar;
