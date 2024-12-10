const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  order:[
    {
      itemName:{
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Cancelled'], 
    },
    totalAmount: {
      type: Number, 
      required: true
    },
    orderDate:{
      type: Date,
      required: true
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['Paid', 'Unpaid', 'Pending'], 
    }
    }
  ]
  
}, {
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);
