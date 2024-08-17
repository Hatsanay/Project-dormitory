const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//////////////API//////////////
/////////////login/////////////
///////////////////////////////
const login = (req, res) => {
  const { username, password } = req.body;

  const query =
    "SELECT * FROM users INNER JOIN roles on users.user_Role_ID = roles.role_ID INNER JOIN permissions on roles.role_permissions = permissions.permission_id WHERE user_Name = ?"; //หาว่ามี username ไหม
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Database query error" }); //error ที่ query
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" }); //error ที่ ไม่มีข้อมูล
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.user_Password); //ตรวจสอบ username password
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    ///////////สร้าง JWT token/////////////
    const token = jwt.sign({ id: user.user_ID, username: user.user_Name },process.env.JWT_SECRET,{ expiresIn: "5m" }); 

    ///////////Respons/////////////
    res.status(200).json({
      id: user.user_ID,
      username: user.user_Name,
      roles: user.role_Name,
      Permissions: user.permission_name,
      token,
    });
  });

  //ทำเก็บ Log ตรงนั้
};

module.exports = { login };
