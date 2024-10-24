const db = require("../config/db");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

const getWithdrawReq = async (req, res) => {
    try {
      const query = `SELECT 
                requisition_ID,
                requisition_Date,
                requisition_mainr_ID,
                requisition_user_ID,
                CONCAT(users.user_Fname, ' ', users.user_Lname) AS fullname,
                status.stat_Name AS statusRequis
            FROM 
                requisition
                INNER JOIN maintenancerequests on maintenancerequests.mainr_ID = requisition.requisition_mainr_ID
                INNER JOIN users on users.user_ID = requisition.requisition_user_ID
                INNER JOIN status  ON status.stat_ID = requisition.requisition_stat_ID
            WHERE maintenancerequests.mainr_Stat_ID = "STA000023"
        `;
  
      const [result] = await db.promise().query(query);
      if (result.length === 0) {
        return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
      }
      const formattedResult = result.map((item) => ({
        ...item,
        requisition_Date:
          new Date(item.requisition_Date).toLocaleDateString("th-TH", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) +
          " " +
          new Date(item.requisition_Date).toLocaleTimeString("th-TH", {
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


const getWithdrawReqlist = async (req, res) => {
  try {
    const query = `SELECT requisition_ID,
                requisition_Date,
                requisition_mainr_ID,
                requisition_user_ID,
                CONCAT(users.user_Fname, ' ', users.user_Lname) AS fullname,
                statusRequi.stat_Name AS statusRequis,
                requisition_list.reqlist_order AS listnumber,
                requisition_list.reqlist_stock_ID AS stockid,
                stock.name AS stockname,
                requisition_list.quantity AS withdrawquantity,
                stock.quantity AS stockquantity,
                statusRequilist.stat_Name AS statusRequislist
            FROM 
                requisition
                INNER JOIN maintenancerequests on maintenancerequests.mainr_ID = requisition.requisition_mainr_ID
                INNER JOIN users on users.user_ID = requisition.requisition_user_ID
                INNER JOIN status statusRequi ON statusRequi.stat_ID = requisition.requisition_stat_ID
                INNER JOIN requisition_list on requisition_list.reqlist_requisition_ID = requisition.requisition_ID
                INNER JOIN stock on stock.ID = requisition_list.reqlist_stock_ID
                INNER JOIN status statusRequilist on statusRequilist.stat_ID = requisition.requisition_stat_ID
            WHERE maintenancerequests.mainr_Stat_ID = "STA000023"
      `;

    const [result] = await db.promise().query(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลการแจ้งซ่อม" });
    }
    const formattedResult = result.map((item) => ({
      ...item,
      requisition_Date:
        new Date(item.requisition_Date).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        new Date(item.requisition_Date).toLocaleTimeString("th-TH", {
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

module.exports = {getWithdrawReq,getWithdrawReqlist};
