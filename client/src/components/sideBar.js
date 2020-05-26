
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo-sidebar.png';


const sideBar = (props) => {
  return (
    <div className="sidebar-container">
      <img src={logo} id="logoSideBar" alt="Logo" />
      <NavLink to="/browse"> <button type="button" id="browseButton">Browse</button></NavLink>
      <NavLink to="/yourrecipes"><button type="button" id="yourRecipesButton">Your Recipes</button></NavLink>
      <NavLink to="/favorites"><button type="button" id="favoritesButton">Favorites</button></NavLink>
      <NavLink to="/savednotes"><button type="button" id="savedNotesButton">Saved Notes</button></NavLink>
    </div>
  );
};

export default sideBar;
