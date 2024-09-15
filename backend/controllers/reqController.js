const db = require("../config/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getUserByIdfromReq = async (req, res) => {
  try {
    const userId = req.query.id;

    if (!userId) {
      return res.status(400).json({ error: "โปรดระบุ id" });
    }

    const query = `
         SELECT user_ID, user_Fname, user_Lname ,room.room_ID, CONCAT(user_Fname, ' ', user_Lname) AS fullname
          FROM users
          INNER JOIN room on users.user_ID = room.room_User_ID
          WHERE users.user_ID = ?
        `;

    const [result] = await db.promise().query(query, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

module.exports = { getUserByIdfromReq };
