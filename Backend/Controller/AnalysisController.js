// import { useParams } from "react-router-dom";

const model = require("../Model/AllBills");
const BillsModel = model.BillsModel;

exports.SingleManagerAnalysis = async (req, res) => {
  const  _id  = req.params.id;

  const ManagerData = await BillsModel.find({ user: _id });
  if (!ManagerData) {
    res.status(401).json({ success: false, message: "no manager data found" });
  }

  res.status(200).json({
    success: true,
    message: "here u go sir with your data",
    ManagerData,
  });
};
