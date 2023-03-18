const express  = require('express');
const router = express.Router();

const { createOpp } = require("../controllers/opportunityController");

// To create opp against to the customer
router.route('/:id/opps').post(createOpp);

module.exports = router;