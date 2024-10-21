const db = require("../config/db");
require("dotenv").config();

const getReq = async (req, res) => {
    try {
      const query = `SELECT
      mainr_ID,
      CONCAT(users.user_Fname, ' ', users.user_Lname) AS fullname,
      room.room_Number AS roomNumber,
      mainr_ProblemTitle,
      mainr_ProblemDescription,
      mainr_Date,
      petitiontype.Type AS Type,
      status.stat_Name AS status
    FROM 
      maintenancerequests
        INNER JOIN renting on renting.renting_ID = maintenancerequests.mainr_renting_ID
        INNER JOIN users on users.user_ID = renting.renting_user_ID
        INNER JOIN petitiontype on petitiontype.ID = mainr_pattyp_ID
        INNER JOIN status on status.stat_ID = maintenancerequests.mainr_Stat_ID
        INNER JOIN room on room.room_ID = renting.renting_room_ID
    WHERE
      maintenancerequests.mainr_Stat_ID != "STA000017"
    `;
  
      const [result] = await db.promise().query(query);
      if (result.length === 0) {
        return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
      }
      const formattedResult = result.map(item => ({
        ...item,
        mainr_Date: new Date(item.mainr_Date).toLocaleDateString('th-TH', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) + ' ' + new Date(item.mainr_Date).toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
  
      res.status(200).json(formattedResult);
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
    }
  };


module.exports = {
    getReq,
};
