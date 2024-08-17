const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser } = require('../controllers/regiterController');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', registerUser);

module.exports = router;
