import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Letter from './letter.svg';
import Alert from './alert.svg';

import './Header.css';
import { Link } from 'react-router-dom';
import { authActions, useAppSelector } from '../../../redux';

const Header = () => {
  const { isAuth } = useAppSelector(state => state.auth);

  return (
    <header className="header">
      <div className="absolute">
        <nav className="nav">
          <Link to="/" className="nav-item logo">
            CHAT APP
          </Link>
          <Link to="/" className="nav-item">
            Home
          </Link>
          {isAuth ? (
            <>
              <Link to="/" className="nav-item">
                Profile
              </Link>
              <Link
                to="/signin"
                className="nav-item"
                onClick={() => {
                  authActions.logout();
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-item">
                SignIn
              </Link>
              <Link to="/signup" className="nav-item">
                SignUp
              </Link>
            </>
          )}
        </nav>

        <div className="input-icons">
          <FaSearch className="input-icon" />
          <input
            className="input-field"
            type="text"
            placeholder="What are you looking for?"
          ></input>
        </div>

        <nav className="svg">
          <div className="user">
            <img
              src="https://res.cloudinary.com/dlwaao9wl/image/upload/v1655495372/avatars/default_avatar_a47u26.jpg"
              alt="Alert Logo"
            />
          </div>
          <img src={Alert} alt="Alert Logo" />
          <img src={Letter} alt="Letter Logo" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
