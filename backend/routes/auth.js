const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, getAutotid} = require('../controllers/regiterController');
const { getProvince,getAmphures,getTambons,getZipcode } = require('../controllers/addressControler');
// const { registerRoom } = require('../controllers/RoomController');
const authenticateToken = require('../middleware/auth');
const { registerRoom, getAutotidRoom } = require('../controllers/RoomController');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);
router.post('/registerRoom', authenticateToken, registerRoom);
router.get('/getAutotid',authenticateToken, getAutotid);
router.get('/getAutotidRoom',authenticateToken, getAutotidRoom);
router.get('/getProvince',authenticateToken, getProvince);
router.get('/getAmphures', authenticateToken, getAmphures);
router.get('/getTambons',authenticateToken, getTambons);
router.get('/getZipcode',authenticateToken, getZipcode);
// router.post('/registerRoom', authenticateToken, registerRoom);

module.exports = router;
