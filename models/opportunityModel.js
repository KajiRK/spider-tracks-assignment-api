const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Opp name is required']
        },
        status: {
            type: String,
            required: [true, 'Opp status is required'],
            enum: ['New', 'Closed Won', 'Closed Lost'],
            default: 'New'
        }
    },
    {
        timestamps: true
    }
);

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;