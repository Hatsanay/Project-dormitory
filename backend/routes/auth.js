const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, getAutotid ,getRole ,getUser, getUserById, updateUser, updateUserStatus} = require('../controllers/regiterController');
const { getProvince,getAmphures,getTambons,getZipcode } = require('../controllers/addressControler');
const authenticateToken = require('../middleware/auth');
const { registerRoom, getAutotidRoom, getRoom, getRoomByNumber, updateRoom, updateRoomStatus ,getStatusRoom} = require('../controllers/RoomController');
const { registerUnit, getAutotidUnit, getUnit, getUnitByName, updateUnit} = require('../controllers/unitController');
const { registerStock, getAutotidStock, getStock, getStockByID, updateStock} = require('../controllers/stockController');
const { registerTypeStock, getAutotidTypeStock, getTypeStock, getTypeStockByName, updateTypeStock} = require('../controllers/stockTypeController');
const { registerStatus} = require('../controllers/statusControler');
const { registerStatusType,getStatusType,getStatusTypeByName,getAutotidStatusType,updateStatusType} = require('../controllers/statusTypeControler');
const router = express.Router();

router.post('/login', login);

router.post('/registerUser', authenticateToken, registerUser);
router.post('/registerRoom', authenticateToken, registerRoom);
router.post('/registerUnit', authenticateToken, registerUnit);
router.post('/registerStatus', authenticateToken, registerStatus);
router.post('/registerStatusType', authenticateToken, registerStatusType);
router.post('/registerStock', authenticateToken, registerStock);
router.post('/registerTypeStock', authenticateToken, registerTypeStock);

router.get('/getAutotidRoom',authenticateToken, getAutotidRoom);
router.get('/getRoom',authenticateToken, getRoom);
router.get('/getRoomByNumber',authenticateToken, getRoomByNumber);
router.get('/getStatusRoom',authenticateToken,getStatusRoom);

router.get('/getAutotid',authenticateToken, getAutotid);
router.get('/getRole',authenticateToken, getRole);
router.get('/getUser',authenticateToken, getUser);
router.get('/getUserById',authenticateToken, getUserById);
router.get('/getProvince',authenticateToken, getProvince);
router.get('/getAmphures', authenticateToken, getAmphures);
router.get('/getTambons',authenticateToken, getTambons);
router.get('/getZipcode',authenticateToken, getZipcode);
//router.get('/getStatusUserDelete',authenticateToken,getStatusUserDelete);

router.get('/getAutotidUnit',authenticateToken, getAutotidUnit);
router.get('/getUnit',authenticateToken, getUnit);
router.get('/getUnitByName',authenticateToken, getUnitByName);

router.get('/getAutotidStock',authenticateToken, getAutotidStock);
router.get('/getStock',authenticateToken, getStock);
router.get('/getStockByName',authenticateToken, getStockByID);

router.get('/getAutotidTypeStock',authenticateToken, getAutotidTypeStock);
router.get('/getTypeStock',authenticateToken, getTypeStock);
router.get('/getTypeStockByName',authenticateToken, getTypeStockByName);

router.get('/getAutotidStatusType',authenticateToken, getAutotidStatusType);
router.get('/getStatusType',authenticateToken, getStatusType);
router.get('/getStatusTypeByName',authenticateToken, getStatusTypeByName);

router.put('/updateUser',authenticateToken, updateUser);
router.put('/updateUserStatus',authenticateToken, updateUserStatus);

router.put('/updateRoom',authenticateToken, updateRoom);
router.put('/updateRoomStatus',authenticateToken, updateRoomStatus);

router.put('/updateUnit',authenticateToken, updateUnit);

router.put('/updateStock',authenticateToken, updateStock);

router.put('/updateTypeStock',authenticateToken, updateTypeStock);

router.put('/updateStatusType',authenticateToken, updateStatusType);

module.exports = router;
