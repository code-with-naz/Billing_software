const express = require('express');
const router = express.Router();
const billingController = require('../controller/billingcontroller');

// Get all billings
router.get('/', billingController.getAllBillings);

// Create a new billing
router.post('/add', billingController.createBilling);

// Delete a billing
router.delete('/delete/:id', billingController.deleteBilling);

module.exports = router;
