const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, getAutotid ,getRole ,getUser, getUserById, updateUser, updateUserStatus} = require('../controllers/regiterController');
const { getProvince,getAmphures,getTambons,getZipcode } = require('../controllers/addressControler');
const {getStatus,getStatusUserDelete} = require('../controllers/statusControler');
const {getReqById, getHisReqById, getUserByIdfromReq, getPetitiontype, submitRepairRequest, upload, getImgById, cancelReq} = require('../controllers/reqController');
const {getReq,denyReq,sendtomacReq,getMacReq,sendAssessProblemReq,getMacReqById,getStock,submitRequisition} = require('../controllers/manageRequetsControler');
const {getWithdrawReqlist,getWithdrawReq,putReqWithdraw} = require('../controllers/WithdrawControler');
// getUserByIdfromReq
// const { registerRoom } = require('../controllers/RoomController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);

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




router.put('/updateUser',authenticateToken, updateUser);
router.put('/updateUserStatus',authenticateToken, updateUserStatus);

router.put('/cancelReq',authenticateToken, cancelReq);

router.put('/denyReq',authenticateToken, denyReq);
router.put('/sendtomacReq',authenticateToken, sendtomacReq);

router.put('/putReqWithdraw',authenticateToken, putReqWithdraw);



// router.post('/registerRoom', authenticateToken, registerRoom);

module.exports = router;
