import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ShelfX</h3>
          <p>Your gateway to knowledge and learning.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/user-activity">User Activity</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@shelfx.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Knowledge Ave, Book City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 ShelfX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;