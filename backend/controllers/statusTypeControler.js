const db = require("../config/db");
require("dotenv").config();

//////////////API//////////////
//////////registerStatusType/////////
///////////////////////////////
const registerStatusType = async (req, res) => {
  const { stat_Name } = req.body;

  try {
    ////////////Autoid/////////////
    const query = "SELECT statTyp_ID FROM statustype ORDER BY statTyp_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastStatusTypeId = result[0].statTyp_ID;
      maxId = parseInt(lastStatusTypeId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const newStatusTypeID = "STT" + String(num).padStart(6, "0");

    const statusTypeChecked = await checkStatusType(stat_Name);
    if (statusTypeChecked) {
      return res.status(400).json({ error: "มีชื่อสถานะนี้อยู่แล้ว" });
    }

    ///////บันทึกลงฐานข้อมูล//////////
    const insertQuery = `
      INSERT INTO statustype
      (statTyp_ID, stat_Name)
      VALUES (?, ?)
    `;
    await db.promise().query(insertQuery, [newStatusTypeID, stat_Name]);

    res.status(201).json({ message: "ลงทะเบียนสถานะสำเร็จแล้ว!" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

///////////function/////////////
////////////////////////////////
async function checkStatusType(stat_Name) {
  try {
    const query = "SELECT COUNT(*) as count FROM statustype WHERE stat_Name = ?";
    const [rows] = await db.promise().query(query, [stat_Name]);
    return rows[0].count > 0;
  } catch (err) {
    console.error("ไม่สามารถตรวจสอบชื่อสถานะได้:", err);
    throw err;
  }
}

//////////////API//////////////
///////////getAutotid///////////
///////////////////////////////
const getAutotidStatusType = async (req, res) => {
  try {
    const query = "SELECT statTyp_ID FROM statustype ORDER BY ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastStatusTypeId = result[0].ID;
      maxId = parseInt(lastStatusTypeId.slice(-6)) || 0;
    }
    const statusTypeID = "STT" + String(maxId + 1).padStart(6, "0");
    res.status(200).json(statusTypeID);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

//////////////API//////////////
///////////getStatusType/////////////
///////////////////////////////
const getStatusType = async (req, res) => {
  try {
    const query = `SELECT statTyp_ID, stat_Name FROM statustype`;
    const [result] = await db.promise().query(query);
    res.status(200).json(result);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

//////////////API//////////////
///////getStatusTypeByName/////////////
///////////////////////////////
const getStatusTypeByName = async (req, res) => {
  try {
    const stat_Name = req.query.name;
    if (!stat_Name) {
      return res.status(400).json({ error: "โปรดระบุชื่อสถานะ" });
    }
    const query = `
      SELECT 
        statTyp_ID, 
        stat_Name 
      FROM 
        statustype 
      WHERE stat_Name = ?
    `;
    const [result] = await db.promise().query(query, [stat_Name]);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลสถานะ" });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

//////////////API//////////////
//////////updateStatusType///////////
///////////////////////////////
const updateStatusType = async (req, res) => {
  const stat_Name = req.query.stat_Name;
  const { newStatName } = req.body;

  try {
    if (!stat_Name) {
      return res.status(400).json({ error: "โปรดระบุชื่อสถานะ" });
    }
    const [statusTypeCheck] = await db.promise().query("SELECT * FROM statustype WHERE stat_Name = ?", [stat_Name]);
    if (statusTypeCheck.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลสถานะ" });
    }

    const updateQuery = `
      UPDATE statustype SET
        stat_Name = ?
      WHERE stat_Name = ?
    `;
    await db.promise().query(updateQuery, [newStatName || stat_Name, stat_Name]);
    res.status(200).json({ message: "อัปเดตข้อมูลสถานะเรียบร้อยแล้ว" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

module.exports = {
  registerStatusType,
  getStatusType,
  getStatusTypeByName,
  getAutotidStatusType,
  updateStatusType,
};
