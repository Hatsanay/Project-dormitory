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
      maintenancerequests.mainr_Stat_ID = "STA000011"
    ORDER BY
      maintenancerequests.mainr_ID ASC
    `;

    const [result] = await db.promise().query(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
    }
    const formattedResult = result.map((item) => ({
      ...item,
      mainr_Date:
        new Date(item.mainr_Date).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        new Date(item.mainr_Date).toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    }));

    res.status(200).json(formattedResult);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

const denyReq = async (req, res) => {
  const { mainr_ID, mainrstatus_ID = "STA000018" } = req.body;

  try {
    if (!mainr_ID) {
      return res.status(400).json({ error: "โปรดระบุ mainr_ID" });
    }

    const updateQuery = `
        UPDATE maintenancerequests SET
        mainr_Stat_ID = ?
        WHERE mainr_ID = ?
      `;

    await db.promise().query(updateQuery, [mainrstatus_ID, mainr_ID]);

    res.status(200).json({ message: "ยกเลิกการแจ้งซ่อมเรียบร้อยแล้ว" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

const sendtomacReq = async (req, res) => {
  const { mainr_ID, mainrstatus_ID = "STA000012" } = req.body;

  try {
    if (!mainr_ID) {
      return res.status(400).json({ error: "โปรดระบุ mainr_ID" });
    }

    const updateQuery = `
        UPDATE maintenancerequests SET
        mainr_Stat_ID = ?
        WHERE mainr_ID = ?
      `;

    await db.promise().query(updateQuery, [mainrstatus_ID, mainr_ID]);

    res.status(200).json({ message: "ยกเลิกการแจ้งซ่อมเรียบร้อยแล้ว" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

const getMacReq = async (req, res) => {
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
        INNER JOIN renting ON renting.renting_ID = maintenancerequests.mainr_renting_ID
        INNER JOIN users ON users.user_ID = renting.renting_user_ID
        INNER JOIN petitiontype ON petitiontype.ID = mainr_pattyp_ID
        INNER JOIN status ON status.stat_ID = maintenancerequests.mainr_Stat_ID
        INNER JOIN room ON room.room_ID = renting.renting_room_ID
        LEFT JOIN assessproblem ON assessproblem.asp_mainr_ID = maintenancerequests.mainr_ID
      WHERE
        maintenancerequests.mainr_Stat_ID = "STA000012"
        AND assessproblem.asp_mainr_ID IS NULL
      ORDER BY
        maintenancerequests.mainr_ID ASC
    `;

    const [result] = await db.promise().query(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
    }
    const formattedResult = result.map((item) => ({
      ...item,
      mainr_Date:
        new Date(item.mainr_Date).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        new Date(item.mainr_Date).toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    }));

    res.status(200).json(formattedResult);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

const getMacReqById = async (req, res) => {
  try {
    const userId = req.query.id;

    if (!userId) {
      return res.status(400).json({ error: "โปรดระบุ id" });
    }

    const query = `
    SELECT
      mainr_ID,
      CONCAT(users.user_Fname, ' ', users.user_Lname) AS fullname,
      room.room_Number AS roomNumber,
      mainr_ProblemTitle,
      mainr_ProblemDescription,
      mainr_Date,
      petitiontype.Type AS Type,
      status.stat_Name AS status,
      assessproblem.asp_detail AS detail
    FROM 
      maintenancerequests
        INNER JOIN renting on renting.renting_ID = maintenancerequests.mainr_renting_ID
        INNER JOIN users on users.user_ID = renting.renting_user_ID
        INNER JOIN petitiontype on petitiontype.ID = mainr_pattyp_ID
        INNER JOIN status on status.stat_ID = maintenancerequests.mainr_Stat_ID
        INNER JOIN room on room.room_ID = renting.renting_room_ID
        INNER JOIN assessproblem ON assessproblem.asp_mainr_ID = maintenancerequests.mainr_ID
    WHERE
      users.user_ID = ?
      AND maintenancerequests.mainr_Stat_ID = "STA000012"
    ORDER BY
      maintenancerequests.mainr_ID ASC
    `;

    const [result] = await db.promise().query(query, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
    }
    const formattedResult = result.map((item) => ({
      ...item,
      mainr_Date:
        new Date(item.mainr_Date).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        new Date(item.mainr_Date).toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    }));

    res.status(200).json(formattedResult);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};


const sendAssessProblemReq = async (req, res) => {
  const {
    mainr_ID,
    assessProblemText,
    userID
  } = req.body;
  try {
    const insertQuery = `
            INSERT INTO assessproblem
            (asp_mainr_ID, asp_detail, asp_user_id)
            VALUES (?, ?, ?)
        `;
    await db.promise().query(insertQuery, [
      mainr_ID,
      assessProblemText,
      userID,
    ]);

    res.status(201).json({ message: "ส่งประเมิณปัญหาเรียบร้อยแล้ว!" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};


module.exports = {
  getReq,
  denyReq,
  sendtomacReq,
  getMacReq,
  sendAssessProblemReq,
  getMacReqById,
};
