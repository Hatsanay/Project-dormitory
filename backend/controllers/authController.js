const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE user_Name = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.user_PasswordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.user_ID, username: user.user_Name }, process.env.JWT_SECRET, { expiresIn: '5m' });

    res.json({ token });
  });
};

const register = (req, res) => {
  const { username, password } = req.body;

  // ดึงเลขลำดับปัจจุบันจากตาราง users
  const query = 'SELECT MAX(user_ID) AS maxId FROM users';
  db.query(query, [], (err, result) => {
    if (err) {
      console.error('ID sequence query error:', err);
      return res.status(500).json({ error: 'ID sequence query error' });
    }

    let maxId = result[0].maxId || 0; // ถ้าไม่มีค่า maxId ให้ใช้ 0 เป็นค่าเริ่มต้น
    let num = parseInt(maxId) + 1; // แปลงค่าและเพิ่ม 1
    const userID = String(num).padStart(3, '0'); // สร้าง user_ID ใหม่ในรูปแบบ 001, 002, ...

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Password hashing error:', err);
        return res.status(500).json({ error: 'Password hashing error' });
      }

      const query = 'INSERT INTO users (user_ID, user_Name, user_PasswordHash) VALUES (?, ?, ?)';
      db.query(query, [userID, username, hash], (err, results) => {
        if (err) {
          console.error('Database insertion error:', err);
          return res.status(500).json({ error: 'Database insertion error' });
        }

        res.status(201).json({ message: 'User registered successfully!' });
      });
    });
  });
};

module.exports = { login, register };
