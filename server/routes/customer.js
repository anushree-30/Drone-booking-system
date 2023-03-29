const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Booking = mongoose.model("Booking");

router.get("/allcustomers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json({ customers });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createcustomer", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  const customer = new Customer({
    name,
    email,
    phone,
  });
  customer
    .save()
    .then((result) => {
      res.json({ customer: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id/editcustomer", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  Customer.findByIdAndUpdate(id, { name, email, phone }, { new: true })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.delete("/:id/deletecustomer", (req, res) => {
  const { id } = req.params;
  Booking.deleteMany({ made_by: id })
    .then((resultt) => {
      Customer.deleteOne({ _id: id })
        .then((result) => {
          res.json({ _id: id });
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

module.exports = router;
