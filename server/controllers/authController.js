const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function signAccessToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
}
function signRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hash });
    await user.save();

    const token = signAccessToken(user);
    const refresh = signRefreshToken();
    user.refreshToken = refresh; // store raw for demo; in production hash it
    await user.save();
    res.cookie('refreshToken', refresh, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = signAccessToken(user);
    const refresh = signRefreshToken();
    user.refreshToken = refresh;
    await user.save();
    res.cookie('refreshToken', refresh, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.refresh = async (req, res) => {
  try {
    const r = req.cookies.refreshToken;
    if (!r) return res.status(401).json({ msg: 'No refresh token' });
    const user = await User.findOne({ refreshToken: r });
    if (!user) return res.status(401).json({ msg: 'Invalid refresh' });
    const token = signAccessToken(user);
    const newRefresh = signRefreshToken();
    user.refreshToken = newRefresh;
    await user.save();
    res.cookie('refreshToken', newRefresh, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    const r = req.cookies.refreshToken;
    if (r) {
      await User.findOneAndUpdate({ refreshToken: r }, { $unset: { refreshToken: 1 } });
    }
    res.clearCookie('refreshToken');
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
