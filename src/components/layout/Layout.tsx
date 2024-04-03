import { Outlet } from 'react-router-dom';
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

export default Layout;
