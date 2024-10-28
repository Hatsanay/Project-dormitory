const db = require("../config/db");
require("dotenv").config();

//////////////API//////////////
//////////registerPermission/////////
////////////////////////////////////
const registerPermission = async (req, res) => {
  const { permission_name } = req.body;

  try {
    ////////////Auto-generate ID/////////////
    const query = "SELECT permission_ID FROM permissions ORDER BY permission_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastPermissionId = result[0].permission_ID;
      maxId = parseInt(lastPermissionId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const newPermissionID = "PER" + String(num).padStart(6, "0");

    // Check if the permission name already exists
    const permissionChecked = await checkPermission(permission_name);
    if (permissionChecked) {
      return res.status(400).json({ error: "มีชื่อสิทธิ์นี้อยู่แล้ว" });
    }

    /////// Insert into the database ////////
    const insertQuery = `
      INSERT INTO permissions
      (permission_ID, permission_name)
      VALUES (?, ?)
    `;
    await db.promise().query(insertQuery, [newPermissionID, permission_name]);

    res.status(201).json({ message: "ลงทะเบียนสิทธิ์สำเร็จแล้ว!" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

///////////function/////////////
////////////////////////////////
async function checkPermission(permission_name) {
  try {
    const query = "SELECT COUNT(*) as count FROM permissions WHERE permission_name = ?";
    const [rows] = await db.promise().query(query, [permission_name]);
    return rows[0].count > 0;
  } catch (err) {
    console.error("ไม่สามารถตรวจสอบชื่อสิทธิ์ได้:", err);
    throw err;
  }
}

//////////////API//////////////
///////////getAutotid///////////
///////////////////////////////
const getAutoPermissionID = async (req, res) => {
  try {
    const query = "SELECT permission_ID FROM permissions ORDER BY permission_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastPermissionId = result[0].permission_ID;
      maxId = parseInt(lastPermissionId.slice(-6)) || 0;
    }
    const permissionID = "PER" + String(maxId + 1).padStart(6, "0");
    res.status(200).json(permissionID);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

//////////////API//////////////
///////////getPermissions/////////////
///////////////////////////////
const getPermissions = async (req, res) => {
  try {
    const query = `
    SELECT 
      permission_id, 
      permission_name
    FROM 
      permissions
    `;
    const [result] = await db.promise().query(query);
    res.status(200).json(result);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

//////////////API//////////////
///////getPermissionByName/////////////
///////////////////////////////
const getPermissionByID = async (req, res) => {
  try {
    const permission_id = req.query.ID;
    if (!permission_id) {
      return res.status(400).json({ error: "โปรดระบุIDสิทธิ์" });
    }
    const query = `
      SELECT 
        permission_ID, 
        permission_name 
      FROM 
        permissions 
      WHERE permission_id = ?
    `;
    const [result] = await db.promise().query(query, [permission_id]);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลสิทธิ์" });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

//////////////API//////////////
//////////updatePermission///////////
///////////////////////////////
const updatePermission = async (req, res) => {
  const permission_id= req.query.ID;
  const { newPermissionName } = req.body;

  try {
    if (!permission_id) {
      return res.status(400).json({ error: "โปรดระบุIDสิทธิ์" });
    }
    const [permissionCheck] = await db.promise().query("SELECT * FROM permissions WHERE permission_name = ?", [permission_id]);
    if (permissionCheck.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลสิทธิ์" });
    }

    const updateQuery = `
      UPDATE permissions SET
        permission_name = ?
      WHERE permission_id = ?
    `;
    await db.promise().query(updateQuery, [newPermissionName, permission_id]);
    res.status(200).json({ message: "อัปเดตข้อมูลสิทธิ์เรียบร้อยแล้ว" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

module.exports = {
  registerPermission,
  getPermissions,
  getPermissionByID,
  getAutoPermissionID,
  updatePermission,
};
