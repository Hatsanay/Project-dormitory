const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();


//////////////API//////////////
//////////registerStatus/////////
///////////////////////////////
const registerStatus = async (req, res) => {
  const { stat_Name, stat_StatTypID} = req.body;

  try {
    ////////////Autoid/////////////
    const query = "SELECT stat_ID FROM status ORDER BY stat_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastStatId = result[0].stat_ID;
      maxId = parseInt(lastStatId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const newStatID = "STA" + String(num).padStart(6, "0");
    const statusChecked = await checkStatus(stat_Name);
    if (statusChecked) {
      return res.status(400).json({ error: "มีชื่อสถานะนี้อยู่แล้ว" });
    }
    stat_stat_ID = "STT000006";
    ///////บันทึกลงฐานข้อมูล//////////
    const insertQuery = `
      INSERT INTO status
      (stat_ID, stat_Name, stat_StatTypID, stat_stat_ID)
      VALUES (?, ?, ?, ?)
    `;
    await db.promise().query(insertQuery, [newStatID, stat_Name, stat_StatTypID, stat_stat_ID]);

    res.status(201).json({ message: "ลงทะเบียนสถานะสำเร็จแล้ว!" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

///////////function/////////////
////////////////////////////////
async function checkStatus(stat_Name) {
  try {
    const query = "SELECT COUNT(*) as count FROM status WHERE stat_Name = ?";
    const [rows] = await db.promise().query(query, [stat_Name]);
    return rows[0].count > 0;
  } catch (err) {
    console.error("ไม่สามารถตรวจสอบ stat_Name ได้:", err);
    throw err;
  }
};

const getAutotid = async (req, res) => {
  try {
    const query = "SELECT stat_ID FROM status ORDER BY stat_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastStatId = result[0].stat_ID;
      maxId = parseInt(lastStatId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const newStatID = "STA" + String(num).padStart(6, "0");
    res.status(200).json(ID);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

const getStatusByName = async (req, res) => {
  try {
    const statusName = req.query.name;
    if (!statusName) {
      return res.status(400).json({ error: "โปรดระบุชื่อสถานะ" });
    }
    const query = `
    SELECT 
      stat_ID, 
      stat_name,
      stat_stat_ID
    FROM 
	  status
    WHERE name = ?
    `;
    const [result] = await db.promise().query(query, [statusName]);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลหน่วย" });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};


const getStatus = async (req, res) => {
    try {
      const query = "SELECT * FROM status";
      const [result] = await db.promise().query(query);
      res.status(200).json(result);
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
    }
  };

const getStatusUserDelete = async (req, res) => {
    try {
      const query = 'SELECT * FROM status WHERE stat_stat_ID = "STA000006" AND stat_StatTypID = "STT000001"';
      const [result] = await db.promise().query(query);
      res.status(200).json(result);
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
    }
  };
  

module.exports = {registerStatus,getStatus,getStatusUserDelete};