const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser } = require('../controllers/regiterController');
const { registerRoom } = require('../controllers/RoomController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);
router.post('/registerRoom', authenticateToken,registerRoom);

module.exports = router;
