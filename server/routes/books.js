const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');

// simple disk storage for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.join(__dirname, '..', 'uploads')); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')); }
});
const upload = multer({ storage });

router.get('/', getBooks);
router.post('/', auth, upload.single('cover'), createBook);
router.get('/:id', getBook);
router.put('/:id', auth, upload.single('cover'), updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;
