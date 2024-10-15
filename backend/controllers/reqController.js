const db = require("../config/db");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const getReqById = async (req, res) => {
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
      status.stat_Name AS status
    FROM 
      maintenancerequests
        INNER JOIN renting on renting.renting_ID = maintenancerequests.mainr_renting_ID
        INNER JOIN users on users.user_ID = renting.renting_user_ID
        INNER JOIN petitiontype on petitiontype.ID = mainr_pattyp_ID
        INNER JOIN status on status.stat_ID = maintenancerequests.mainr_Stat_ID
        INNER JOIN room on room.room_ID = renting.renting_room_ID
    WHERE
      users.user_ID = ?
      AND maintenancerequests.mainr_Stat_ID != "STA000017"
    `;

    const [result] = await db.promise().query(query, [userId]);

    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
    }
    const formattedResult = result.map(item => ({
      ...item,
      mainr_Date: new Date(item.mainr_Date).toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }));

    res.status(200).json(formattedResult);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};




const getUserByIdfromReq = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ error: "โปรดระบุ id" });
    }

    const query = `
      SELECT 
        user_ID, user_Fname, user_Lname, renting.renting_ID, room.room_ID, room_Number, 
        CONCAT(user_Fname, ' ', user_Lname) AS fullname
      FROM users
      INNER JOIN renting on renting.renting_user_ID = users.user_ID
      INNER JOIN room on room.room_ID = renting.renting_room_ID
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


const getPetitiontype = async (req, res) => {
  try {
    const query = `
      SELECT ID, Type, petitionType_stat_ID
      FROM petitiontype
      WHERE petitionType_stat_ID = 'STA000006'
    `;
    const [result] = await db.promise().query(query);
    res.status(200).json(result);
  } catch (err) {
    console.error('เกิดข้อผิดพลาด:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดำเนินการ' });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ตรวจสอบประเภทของไฟล์
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif") {
    cb(null, true);
  } else {
    cb(new Error("ประเภทไฟล์ไม่รองรับ"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const submitRepairRequest = async (req, res) => {
  const { rentingID, reqPetitiontype, titleRepair, reqDetail } = req.body;
  const files = req.files;


  if (!titleRepair || !reqDetail) {
    return res.status(400).json({ error: "หัวข้อและรายละเอียดการแจ้งซ่อมไม่สามารถเป็นค่าว่างได้" });
  }

  try {
    const query = "SELECT mainr_ID FROM maintenancerequests ORDER BY mainr_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastMainrId = result[0].mainr_ID;
      maxId = parseInt(lastMainrId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const mainr_ID = "MNR" + String(num).padStart(6, "0");

    const reqDate = new Date().toISOString();

 
    const maintenanceQuery = `
      INSERT INTO maintenancerequests 
      (mainr_ID, mainr_ProblemTitle, mainr_ProblemDescription, mainr_Date, mainr_renting_ID, mainr_pattyp_ID, mainr_Stat_ID)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.promise().query(maintenanceQuery, [
      mainr_ID,
      titleRepair,
      reqDetail,
      reqDate,
      rentingID,
      reqPetitiontype,
      "STA000011"
    ]);

    if (files && files.length > 0) {
      const imageQuery = `
        INSERT INTO imagerequests (imges_ID, imges_Path, image_mainr_ID)
        VALUES (?, ?, ?)
      `;
      const [imgesResult] = await db.promise().query("SELECT imges_ID FROM imagerequests ORDER BY imges_ID DESC LIMIT 1");
      let imgMaxId = 0;

      if (imgesResult.length > 0) {
        const lastImageId = imgesResult[0].imges_ID;
        imgMaxId = parseInt(lastImageId.slice(-6)) || 0;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imges_ID = "IMG" + String(imgMaxId + i + 1).padStart(6, "0"); // สร้าง ID ที่ไม่ซ้ำ
        await db.promise().query(imageQuery, [
          imges_ID,
          file.filename,
          mainr_ID,
        ]);
      }
    }

    res.status(201).json({ message: "บันทึกคำขอซ่อมบำรุงสำเร็จ" });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกคำขอซ่อมบำรุง:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกคำขอซ่อมบำรุง" });
  }
};

module.exports = {
  getReqById,
  submitRepairRequest,
  upload,
  getUserByIdfromReq,
  getPetitiontype
};
