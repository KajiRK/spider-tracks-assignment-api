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
        throw new Error("Fill all required feilds.");
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

//@desc - Update opp
//@route - PUT - /api/opps/:id
//@access - Public
const updateOpp = asyncHandler( async (req, res) => {

    console.log(req.params.id);
    console.log(req.params.oppId);

    const {name, status} = req.body;
    if(!name || !status){
        res.status(400);
        throw new Error("Fill all required feilds.");
    }

    const opp = await Opportunity.findByIdAndUpdate(req.params.oppId, req.body, {new: true});
    if(!opp) {
        res.status(404);
        throw new Error("opp not found!");
    }

    const customerData = await Customer.findById(req.params.id);
    const updatedOpps = customerData.opps.map((oppItem) => {
        if(opp.id == oppItem._id.toString()){
            return {...oppItem, name: opp.name, status: opp.status}
        }
        return oppItem;
    });
    await Customer.findByIdAndUpdate(req.params.id, { opps: updatedOpps });

    res.status(200).json(opp);
});

module.exports = { createOpp, updateOpp };