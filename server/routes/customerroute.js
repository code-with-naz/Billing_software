const express = require('express');
const router = express.Router();
const customerController = require('../controller/customercontroller');

router.post('/add', customerController.addCustomer);
router.get('/view', customerController.getCustomers);

module.exports = router;
