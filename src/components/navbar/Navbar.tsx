import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Notification from '../notification/Notification';
import { useNotificationStore } from '../../store/notificationStore';
const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  const handleMenuClick = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <nav className="nav container">
      <div className="nav__left">
        <Link to="/" className="nav__logo">
          <img src="/logo.png" alt="logo" className="nav__logo-img" />
          <span className="nav__logo-text">BookMe</span>
        </Link>
        <Link to="/list" className="nav__link">
          Services
        </Link>
        {user && (
          <>
            <Link to="/chat" className="nav__link">
              Chat
            </Link>
          </>
        )}
      </div>
      <div className="nav__right">
        {user ? (
          <div className="nav__user-div">
            <Link to="/profile">
              <img className="user-image" src={user.avatar || '/noavatar.jpeg'} alt="" />
            </Link>
            <span className="user-span">{user.username}</span>
            <Link className="user-link" to="/profile">
              {number > 0 && <Notification number={number} />}
              Profile
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav__link">
              Sign in
            </Link>
            <Link to="/register" className="nav__link nav__link--accent">
              Sign up
            </Link>
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
        {open && (
          <div className={`nav__menu ${open ? 'active' : ''}`}>
            <Link to="/list" className="nav__menu-item" onClick={handleMenuClick}>
              Services
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="nav__menu-item" onClick={handleMenuClick}>
                  Sign in
                </Link>
                <Link to="/register" className="nav__menu-item" onClick={handleMenuClick}>
                  Sign up
                </Link>
              </>
            ) : (
              <Link to="/chat" className="nav__menu-item" onClick={handleMenuClick}>
                Chat
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
