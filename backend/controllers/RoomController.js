const db = require("../config/db");
require("dotenv").config();

//////////////API//////////////
//////////registerRoom/////////
///////////////////////////////
const registerRoom = async (req, res) => {
    const toDate = Date.now();
  const {
    room_Number,
    room_DateAdd = toDate,
    userPost,
    RoomStatus_ID,
  } = req.body; //เพิ่มตัวแปลรับข้อมูลที่กรอกเขามา
  try {
    ////////////Autoid/////////////
    const query = "SELECT room_ID FROM room ORDER BY room_ID DESC LIMIT 1"; //หาว่ารหัสแถวสุดท้ายคืออะไร
    const [result] = await db.promise().query(query); //Call กับฐานข้อมูล
    let maxId; //ตัวแปลใข้เก็บรหัสท้ายสุด
    if (result.length === 0) {
      //Check ข้อมูล
      maxId = 0; //maxId = 0
    } else {
      const lastRoomId = result[0].room_ID; //รหัสแถวท้ายสุด
      maxId = parseInt(lastRoomId.slice(-3)) || 0; //ตัดสตริงเอา 6 ตัวหลัง เช่น R001 จะเป็น 001 เก็บใน maxId
    }
    const num = maxId + 1; // maxId มา บวก 1
    const roomID = "R" + String(num).padStart(6, "0"); // สร้าง room_ID ใหม่ เช่น R001, R002

    const Roomchecked = await checkRoom(); //Call กับ function Roomname เพื่อหา True False ว่ามี room อยู่แลวไหม
    if (Roomchecked) {
      return res.status(400).json({ error: "มี Room นี้อยู่แล้ว" });
    }

    ///////บันทึกลงฐานข้อมล//////////
    const insertQuery = `
            INSERT INTO room
            (room_ID, room_Number, room_DateAdd, userPost, RoomStatus_ID)
            VALUES (?, ?, ?, ?, ?)
        `;
    await db
      .promise()
      .query(insertQuery, [
        roomID,
        room_Number,
        room_DateAdd,
        userPost,
        RoomStatus_ID,
      ]);

    res.status(201).json({ message: "ลงทะเบียนห้องพักเรียบร้อยแล้ว!" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

///////////function/////////////
////////checkUsername///////////
////////////////////////////////
async function checkRoom(room_Number) {
  try {
    /////หาจำนวนของ username////////
    const query = "SELECT COUNT(*) as count FROM users WHERE user_Name = ?";
    const [rows] = await db.promise().query(query, [room_Number]);
    return rows[0].count > 0; // Room มี มากกว่า 0 หรือไม่ ถ้ามี ส่ง True
  } catch (err) {
    console.error("ไม่สามารถตรวจสอบ room_Number ddddได้:", err);
    console.error("ไม่สามารถตรวจสอบ room_Number ddddได้:", err);
    throw err;
  }
}

//////////////API//////////////
///////////getAutotid///////////
///////////////////////////////
const getAutotid = async (req, res) => {
  try {
    ////////////Autoid/////////////
    const query = "SELECT room_ID FROM room ORDER BY room_ID DESC LIMIT 1"; //หาว่ารหัสแถวสุดท้ายคืออะไร
    const [result] = await db.promise().query(query); //Call กับฐานข้อมูล
    let maxId; //ตัวแปลใข้เก็บรหัสท้ายสุด
    if (result.length === 0) {
      //Check ข้อมูล
      maxId = 0; //maxId = 0
    } else {
      const lastRoomId = result[0].room_ID; //รหัสแถวท้ายสุด
      maxId = parseInt(lastRoomId.slice(-3)) || 0; //ตัดสตริงเอา 6 ตัวหลัง เช่น R001 จะเป็น 001 เก็บใน maxId
    }
    const num = maxId + 1; // maxId มา บวก 1
    const roomID = "R" + String(num).padStart(3, "0"); // สร้าง room_ID ใหม่ เช่น R001, R002
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

module.exports = { registerRoom, getAutotid };
