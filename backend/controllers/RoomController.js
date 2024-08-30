const db = require('../config/db');
require('dotenv').config();

const registerRoom = async (req, res) => {
    const { RoomID,token } = req.body; //เพิ่มตัวแปลรับข้อมูลที่กรอกเขามา
    try {
        const roomchecked = await checkroom(RoomID);                            //Call กับ function checkRoom เพื่อหา True False ว่ามี RoomID อยู่แล้วไหม
        if (roomchecked){
            return res.status(400).json({ error: 'มีเลขห้องนี้อยู่เเล้วนี้อยู่แล้ว' });
        }
        ///////บันทึกลงฐานข้อมล//////////
        const insertQuery = 'INSERT INTO room (room_ID) VALUES (?)';
        await db.promise().query(insertQuery, [RoomID]);
        res.status(201).json({ message: 'ลงทะเบียนห้องพักเรียบร้อยแล้ว!' });
    } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดำเนินการ' });
    }
};
        ///////////function/////////////
        ///////////checkRoom///////////
async function checkroom(RoomID) {
    try {
        /////หาจำนวนของ username////////
        const query = 'SELECT COUNT(*) as count FROM room_id WHERE room = ?';
        const [rows] = await db.promise().query(query, [RoomID]);
        return rows[0].count > 0;                                               // ห้อง มี มากกว่า 0 หรือไม่ ถ้ามี ส่ง True
    } catch (err) {
        console.error('ไม่สามารถตรวจสอบ Room ID ได้:', err);
        throw err;
    }
}

module.exports = { registerRoom } ;
