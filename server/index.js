const express = require('express');
const cors = require('cors');
const pool = require('./db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Register
app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await pool.query(
        'INSERT INTO Users (user_id, username, email) VALUES ($1, $2, $3)',
        [username, hashedPassword]
      );
  
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

// Login
app.post('/login', async (req, res) => {
    try {
      const { user_id, username, email } = req.body;
  
      const user = await pool.query(
        'SELECT * FROM Users WHERE username = $1',
        [username]
      );
  
      if (user.rows.length === 0) {
        return res.status(401).json('Invalid credentials');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
  
      if (!isPasswordValid) {
        return res.status(401).json('Invalid credentials');
      }
  
      const token = jwt.sign({ user: user.rows[0].id }, 'your-secret-key');
  
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});