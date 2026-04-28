import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const userData = JSON.parse(localStorage.getItem('user'));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(userData);
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p>This is your dashboard. Here you can manage your reading activities and book collection.</p>
      <div className="dashboard-actions">
        <button onClick={() => navigate('/books')} className="action-btn">View Books</button>
        <button onClick={() => navigate('/add-book')} className="action-btn">Add Book</button>
      </div>
    </div>
  );
};

export default Dashboard;