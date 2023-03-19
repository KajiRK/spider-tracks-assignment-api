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

    // get customer data to update with newly created opp
    const customerData = await Customer.findById(req.params.id);

    // process created opp data to existing embedded opps
    const oppsData = [...customerData.opps, opp];

    // update customer with processed opps as embedded document
    await Customer.findByIdAndUpdate(req.params.id, { opps: oppsData });

    res.status(201).json(opp);
});

//@desc - Update opp
//@route - PUT - /api/customers/:id/opps/:id
//@access - Public
const updateOpp = asyncHandler( async (req, res) => {
    const {name, status} = req.body;
    if(!name || !status){
        res.status(400);
        throw new Error("Fill all required feilds.");
    }

    // find and update opp details and return updated collection
    const opp = await Opportunity.findByIdAndUpdate(req.params.oppId, req.body, {new: true});
    if(!opp) {
        res.status(404);
        throw new Error("opp not found!");
    }

    // get customer data to update embedded opps
    const customerData = await Customer.findById(req.params.id);

    // process updated opp data to existing embedded opps
    const updatedOpps = customerData.opps.map((oppItem) => {
        if(opp.id == oppItem._id.toString()){
            return {...oppItem, name: opp.name, status: opp.status}
        }
        return oppItem;
    });

    // update customer with processed opps as embedded document
    await Customer.findByIdAndUpdate(req.params.id, { opps: updatedOpps });

    res.status(200).json(opp);
});

module.exports = { createOpp, updateOpp };