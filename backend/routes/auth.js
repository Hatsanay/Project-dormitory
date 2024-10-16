const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, getAutotid ,getRole ,getUser, getUserById, updateUser, updateUserStatus} = require('../controllers/regiterController');
const { getProvince,getAmphures,getTambons,getZipcode } = require('../controllers/addressControler');
const {getStatus,getStatusUserDelete} = require('../controllers/statusControler');
const {getReqById, getUserByIdfromReq, getPetitiontype, submitRepairRequest, upload, getImgById} = require('../controllers/reqController');
const {getReq} = require('../controllers/manageRecuesControler');
// getUserByIdfromReq
// const { registerRoom } = require('../controllers/RoomController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);

router.post('/submitRepairRequest', authenticateToken, upload.array('images'), submitRepairRequest);

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
router.get('/getUserByIdfromReq',authenticateToken, getUserByIdfromReq);
router.get('/getPetitiontype',authenticateToken, getPetitiontype);
router.get('/getImgById',authenticateToken, getImgById);

router.get('/getReq',authenticateToken, getReq);



router.put('/updateUser',authenticateToken, updateUser);
router.put('/updateUserStatus',authenticateToken, updateUserStatus);

// router.post('/registerRoom', authenticateToken, registerRoom);

module.exports = router;
