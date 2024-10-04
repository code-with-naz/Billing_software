const express = require('express');
const router = express.Router();
const productController = require('../controller/productcontroller');

router.post('/add', productController.addProduct);
router.get('/view', productController.getProducts);

module.exports = router;
