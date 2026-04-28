import { useState } from 'react';
import './UserActivity.css';

const UserActivity = () => {
  const [onlineUsers] = useState(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.map(user => ({
      ...user,
      isOnline: Math.random() > 0.5, // Simulate online status
      lastSeen: new Date(Date.now() - Math.random() * 86400000).toLocaleString() // Random time within last 24 hours
    }));
  });

  const [borrowingHistory] = useState(() => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    return books
      .filter(book => !book.available)
      .map(book => ({
        ...book,
        borrowedAt: book.borrowedAt || new Date(Date.now() - Math.random() * 604800000).toLocaleString(), // Random time within last week
        borrower: book.borrower || 'Unknown User'
      }));
  });

  const onlineCount = onlineUsers.filter(user => user.isOnline).length;

  return (
    <div className="user-activity">
      <h1>User Activity Dashboard</h1>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-number">{onlineUsers.length}</div>
        </div>
        <div className="stat-card online">
          <h3>Users Online</h3>
          <div className="stat-number">{onlineCount}</div>
        </div>
        <div className="stat-card">
          <h3>Books Borrowed</h3>
          <div className="stat-number">{borrowingHistory.length}</div>
        </div>
      </div>

      <div className="activity-sections">
        <section className="online-users">
          <h2>Online Users</h2>
          <div className="users-list">
            {onlineUsers.filter(user => user.isOnline).length > 0 ? (
              onlineUsers
                .filter(user => user.isOnline)
                .map(user => (
                  <div key={user.email} className="user-card online">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                      <span className="status-indicator online">Online</span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="no-data">No users currently online</p>
            )}
          </div>
        </section>

        <section className="borrowing-activity">
          <h2>Current Borrowing Activity</h2>
          <div className="borrowing-list">
            {borrowingHistory.length > 0 ? (
              borrowingHistory.map(book => (
                <div key={book.id} className="borrowing-card">
                  <div className="book-info">
                    <h4>{book.title}</h4>
                    <p>by {book.author}</p>
                    <small>ISBN: {book.isbn}</small>
                  </div>
                  <div className="borrowing-details">
                    <p><strong>Borrower:</strong> {book.borrower}</p>
                    <p><strong>Borrowed At:</strong> {book.borrowedAt}</p>
                    <span className="status-indicator borrowed">Currently Borrowed</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No books currently borrowed</p>
            )}
          </div>
        </section>

        <section className="recent-activity">
          <h2>All Users Status</h2>
          <div className="users-list">
            {onlineUsers.map(user => (
              <div key={user.email} className={`user-card ${user.isOnline ? 'online' : 'offline'}`}>
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <span className={`status-indicator ${user.isOnline ? 'online' : 'offline'}`}>
                    {user.isOnline ? 'Online' : 'Last seen: ' + user.lastSeen}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserActivity;