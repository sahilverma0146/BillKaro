const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillsSchema = new Schema({
  CustomerName: { type: String, required: true },
  PhoneNumber: { type: Number },
  Address: { type: String, required: true },
  Cart: { type: Object },
  Mrp: { type: Number },
});

exports.BillsModel = mongoose.model("BillsModel", BillsSchema);
