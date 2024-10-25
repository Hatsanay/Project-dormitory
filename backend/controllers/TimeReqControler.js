const db = require("../config/db");
require("dotenv").config();
const multer = require("multer");
const path = require("path");



const getreqtime = async (req, res) => {
    try {
        const query = `SELECT 
        schedulerepairs.ID as schedulerepairsID,
        schedulerepairs.Date AS Date,
        schedulerepairs.Time AS Time,
        sdr_mainr_ID,
        requisition.requisition_ID AS requisition_ID
       FROM  
           schedulerepairs
           INNER JOIN maintenancerequests on maintenancerequests.mainr_ID = schedulerepairs.sdr_mainr_ID
           INNER JOIN status ms on ms.stat_ID = maintenancerequests.mainr_Stat_ID
           INNER JOIN requisition on requisition.requisition_mainr_ID = maintenancerequests.mainr_ID
           WHERE requisition.requisition_stat_ID = "STA000019"
        `;
    
        const [result] = await db.promise().query(query);
        if (result.length === 0) {
          return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
        }

        // ฟอร์แมตข้อมูลวันที่และเวลา
        const formattedResult = result.map((item) => ({
          ...item,
          Date: new Date(item.Date).toLocaleDateString("th-TH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          Time: item.Time.slice(0, 5), // ตัดให้เหลือเฉพาะชั่วโมงและนาที
        }));

        res.status(200).json(formattedResult);
      } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
      }
};




module.exports = {getreqtime};
