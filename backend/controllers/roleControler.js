const db = require('../config/db');
require('dotenv').config();

/////////// API ///////////
//////// registerRole ///////
////////////////////////////
const registerRole = async (req, res) => {
  const { role_Name, role_permissions, role_Status_ID } = req.body;

  try {
    // Auto-generate role_ID
    const query = "SELECT role_ID FROM roles ORDER BY role_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastRoleId = result[0].role_ID;
      maxId = parseInt(lastRoleId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const newRoleID = "ROL" + String(num).padStart(6, "0");

    // Check if role name already exists
    const roleChecked = await checkRole(role_Name);
    if (roleChecked) {
      return res.status(400).json({ error: "มีชื่อบทบาทนี้อยู่แล้ว" });
    }

    // Insert new role into the database
    const insertQuery = `
      INSERT INTO roles
      (role_ID, role_Name, role_permissions, role_Status_ID)
      VALUES (?, ?, ?, ?)
    `;
    await db.promise().query(insertQuery, [newRoleID, role_Name, role_permissions, role_Status_ID]);

    res.status(201).json({ message: "ลงทะเบียนบทบาทสำเร็จแล้ว!" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

///////// Helper Function /////////
////////////////////////////////////
async function checkRole(role_Name) {
  try {
    const query = "SELECT COUNT(*) as count FROM roles WHERE role_Name = ?";
    const [rows] = await db.promise().query(query, [role_Name]);
    return rows[0].count > 0;
  } catch (err) {
    console.error("ไม่สามารถตรวจสอบ role_Name ได้:", err);
    throw err;
  }
}

////// Get Auto-generated Role ID //////
const getAutoRoleID = async (req, res) => {
  try {
    const query = "SELECT role_ID FROM roles ORDER BY role_ID DESC LIMIT 1";
    const [result] = await db.promise().query(query);
    let maxId;
    if (result.length === 0) {
      maxId = 0;
    } else {
      const lastRoleId = result[0].role_ID;
      maxId = parseInt(lastRoleId.slice(-6)) || 0;
    }
    const num = maxId + 1;
    const newRoleID = "ROL" + String(num).padStart(6, "0");
    res.status(200).json(newRoleID);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

/////// Get Role by ID ////////
const getRoleByID = async (req, res) => {
  try {
    const roleID = req.query.ID;
    if (!roleID) {
      return res.status(400).json({ error: "โปรดระบุชื่อบทบาท" });
    }
    const query = `
      SELECT 
        role_ID, 
        role_Name, 
        role_permissions, 
        role_Status_ID 
      FROM 
        roles 
      WHERE role_ID = ?
    `;
    const [result] = await db.promise().query(query, [roleID]);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลบทบาท" });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};

/////// Get All Roles for View ////////
const getRolesForView = async (req, res) => {
  try {
    const query = `
      SELECT 
        roles.role_ID,
        roles.role_Name AS Name,
        roles.role_permissions AS Permissions,
        status.stat_Name AS Status
      FROM  
        roles
      INNER JOIN status ON status.stat_ID = roles.role_Status_ID
    `;
    const [result] = await db.promise().query(query);
    res.status(200).json(result);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};
//////////////API//////////////
//////////updateRole////////////
///////////////////////////////
const updateRole = async (req, res) => {
  const role_ID = req.query.role_ID; // Assuming role_ID is passed as a query parameter
  const { role_name, role_permissions, role_status_ID } = req.body; // Updated role details

  try {
    const [roleCheck] = await db.promise().query("SELECT * FROM roles WHERE role_ID = ?", [role_ID]);
    if (roleCheck.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลบทบาท (Role)" });
    }
    const updateQuery = `
      UPDATE roles SET
        role_name = ?,
        role_permissions = ?,
        role_status_ID = ?
      WHERE role_ID = ?
    `;
    await db.promise().query(updateQuery, [
      role_name , 
      role_permissions , 
      role_status_ID , 
    ]);

    res.status(200).json({ message: "อัปเดตข้อมูลบทบาทเรียบร้อยแล้ว" });
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดำเนินการ" });
  }
};


module.exports = { 
  registerRole, 
  getRolesForView, 
  getRoleByID, 
  getAutoRoleID,
  updateRole
};
