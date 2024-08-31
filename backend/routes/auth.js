const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, getAutotid ,getRole ,getUser} = require('../controllers/regiterController');
const { getProvince,getAmphures,getTambons,getZipcode } = require('../controllers/addressControler');
// const { registerRoom } = require('../controllers/RoomController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);
router.get('/getAutotid',authenticateToken, getAutotid);
router.get('/getRole',authenticateToken, getRole);
router.get('/getUser',authenticateToken, getUser);
router.get('/getProvince',authenticateToken, getProvince);
router.get('/getAmphures', authenticateToken, getAmphures);
router.get('/getTambons',authenticateToken, getTambons);
router.get('/getZipcode',authenticateToken, getZipcode);
// router.post('/registerRoom', authenticateToken, registerRoom);

module.exports = router;
