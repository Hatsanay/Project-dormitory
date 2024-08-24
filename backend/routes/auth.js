const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser } = require('../controllers/regiterController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', authenticateToken, registerUser);
// router.get('/getUserById/:id', getLartIdUser);

module.exports = router;
