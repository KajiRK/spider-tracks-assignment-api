const express  = require('express');
const router = express.Router();

const { getCustomers, createCustomer, getCustomer, updateCustomer } = require("../controllers/customerController");
const { createOpp } = require("../controllers/opportunityController");

// To get all customers of the company
router.route('/').get(getCustomers);

// To create customer record
router.route('/').post(createCustomer);

// To get a specific customer details
router.route('/:id').get(getCustomer);

// To update a specific customer details
router.route('/:id').put(updateCustomer);

// To create opp against to the customer
router.route('/:id/opps').post(createOpp);

module.exports = router;