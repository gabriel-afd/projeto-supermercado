const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', productController.criarProduto);
router.get('/', productController.listarProdutos);
router.get('/promocoes', productController.promocoes);
router.get('/:id', productController.buscarProduto);
router.put('/:id', productController.atualizarProduto);
router.delete('/:id', productController.deletarProduto);

module.exports = router;