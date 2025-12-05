const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/registro', authController.registro);
router.post('/login', authController.login);
router.post('/verify-2fa', authController.verificarToken2FA);

router.get('/me', authMiddleware, authController.me);

module.exports = router;