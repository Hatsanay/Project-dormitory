const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, getAutotid} = require('../controllers/regiterController');
const { getProvince,getAmphures,getTambons } = require('../controllers/addressControler');
const { registerUser } = require('../controllers/regiterController');
const { registerRoom } = require('../controllers/RoomController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);
router.get('/getAutotid',authenticateToken, getAutotid);
router.get('/getProvince',authenticateToken, getProvince);
router.get('/getAmphures', authenticateToken, getAmphures);
router.get('/getTambons',authenticateToken, getTambons);
router.post('/registerRoom', authenticateToken, registerRoom);

module.exports = router;
