const express = require('express');
const { login, registerUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/registerUser', registerUser);

module.exports = router;
