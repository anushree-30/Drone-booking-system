const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = mongoose.model("Booking");

router.get("/:id/mybookings", (req, res) => {
  Booking.find({ made_by: req.params.id })
    .populate("made_by", "_id name email phone")
    .then((bookings) => {
      res.json({ bookings });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/createbooking", (req, res) => {
  const { id } = req.params;
  const { location_id, drone_shot_id } = req.body;
  if (!location_id || !drone_shot_id) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  let d = new Date();
  const booking = new Booking({
    location_id,
    drone_shot_id,
    made_by: id,
    created_time: d.toLocaleString(),
  });

  booking
    .save()
    .then((result) => {
      res.json({ booking: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id/editbooking", (req, res) => {
  const { id } = req.params;
  const { location_id, drone_shot_id } = req.body;

  Booking.findByIdAndUpdate(id, { location_id, drone_shot_id }, { new: true })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.delete("/:id/deletebooking", (req, res) => {
  const { id } = req.params;

  Booking.deleteOne({ _id: id })
    .then((result) => {
      res.json({ _id: id });
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

module.exports = router;
