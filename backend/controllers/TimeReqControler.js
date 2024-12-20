const db = require("../config/db");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const getreqtime = async (req, res) => {
  try {
    const query = `SELECT 
      schedulerepairs.ID as schedulerepairsID,
      schedulerepairs.Date AS Date,
      schedulerepairs.startTime AS startTime,
      schedulerepairs.endTime AS endTime,
      sdr_mainr_ID,
      requisition.requisition_ID AS requisition_ID,
      room.room_Number AS room,
      GROUP_CONCAT(users.user_Fname, ' ', users.user_Lname) AS technicians
    FROM  
      schedulerepairs
      INNER JOIN maintenancerequests on maintenancerequests.mainr_ID = schedulerepairs.sdr_mainr_ID
      INNER JOIN status ms on ms.stat_ID = maintenancerequests.mainr_Stat_ID
      INNER JOIN requisition on requisition.requisition_mainr_ID = maintenancerequests.mainr_ID
      INNER JOIN renting on renting.renting_ID = maintenancerequests.mainr_renting_ID
      INNER JOIN room on room.room_ID = renting.renting_room_ID
      INNER JOIN scheculerepairsn_list ON scheculerepairsn_list.srl_sdr_ID = schedulerepairs.ID
      INNER JOIN users ON users.user_ID = scheculerepairsn_list.srl_user_ID
    WHERE requisition.requisition_stat_ID = "STA000019"
    GROUP BY schedulerepairs.ID`;

    const [result] = await db.promise().query(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
    }

    // ฟอร์แมตข้อมูลวันที่และเวลา (จัดการ timezone)
    const formattedResult = result.map((item) => {
      const date = new Date(item.Date);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      const formattedDate = date.toISOString().split("T")[0]; // แปลงเป็น YYYY-MM-DD
      const formattedStartTime = item.startTime.slice(0, 5); // ตัดให้เหลือเฉพาะ HH:mm
      const formattedEndTime = item.endTime.slice(0, 5); // ตัดให้เหลือเฉพาะ HH:mm

      return {
        ...item,
        Date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        technicians: item.technicians ? item.technicians.split(",") : [], // แปลง technicians string เป็น array
      };
    });

    res.status(200).json(formattedResult);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

module.exports = { getreqtime };
