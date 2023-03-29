const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bookingSchema = new mongoose.Schema(
  {
    location_id: {
      type: String,
      required: true,
    },
    drone_shot_id: {
      type: String,
      required: true,
    },
    created_time: {
      type: String,
    },
    made_by: {
      type: ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Booking", bookingSchema);
