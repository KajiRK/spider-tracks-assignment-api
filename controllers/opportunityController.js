const asyncHandler = require('express-async-handler');

const Opportunity = require("../models/opportunityModel");
const Customer = require("../models/customerModel");

//@desc - Create opp against to the customer
//@route - POST - /api/customers/:id/opps
//@access - Public
const createOpp = asyncHandler( async (req, res) => {
    const {name, status} = req.body;
    if(!name || !status){
        res.status(400);
        throw new Error("Fill all required feilds.")
    }
    const opp = await Opportunity.create({
       name, status
    });

    const customerData = await Customer.findById(req.params.id);
    const oppsData = [...customerData.opps, opp];

    await Customer.findByIdAndUpdate(req.params.id, { opps: oppsData });
    res.status(201).json({
        data: opp,
        message: 'Opportunity added successfully!'
    });
});

module.exports = { createOpp };