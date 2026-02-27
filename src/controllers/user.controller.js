import { pool } from '../config/db.js';

// Create a new user
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ status: 'error', message: 'Name and email are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    // Handle duplicate email
    if (err.code === '23505') {
      return res.status(409).json({ status: 'error', message: 'Email already exists' });
    }
    throw err; // asyncWrapper will catch
  }
};

// Get all users
export const getUsers = async (req, res) => {
  const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
  res.json({ status: 'success', data: result.rows });
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
    [name, email, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  res.json({ status: 'success', data: result.rows[0] });
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  res.json({ status: 'success', message: 'User deleted successfully', data: result.rows[0] });
};