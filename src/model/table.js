const mongoose = require('mongoose');


// Define the schema
const tableSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  personCount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default:"Available"
  },
  day:{
    type: Date,
    required: true
  },
  time:{
    type: String,
    required: true
  },
  message: {
    type: String,
  }
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
