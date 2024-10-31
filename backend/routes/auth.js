const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, getAutotid ,getRole ,getUser, getUserById, updateUser, updateUserStatus} = require('../controllers/regiterController');
const { getProvince,getAmphures,getTambons,getZipcode } = require('../controllers/addressControler');
const {getStatus,getStatusUserDelete,registerStatus,getStatusForView,getStatusByID,getAutotidSta,updateStatus,updateStatusSta,getDeletableStatus} = require('../controllers/statusControler');
const {getReqById, getHisReqById, getUserByIdfromReq, getPetitiontype, submitRepairRequest, upload, getImgById, cancelReq} = require('../controllers/reqController');
const {getReq,denyReq,sendtomacReq,getMacReq,sendAssessProblemReq,getMacReqById,getStock,submitRequisition} = require('../controllers/manageRequetsControler');
const {getWithdrawReqlist,getWithdrawReq,putReqWithdraw,getWithdraw,putAcceptWithdraw,cancelWithdraw} = require('../controllers/WithdrawControler');
// getUserByIdfromReq
// const { registerRoom } = require('../controllers/RoomController');

const { registerRoom, getAutotidRoom, getRoom, getRoomByNumber, updateRoom, updateRoomStatus ,getStatusRoom,getStatusRoomDelete} = require('../controllers/RoomController');
const { registerUnit, getAutotidUnit, getUnit, getUnitByID, updateUnit,updateStatusUnit,getDeletableUnits} = require('../controllers/unitController');
const { registerStock, getAutotidStock, getStockforstock, getStockByID, updateStock,updateStatusStock,getDeletableStock} = require('../controllers/stockController');
const { registerTypeStock, getAutotidTypeStock, getTypeStock, getTypeStockByID, updateTypeStock,updateStatusTypeStock,getDeletableTypeStock} = require('../controllers/stockTypeController');
const { registerStatusType,getStatusType,getStatusTypeByID,getAutotidStatusType,updateStatusType,getDeletableTypeStatus,updateStatusTypeStatus} = require('../controllers/statusTypeControler');
const { registerRole, getRolesForView, getRoleByID, getAutoRoleID,updateRole,getAutoPermissionID} = require('../controllers/roleControler');


const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);
router.post('/registerRoom', authenticateToken, registerRoom);
router.post('/registerUnit', authenticateToken, registerUnit);
router.post('/registerStatus', authenticateToken, registerStatus);
router.post('/registerStatusType', authenticateToken, registerStatusType);
router.post('/registerStock', authenticateToken, registerStock);
router.post('/registerTypeStock', authenticateToken, registerTypeStock);
router.post('/registerRole', authenticateToken, registerRole);


router.get('/getAutotidRoom',authenticateToken, getAutotidRoom);
router.get('/getRoom',authenticateToken, getRoom);
router.get('/getRoomByNumber',authenticateToken, getRoomByNumber);
router.get('/getStatusRoom',authenticateToken,getStatusRoom);
router.get('/getStatusRoomDelete',authenticateToken,getStatusRoomDelete);

router.get('/getAutotidUnit',authenticateToken, getAutotidUnit);
router.get('/getUnit',authenticateToken, getUnit);
router.get('/getUnitByID',authenticateToken, getUnitByID);
router.get('/getDeletableUnits',authenticateToken, getDeletableUnits);

router.get('/getAutotidStock',authenticateToken, getAutotidStock);
router.get('/getStockforstock',authenticateToken, getStockforstock);
router.get('/getStockByID',authenticateToken, getStockByID);
router.get('/getDeletableStock',authenticateToken, getDeletableStock);


router.get('/getAutotidTypeStock',authenticateToken, getAutotidTypeStock);
router.get('/getTypeStock',authenticateToken, getTypeStock);
router.get('/getTypeStockByID',authenticateToken, getTypeStockByID);
router.get('/getDeletableTypeStock',authenticateToken, getDeletableTypeStock);


router.get('/getAutotidStatusType',authenticateToken, getAutotidStatusType);
router.get('/getStatusType',authenticateToken, getStatusType);
router.get('/getStatusTypeByID',authenticateToken, getStatusTypeByID);
router.get('/getDeletableTypeStatus',authenticateToken, getDeletableTypeStatus);
/////////////////////////////////////////////////////////////////////////////
router.get('/getStatusForView',authenticateToken, getStatusForView);
router.get('/getStatusByID',authenticateToken, getStatusByID);
router.get('/getAutotidSta',authenticateToken, getAutotidSta);
router.get('/getDeletableStatus',authenticateToken, getDeletableStatus);
//////////////////////////////////////////////////////////////////////////////
router.get('/getRolesForView',authenticateToken, getRolesForView);
router.get('/getRoleByID',authenticateToken, getRoleByID);
router.get('/getAutoRoleID',authenticateToken, getAutoRoleID);
router.get('/getAutoPermissionID',authenticateToken, getAutoPermissionID);

router.post('/submitRepairRequest', authenticateToken, upload.array('images'), submitRepairRequest);

router.post('/sendAssessProblemReq', authenticateToken, sendAssessProblemReq);
router.post('/submitRequisition', authenticateToken, submitRequisition);

router.get('/getAutotid',authenticateToken, getAutotid);
router.get('/getRole',authenticateToken, getRole);
router.get('/getUser',authenticateToken, getUser);
router.get('/getUserById',authenticateToken, getUserById);
router.get('/getProvince',authenticateToken, getProvince);
router.get('/getAmphures', authenticateToken, getAmphures);
router.get('/getTambons',authenticateToken, getTambons);
router.get('/getZipcode',authenticateToken, getZipcode);
router.get('/getStatus',authenticateToken, getStatus);
router.get('/getStatusUserDelete',authenticateToken, getStatusUserDelete);

router.get('/getReqById',authenticateToken, getReqById);
router.get('/getHisReqById',authenticateToken, getHisReqById);
router.get('/getUserByIdfromReq',authenticateToken, getUserByIdfromReq);
router.get('/getPetitiontype',authenticateToken, getPetitiontype);
router.get('/getImgById',authenticateToken, getImgById);

router.get('/getReq',authenticateToken, getReq);
router.get('/getMacReq',authenticateToken, getMacReq);
router.get('/getMacReqById',authenticateToken, getMacReqById);
router.get('/getStock',authenticateToken, getStock);

router.get('/getWithdrawReq',authenticateToken, getWithdrawReq);
router.get('/getWithdrawReqlist',authenticateToken, getWithdrawReqlist);
router.get('/getWithdraw',authenticateToken, getWithdraw);




router.put('/updateUser',authenticateToken, updateUser);
router.put('/updateUserStatus',authenticateToken, updateUserStatus);

router.put('/cancelReq',authenticateToken, cancelReq);

router.put('/denyReq',authenticateToken, denyReq);
router.put('/sendtomacReq',authenticateToken, sendtomacReq);

router.put('/putReqWithdraw',authenticateToken, putReqWithdraw);
router.put('/putAcceptWithdraw',authenticateToken, putAcceptWithdraw);
router.put('/cancelWithdraw',authenticateToken, cancelWithdraw);


router.put('/updateRoom',authenticateToken, updateRoom);
router.put('/updateRoomStatus',authenticateToken, updateRoomStatus);

router.put('/updateUnit',authenticateToken, updateUnit);
router.put('/updateStatusUnit',authenticateToken, updateStatusUnit);

router.put('/updateStock',authenticateToken, updateStock);
router.put('/updateStatusStock',authenticateToken, updateStatusStock);

router.put('/updateTypeStock',authenticateToken, updateTypeStock);
router.put('/updateStatusTypeStock',authenticateToken, updateStatusTypeStock);

router.put('/updateStatusType',authenticateToken, updateStatusType);
router.put('/updateStatusTypeStatus',authenticateToken, updateStatusTypeStatus);

router.put('/updateStatus',authenticateToken, updateStatus);
router.put('/updateStatusSta',authenticateToken, updateStatusSta);


// router.post('/registerRoom', authenticateToken, registerRoom);

module.exports = router;
