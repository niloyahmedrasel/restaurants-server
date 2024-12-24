const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order:[{
        orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: 'Pending'
    },
    amount:{
        type: Number,
        required: true,
    },
    paymentStatus:{
        type: String,
        required: true,
        default: 'Unpaid'
    }
    },
{timestamps: true}]
})

module.exports = mongoose.model('History', historySchema);