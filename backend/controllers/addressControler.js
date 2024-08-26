const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

const getProvince = async (req, res) => {
    try {


        const query = 'SELECT id,name_th FROM thai_provinces';
        const [result] = await db.promise().query(query);
        res.status(200).json(result);
    } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดำเนินการ' });
    }
}

const getAmphures = async (req, res) => {
    try {
        const { provinceId } = req.query;

        if (!provinceId) {
            return res.status(400).json({ error: 'โปรดระบุ provinceId' });
        }

        const query = 'SELECT id, name_th FROM thai_amphures WHERE province_id = ?';
        const [result] = await db.promise().query(query, [provinceId]);

        res.status(200).json(result);
    } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดำเนินการ' });
    }
};




const getTambons = async (req, res) => {
    try {


        const query = 'SELECT id,name_th FROM thai_tambons';
        const [result] = await db.promise().query(query);
        res.status(200).json(result);
    } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดำเนินการ' });
    }
}

module.exports = {getProvince,getAmphures,getTambons};