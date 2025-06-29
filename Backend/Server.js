const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");

const app = express();

app.use(cors());

// body parser
app.use(express.json());

const router = express.Router();
const ItemRouter = require("./Controller/ItemController");
const CustomerRouter = require("./Controller/CustomerController");
const AuthController = require("./Controller/AuthController");
const authMiddleware = require("./Controller/authMiddleware");

app.use("/api", router);

app.use("/", (req, res) => {
  res.send({
    activeStatus:true,
    error : false,
  })
});


router.post("/NewItem", authMiddleware, ItemRouter.AddItem);
router.get("/GetItem", authMiddleware, ItemRouter.GetItem);

router.post("/AddCustomer", authMiddleware, CustomerRouter.ProduceBill);
router.get("/getCustomer/:_id", authMiddleware, CustomerRouter.FetchCustomer);
router.post("/saveBill", authMiddleware, CustomerRouter.SaveBill);
router.get("/getBill", authMiddleware, CustomerRouter.getBills);

app.post("/api/auth/register", AuthController.register);
app.post("/api/auth/login", AuthController.login);

// connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(String(process.env.URL));
  console.log("your connection is successful");
}

//port details

app.listen(process.env.PORT, () => {
  console.log("You are on  " + `${process.env.PORT}`);
});
