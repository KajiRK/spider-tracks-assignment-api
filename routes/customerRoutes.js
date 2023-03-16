const express  = require('express');
const router = express.Router();

const { getCustomers, createCustomer, getCustomer } = require("../controllers/customerController");

// To get all customers of the company
router.route('/').get(getCustomers);

// To create customer record
router.route('/').post(createCustomer);

// To get a specific customer details
router.route('/:id').get(getCustomer);

module.exports = router;