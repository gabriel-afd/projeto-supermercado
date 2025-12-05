const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', userController.listarUsuarios);
router.get('/:id', userController.buscarUsuario);
router.put('/:id', userController.atualizarUsuario);
router.delete('/:id', userController.deletarUsuario);

module.exports = router;