const asyncHandler = require('express-async-handler');

const Customer = require("../models/customerModel");

//@desc - Get all customers
//@route - GET - /api/customers
//@access - Public
const getCustomers = asyncHandler( async (req, res) => {
    const customers = await Customer.find().sort({'_id': -1});
    res.status(200).json(customers);
});

//@desc - Create customer record
//@route - POST - /api/customers
//@access - Public
const createCustomer = asyncHandler( async (req, res) => {
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

//@desc - Update customer
//@route - PUT - /api/customers/:id
//@access - Public
const updateCustomer = asyncHandler( async (req, res) => {
    const {name, email} = req.body;
    if(!name || !email){
        res.status(400);
        throw new Error("Fill all required feilds.")
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!customer) {
        res.status(404);
        throw new Error("Customer not found!")
    }
    res.status(200).json({
        data: customer,
        message: 'Customer updated successfully!'
    });
});

module.exports = { getCustomers, createCustomer, getCustomer, updateCustomer };