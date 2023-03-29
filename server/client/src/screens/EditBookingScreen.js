import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import M from "materialize-css";

const EditBookingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { customer_id, booking } = location.state;

  const [location_id, setLocationId] = useState(booking.location_id);
  const [drone_shot_id, setDroneShotId] = useState(booking.drone_shot_id);

  const editBooking = () => {
    fetch(`/${id}/editbooking`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location_id,
        drone_shot_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({
            html: "Booking Edited",
            classes: "#689f38 light-green darken-2",
          });
          navigate(`/${customer_id}/mybookings`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h3>Edit Booking</h3>
        <input
          type="text"
          placeholder="location_id"
          value={location_id}
          onChange={(e) => setLocationId(e.target.value)}
        />
        <input
          type="text"
          placeholder="drone_shot_id"
          value={drone_shot_id}
          onChange={(e) => setDroneShotId(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #2196f3 blue"
          onClick={() => editBooking()}
        >
          Edit
        </button>
        <h6 className="mt-3">
          <Link to={`/${customer_id}/mybookings`}>Go Back</Link>
        </h6>
      </div>
    </div>
  );
};

export default EditBookingScreen;
