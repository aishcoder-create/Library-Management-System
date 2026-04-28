import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ShelfX</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/user-activity">Activity</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;