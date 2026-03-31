import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Name, email and password are required',
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email',
      [name, email, hashedPassword],
    );

    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    // Handle duplicate email
    if (err.code === '23505') {
      return res
        .status(409)
        .json({ status: 'error', message: 'Email already exists' });
    }
    throw err; // asyncWrapper will catch
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const cursor = Number(req.query.cursor) || 0;
    const limit = req.query.limit || 10;

    // Total rows for info
    const totalResult = await pool.query('SELECT COUNT(*) FROM users');
    const total = parseInt(totalResult.rows[0].count);

    // Fetch next slice using cursor
    const result = await pool.query(
      `SELECT * FROM users
       WHERE id > $1
       ORDER BY id ASC
       LIMIT $2`,
      [cursor, limit],
    );

    const nextCursor = result.rows.length
      ? result.rows[result.rows.length - 1].id
      : null;

    res.json({
      status: 'success',
      requestId: req.id,
      total,
      limit,
      nextCursor,
      results: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error(`[${req.id}]`, err);
    next(err);
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  res.json({ status: 'success', data: result.rows[0] });
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  res.json({ status: 'success', data: result.rows[0] });
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  res.json({
    status: 'success',
    message: 'User deleted successfully',
    data: result.rows[0],
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Email and password are required' });
  }
  const user = await pool.query('SELECT * from users where email = $1', [
    email,
  ]);
  if (user.rows.length === 0) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = {
    userId: user.rows[0].id,
    email: user.rows[0].email,
    role: user.rows[0].role
  };

  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h', // Token expires in 1 hour
  });

    res.json({
    status: 'success',
    message: 'logged in successfully',
    data: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
    },
    token: token
  });

};

