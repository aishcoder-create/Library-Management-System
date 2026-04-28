require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

// Connect DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// basic rate limiter
const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

// serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
