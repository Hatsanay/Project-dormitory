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
      AND maintenancerequests.mainr_Stat_ID != "STA000016"
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

const getHisReqById = async (req, res) => {
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
      AND maintenancerequests.mainr_Stat_ID = "STA000016"
      OR maintenancerequests.mainr_Stat_ID = "STA000017"
      OR maintenancerequests.mainr_Stat_ID = "STA000018"
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
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
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
    return res
      .status(400)
      .json({ error: "หัวข้อและรายละเอียดการแจ้งซ่อมไม่สามารถเป็นค่าว่างได้" });
  }

  try {
    const query =
      "SELECT mainr_ID FROM maintenancerequests ORDER BY mainr_ID DESC LIMIT 1";
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

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // เพิ่ม 1 ให้กับเดือน เพราะ getMonth() ให้ค่าเริ่มจาก 0
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const reqDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const maintenanceQuery = `
      INSERT INTO maintenancerequests 
      (mainr_ID, mainr_ProblemTitle, mainr_ProblemDescription, mainr_Date, mainr_renting_ID, mainr_pattyp_ID, mainr_Stat_ID)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db
      .promise()
      .query(maintenanceQuery, [
        mainr_ID,
        titleRepair,
        reqDetail,
        reqDate,
        rentingID,
        reqPetitiontype,
        "STA000011",
      ]);

    if (files && files.length > 0) {
      const imageQuery = `
        INSERT INTO imagerequests (imges_ID, imges_Path, image_mainr_ID)
        VALUES (?, ?, ?)
      `;
      const [imgesResult] = await db
        .promise()
        .query(
          "SELECT imges_ID FROM imagerequests ORDER BY imges_ID DESC LIMIT 1"
        );
      let imgMaxId = 0;

      if (imgesResult.length > 0) {
        const lastImageId = imgesResult[0].imges_ID;
        imgMaxId = parseInt(lastImageId.slice(-6)) || 0;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imges_ID = "IMG" + String(imgMaxId + i + 1).padStart(6, "0"); // สร้าง ID ที่ไม่ซ้ำ
        await db
          .promise()
          .query(imageQuery, [imges_ID, file.filename, mainr_ID]);
      }
    }

    res.status(201).json({ message: "บันทึกคำขอซ่อมบำรุงสำเร็จ" });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการบันทึกคำขอซ่อมบำรุง:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกคำขอซ่อมบำรุง" });
  }
};

const getImgById = async (req, res) => {
  try {
    const reqId = req.query.id;

    if (!reqId) {
      return res.status(400).json({ error: "โปรดระบุ id" });
    }

    const query = `
    SELECT 
      imges_ID,
      imges_Path,
      image_mainr_ID
    FROM 
      imagerequests
    WHERE
      image_mainr_ID = ?
    `;

    const [result] = await db.promise().query(query, [reqId]);

    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลรูปภาพ" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

//////////////API//////////////
//////////cancelReq///////////
///////////////////////////////
const cancelReq = async (req, res) => {
  const { mainr_ID, mainrstatus_ID = "STA000017" } = req.body;

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

module.exports = {
  getReqById,
  getHisReqById,
  submitRepairRequest,
  upload,
  getUserByIdfromReq,
  getPetitiontype,
  getImgById,
  cancelReq,
};
