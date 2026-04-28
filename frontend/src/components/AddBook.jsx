import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const newBook = {
      id: Date.now(),
      ...formData,
      available: true
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    alert('Book added successfully!');
    navigate('/books');
  };

  return (
    <div className="add-book">
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;