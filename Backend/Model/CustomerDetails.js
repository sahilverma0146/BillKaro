const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  CustomerName: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Address: { type: String },
  Mode: { type: String },
  Token: { type: String },
});

exports.customerModel = mongoose.model("customerModel", CustomerSchema);
