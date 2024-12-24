import mongoose, { Schema, Document } from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    billAmount: {
      type: Number,
      required: true,
    },
    billDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paymentGateway: {
      type: String,
      default: '-',
    },
    paymentStatus: {
      type: String,
      enum: [ 'Paid', 'Unpaid','Canceled'],
      default: 'Unpaid',
    },
    transactionId: {
      type: String,
      default: "null",
    },
    paymentId: {
      type: String,
    },
    idNo:{
      type: String,
    },
    paymentDetails: {
      type: {
        billId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bill",
        },
        tran_id: { 
          type: String, 
          required: true 
        },
        val_id: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        card_type: {
          type: String,
          required: true,
        },
        store_amount: {
          type: Number,
          required: true,
        },
        bank_tran_id: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        tran_date: {
          type: Date,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
        card_issuer: {
          type: String,
          required: true,
        },
        card_brand: {
          type: String,
          required: true,
        },
        card_issuer_country: {
          type: String,
          required: true,
        },
        store_id: {
          type: String,
          required: true,
        },
        risk_level: {
          type: String,
          required: true,
        },
        risk_title: {
          type: String,
          required: true,
        },
      },
      default: null, // Initialize with null
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Bill', paymentSchema);

module.exports = Payment;
