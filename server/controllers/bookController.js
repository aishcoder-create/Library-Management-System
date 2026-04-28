const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, copies, description } = req.body;
    const cover = req.file ? `/uploads/${req.file.filename}` : undefined;
    const book = new Book({ title, author, isbn, copies, cover, description });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const q = req.query.q || '';
    const books = await Book.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') },
        { isbn: new RegExp(q, 'i') }
      ]
    }).limit(100);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) updates.cover = `/uploads/${req.file.filename}`;
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
