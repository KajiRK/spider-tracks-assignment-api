const asyncHandler = require('express-async-handler');

const Customer = require("../models/customerModel");

//@desc - Get all customers
//@route - GET - /api/customers
//@access - Public
const getCustomers = asyncHandler( async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json(customers);
});

//@desc - Create customer record
//@route - POST - /api/customers
//@access - Public
const createCustomer = asyncHandler( async (req, res) => {
    console.log("Request body is:", req.body);
    const {code, name, mobile, email, status} = req.body;
    if(!code || !name || !email || !status){
        res.status(400);
        throw new Error("Fill all required feilds.")
    }
    const customer = await Customer.create({
        code, name, mobile, email, status
    });
    res.status(201).json(customer);
});

//@desc - Get a customer
//@route - GET - /api/customers/:id
//@access - Public
const getCustomer = asyncHandler( async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) {
        res.status(404);
        throw new Error("Customer not found.");
    }
    res.status(200).json(customer);
});

module.exports = { getCustomers, createCustomer, getCustomer };