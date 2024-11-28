const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Cancelled'], 
  },
  totalAmount: {
    type: mongoose.Schema.Types.Decimal128, 
    required: true
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Paid', 'Unpaid', 'Pending'], 
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);
