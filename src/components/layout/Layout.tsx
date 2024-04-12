import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../navbar/Navbar';

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <Navbar />
      </header>
      <main className="hide-scroll content">
        <Outlet />
      </main>
    </div>
  );
};

const RequiredAuthLayout = () => {
  const { user } = useContext(AuthContext);

  return !user ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout">
      <header className="header">
        <Navbar />
      </header>
      <main className="hide-scroll content">
        <Outlet />
      </main>
    </div>
  );
};

export { Layout, RequiredAuthLayout };
