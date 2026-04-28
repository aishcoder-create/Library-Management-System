import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [stats] = useState(() => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const availableBooks = books.filter(book => book.available).length;

    return {
      totalBooks: books.length,
      availableBooks,
      totalUsers: users.length,
      borrowedBooks: books.length - availableBooks
    };
  });

  const [featuredBooks] = useState(() => {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    return books.slice(0, 4); // Show first 4 books
  });

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to ShelfX</h1>
        <p>Discover, borrow, and manage books with ease. Join our community of book lovers today.</p>
        <div className="hero-actions">
          <Link to="/books" className="cta-btn primary">Explore Books</Link>
          <Link to="/signup" className="cta-btn secondary">Join Now</Link>
        </div>
      </section>

      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{stats.totalBooks}</div>
            <div className="stat-label">Total Books</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.availableBooks}</div>
            <div className="stat-label">Available Books</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Registered Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.borrowedBooks}</div>
            <div className="stat-label">Books Borrowed</div>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>What We Offer</h2>
        <div className="services-grid">
          <Link to="/books" className="service-link">
            <div className="service-card">
              <div className="service-icon">📚</div>
              <h3>Book Catalog</h3>
              <p>Browse and search our extensive collection of books across all genres.</p>
            </div>
          </Link>
          <Link to="/signup" className="service-link">
            <div className="service-card">
              <div className="service-icon">👤</div>
              <h3>User Management</h3>
              <p>Create your account and manage your borrowing history and preferences.</p>
            </div>
          </Link>
          <Link to="/add-book" className="service-link">
            <div className="service-card">
              <div className="service-icon">➕</div>
              <h3>Add Books</h3>
              <p>Contribute to our collection by adding new books to our digital catalog.</p>
            </div>
          </Link>
          <Link to="/contact" className="service-link">
            <div className="service-card">
              <div className="service-icon">📞</div>
              <h3>Support</h3>
              <p>Get in touch with our support team for any questions or assistance.</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="featured-books">
        <h2>Featured Books</h2>
        <div className="books-grid">
          {featuredBooks.length > 0 ? (
            featuredBooks.map(book => (
              <div key={book.id} className="book-card">
                <h4>{book.title}</h4>
                <p>by {book.author}</p>
                <span className={`status ${book.available ? 'available' : 'borrowed'}`}>
                  {book.available ? 'Available' : 'Borrowed'}
                </span>
              </div>
            ))
          ) : (
            <div className="no-books">
              <p>No books available yet. Add some books to get started!</p>
              <Link to="/add-book" className="cta-btn">Add First Book</Link>
            </div>
          )}
        </div>
        {featuredBooks.length > 0 && (
          <Link to="/books" className="view-all-btn">View All Books</Link>
        )}
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/books" className="action-card">
            <span className="action-icon">🔍</span>
            <span className="action-text">Browse Books</span>
          </Link>
          <Link to="/add-book" className="action-card">
            <span className="action-icon">📖</span>
            <span className="action-text">Add Book</span>
          </Link>
          <Link to="/dashboard" className="action-card">
            <span className="action-icon">📊</span>
            <span className="action-text">My Dashboard</span>
          </Link>
          <Link to="/user-activity" className="action-card">
            <span className="action-icon">👥</span>
            <span className="action-text">User Activity</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;