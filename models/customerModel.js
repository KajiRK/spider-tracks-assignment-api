const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Customer code is required']
        },
        name: {
            type: String,
            required: [true, 'Customer name is required']
        },
        mobile: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: [true, 'Customer email is required']
        },
        status: {
            type: String,
            required: [true, 'Customer status is required'],
            enum: ['Active', 'Non-Active', 'Lead'],
            default: 'Active'
        }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;