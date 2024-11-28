const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const tableSchema = new Schema({
  Capacity: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
