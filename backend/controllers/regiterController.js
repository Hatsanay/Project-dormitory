const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();


        //////////////API//////////////
        //////////registerUser/////////
        ///////////////////////////////
const registerUser = async (req, res) => {
    const { userFname, userLname, userEmail, userPhone, userBdate = Date.now(), userDateAdd = Date.now(), userDateEdit = Date.now(), userRole_ID, userStatus_ID, username, password,token } = req.body; //เพิ่มตัวแปลรับข้อมูลที่กรอกเขามา
    try {

        ////////////Autoid/////////////
        const query = 'SELECT user_ID FROM users ORDER BY user_ID DESC LIMIT 1'; //หาว่ารหัสแถวสุดท้ายคืออะไร
        const [result] = await db.promise().query(query);                       //Call กับฐานข้อมูล
        let maxId;                                                              //ตัวแปลใข้เก็บรหัสท้ายสุด
        if (result.length === 0) {                                              //Check ข้อมูล
            maxId = 0;                                                           //maxId = 0
        } else {
            const lastUserId = result[0].user_ID;                               //รหัสแถวท้ายสุด
            maxId = parseInt(lastUserId.slice(-6)) || 0;                        //ตัดสตริงเอา 6 ตัวหลัง เช่น USE000001 จะเป็น 000001 เก็บใน maxId
        }
        const num = maxId + 1;                                                  // maxId มา บวก 1
        const userID = "USE" + String(num).padStart(6, '0');                    // สร้าง user_ID ใหม่ เช่น USE000001, USE000002

        const usernamechecked = await checkUsername(username);                  //Call กับ function checkUsername เพื่อหา True False ว่ามี usename อยู่แลวไหม
        if (usernamechecked) {
            return res.status(400).json({ error: 'มี Username นี้อยู่แล้ว' });
        }

        ///////บันทึกลงฐานข้อมล//////////
        const hashedPassword = await bcrypt.hash(password, 10);                 //เข้ารหัส
        const insertQuery = 'INSERT INTO users (user_ID, user_Fname, user_Lname, user_Email, user_Phone, user_Name, user_Password, user_Bdate, user_DateAdd, user_DateEdit, user_Role_ID, user_Status_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await db.promise().query(insertQuery, [userID, userFname, userLname, userEmail, userPhone, username, hashedPassword, userBdate, userDateAdd, userDateEdit, userRole_ID, userStatus_ID]);

        res.status(201).json({ message: 'ลงทะเบียนผู้ใช้เรียบร้อยแล้ว!' });
    } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดำเนินการ' });
    }
};


        ///////////function/////////////
        ////////checkUsername///////////
        ////////////////////////////////
async function checkUsername(username) {
    try {

        /////หาจำนวนของ username////////
        const query = 'SELECT COUNT(*) as count FROM users WHERE user_Name = ?';
        const [rows] = await db.promise().query(query, [username]);
        return rows[0].count > 0;                                               // username มี มากกว่า 0 หรือไม่ ถ้ามี ส่ง True
    } catch (err) {
        console.error('ไม่สามารถตรวจสอบ username ddddได้:', err);
        throw err;
    }
}

module.exports = { registerUser };
