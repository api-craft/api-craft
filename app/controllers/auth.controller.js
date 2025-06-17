import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { Token } from '../models/token.model.js';

const createToken = async (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await Token.create({ userId: user._id, token, expiresAt });

  return token;
};

export const register = async (req, res) => {
  try {
    const { username, email, password,role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ username, email, password,role });
    const token = await createToken(user);

    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = await createToken(user);
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
};

export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];
  await Token.deleteOne({ token });

  res.json({ message: 'Logged out' });
};
