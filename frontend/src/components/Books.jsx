import { useState } from 'react';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState(() => {
    let storedBooks = JSON.parse(localStorage.getItem('books') || '[]');
    if (storedBooks.length === 0) {
      // Initialize with some sample books
      storedBooks = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', available: true },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', available: true },
        { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', available: true },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', available: true },
      ];
      localStorage.setItem('books', JSON.stringify(storedBooks));
    }
    return storedBooks;
  });

  const handleBorrow = (bookId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to borrow books');
      return;
    }

    const updatedBooks = books.map(book =>
      book.id === bookId ? {
        ...book,
        available: false,
        borrower: user.name,
        borrowedAt: new Date().toLocaleString()
      } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    alert('Book borrowed successfully!');
  };

  const handleReturn = (bookId) => {
    const updatedBooks = books.map(book =>
      book.id === bookId ? { ...book, available: true } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  return (
    <div className="books">
      <h1>Books</h1>
      <div className="book-list">
        {books.length === 0 ? (
          <p>No books available. Add some books first.</p>
        ) : (
          books.map(book => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Status: {book.available ? 'Available' : 'Borrowed'}</p>
              {book.available ? (
                <button onClick={() => handleBorrow(book.id)} className="borrow-btn">Borrow</button>
              ) : (
                <button onClick={() => handleReturn(book.id)} className="return-btn">Return</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;