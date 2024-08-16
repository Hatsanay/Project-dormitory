const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE user_Name = ?'; //หาว่ามี username ไหม
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query error' }); //error ที่ query
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' }); //error ที่ ไม่มีข้อมูล
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.user_Password); //ตรวจสอบ username password
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.user_ID, username: user.user_Name }, process.env.JWT_SECRET, { expiresIn: '30m' }); // สร้าง JWT token

    res.status(200).json({
      message: "welcome",
      id: user.user_ID,
      username: user.user_Name,
      role: user.user_roleID,
      token
    });
  });
};

const registerUser = (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT user_ID FROM users ORDER BY user_ID DESC LIMIT 1';
  db.query(query, [], (err, result) => {
    if (err) {
      console.error('ID sequence query error:', err);
      return res.status(500).json({ error: 'ID sequence query error' });
    }

    let maxId;
    if (result.length === 0) {
      maxId = 0; 
    } else {
      const lastUserId = result[0].user_ID;
      maxId = parseInt(lastUserId.slice(-3)) || 0; 
    }

    const num = maxId + 1; // เพิ่มค่า
    const userID = "USE" + String(num).padStart(3, '0'); // สร้าง user_ID ใหม่ USE001, USE002, 

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Password hashing error:', err);
        return res.status(500).json({ error: 'Password hashing error' });
      }

      const query = 'INSERT INTO users (user_ID, user_Name, user_Password) VALUES (?, ?, ?)';
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

module.exports = { login, registerUser };
