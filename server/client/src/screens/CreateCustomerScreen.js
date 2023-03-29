import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const CreateCustomerScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const createCustomer = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return M.toast({
        html: "Invalid Email",
        classes: "#d32f2f red darken-2",
      });
    }
    fetch("/createcustomer", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({
            html: "Customer Created",
            classes: "#689f38 light-green darken-2",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h3>Create Customer</h3>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #2196f3 blue"
          onClick={() => createCustomer()}
        >
          Create
        </button>
        <h6 className="mt-3">
          <Link to="/">Go Back</Link>
        </h6>
      </div>
    </div>
  );
};

export default CreateCustomerScreen;
