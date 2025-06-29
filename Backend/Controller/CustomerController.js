const Model = require("../Model/CustomerDetails");
const Customermodel = Model.customerModel;

const model2 = require('../Model/AllBills')
const  BillsModel = model2.BillsModel;

var jwt = require("jsonwebtoken");

exports.ProduceBill = async (req, res) => {
  const { CustomerName, PhoneNumber, Address, Mode } = req.body;
  var token = jwt.sign({ name: req.body.PhoneNumber }, "shhhhh");
  console.log(token);

  // var decoded = jwt.verify(token, "shhhhh");
  // console.log(" your decoded token is",decoded);

  const newCustomer = new Customermodel({
    CustomerName,
    PhoneNumber,
    Address,
    Mode,
    Token: token,
  });
  // newCustomer.Token = token;

  newCustomer.save();
  res
    .status(200)
    .json({ success: true, message: "item created successfully", newCustomer });
};

exports.FetchCustomer = async (req, res) => {
  try {
    const _id = req.params;
    console.log(_id);

    const fetchedUsers = await Customermodel.findOne({ PhoneNumber: _id });
    res
      .status(200)
      .json({ message: "yes u fetched", success: true, fetchedUsers });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.SaveBill = async (req, res) => {
  const {CustomerName , PhoneNumber , Address , Cart , Mrp } = req.body;

  const newBill = new BillsModel({
    CustomerName,
    PhoneNumber ,
    Address , 
    Cart,
    Mrp
  });

  newBill.save();
  res.status(200).json({success : true , newBill})
};


exports.getBills = async (req, res) => {
  try {
    const allBills = await BillsModel.find(); // Fetch all documents from the 'bills' collection
    res.status(200).json({
      success: true,
      data: allBills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bills',
      error: error.message
    });
  }
}