const db = require("../config/db");
require("dotenv").config();

//////////////API//////////////
//////////registerRoom/////////
///////////////////////////////
const registerRoom = async (req, res) => {
  const {
    roomnumber
  } = req.body;

  try {
    ////////////Autoid/////////////
    const query = "SELECT room_ID FROM room ORDER BY room_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastRoomId = result[0].room_ID;
      maxId = parseInt(lastRoomId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const roomID = "ROM" + String(num).padStart(6, "0");

    const Roomchecked = await checkRoom(roomnumber);
    if (Roomchecked) {
      return res.status(400).json({ error: "มีเลขห้องนี้อยู่แล้ว" });
    }

    ///////บันทึกลงฐานข้อมล//////////
    const insertQuery = `
      INSERT INTO room
      (room_ID, room_Number, room_stat_ID)
      VALUES (?, ?, ?)
    `;
    await db
      .promise()
      .query(insertQuery, [
        roomID,
        roomnumber,
        room_stat_ID,
      ]);

    res.status(201).json({ message: "ลงทะเบียนห้องพักเรียบร้อยแล้ว!" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

///////////function/////////////
////////////////////////////////
async function checkRoom(roomnumber) {
  try {
    const query = "SELECT COUNT(*) as count FROM room WHERE room_Number = ?";
    const [rows] = await db.promise().query(query, [roomnumber]);
    return rows[0].count > 0;
  } catch (err) {
    console.error("ไม่สามารถตรวจสอบ room_Numberได้:", err);
    throw err;
  }
}

//////////////API//////////////
///////////getAutotid///////////
///////////////////////////////
const getAutotidRoom = async (req, res) => {
  try {
    const query = "SELECT room_ID FROM room ORDER BY room_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastRoomId = result[0].room_ID;
      maxId = parseInt(lastRoomId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const roomID = "ROM" + String(num).padStart(6, "0");
    res.status(200).json(roomID);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

// const getUser = async (req, res) => {
//     try {
//         // สร้างคำสั่ง SQL สำหรับดึงข้อมูลผู้ใช้ทั้งหมดจากตาราง users
//         const query = 'SELECT user_ID, user_Fname, user_Lname, user_Email, user_Phone, user_Name, user_Bdate, user_DateAdd, user_DateEdit, user_Role_ID, user_Status_ID FROM users';
//         const [rows] = await db.promise().query(query);  // เรียกใช้งานคำสั่ง SQL ผ่าน db

//         res.status(200).json(rows);  // ส่งผลลัพธ์กลับไปในรูปแบบ JSON
//     } catch (err) {
//         console.error('เกิดข้อผิดพลาด:', err);
//         res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' });
//     }
// };

module.exports = {
  registerRoom,
  getAutotidRoom,
  getRoom,
  getRoomByNumber,
  updateRoom,
  updateRoomStatus,
  getStatusRoom,
};
