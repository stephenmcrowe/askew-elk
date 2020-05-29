/* React imports */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Custom imports */
import pic1 from '../img/mainpage_pic1.png';
import pic2 from '../img/mainpage_pic2.png';
import logo from '../img/title_logo.png';

const TopBarSignIn = (props) => {
  return (
    <div className="buttons-container">
      <NavLink to="/signup"><button type="button" className="default-button nav-button">SIGN UP</button></NavLink>
      <NavLink to="/signin"><button type="button" className="default-button nav-button">SIGN IN</button></NavLink>
    </div>
  );
};

const HomePage = (props) => {
  return (
    <>
      <TopBarSignIn />
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
    </>
  );
};

export default HomePage;
