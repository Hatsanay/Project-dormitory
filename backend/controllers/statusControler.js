const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

const getStatus = async (req, res) => {
    try {
      const query = "SELECT * FROM status ";
      const [result] = await db.promise().query(query);
      res.status(200).json(result);
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
    }
  };

  const getStatusUserDelete = async (req, res) => {
    try {
      const query = 'SELECT * FROM status WHERE stat_StatTypID = "STT000001"';
      const [result] = await db.promise().query(query);
      res.status(200).json(result);
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
    }
  };
  

module.exports = {getStatus,getStatusUserDelete};