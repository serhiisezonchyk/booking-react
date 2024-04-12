import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Notification from '../notification/Notification';
const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { user } = useContext(AuthContext);
  return (
    <nav className="nav container">
      <div className="nav__left">
        <a href="/" className="nav__logo">
          <img src="/logo.png" alt="logo" className="nav__logo-img" />
          <span className="nav__logo-text">BookMe</span>
        </a>
        <a href="/home" className="nav__link">
          Home
        </a>
        <a href="/about" className="nav__link">
          About
        </a>
        <a href="/contact" className="nav__link">
          Contact
        </a>
        <a href="/agents" className="nav__link">
          Agents
        </a>
      </div>
      <div className="nav__right">
        {user ? (
          <div className="nav__user-div">
            <Link to="/profile">
              <img className="user-image" src={user.avatar || '/noavatar.jpeg'} alt="" />
            </Link>

            <span className="user-span">{user.username}</span>
            <Link className="user-link" to="/profile">
              <Notification />
              Profile
            </Link>
          </div>
        ) : (
          <>
            <a href="/login" className="nav__link">
              Sign in
            </a>
            <a href="/register" className="nav__link nav__link--accent">
              Sign up
            </a>
          </>
        )}

        <div className="nav__menu-button">
          <img
            src="./menu.png"
            alt="Menu icon"
            className="nav__menu-button__icon"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
        </div>
        <div className={`nav__menu ${open ? 'active' : ''}`}>
          <a href="/home" className="nav__menu-item">
            Home
          </a>
          <a href="/about" className="nav__menu-item">
            About
          </a>
          <a href="/contact" className="nav__menu-item">
            Contact
          </a>
          <a href="/agents" className="nav__menu-item">
            Agents
          </a>
          <a href="/" className="nav__menu-item">
            Sign in
          </a>
          <a href="/" className="nav__menu-item">
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
