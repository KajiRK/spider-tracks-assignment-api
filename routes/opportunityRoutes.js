const express  = require('express');
const router = express.Router();

const { updateOpp } = require("../controllers/opportunityController");

// To update a specific opp details
router.route('/:id').put(updateOpp);

module.exports = router;