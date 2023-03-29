import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CustomerScreen from "./screens/CustomerScreen";
import CreateCustomerScreen from "./screens/CreateCustomerScreen";
import EditCustomerScreen from "./screens/EditCustomerScreen";
import BookingScreen from "./screens/BookingScreen";
import CreateBookingScreen from "./screens/CreateBookingScreen";
import EditBookingScreen from "./screens/EditBookingScreen";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Aerial PhotoGraphy Bookings Portal
      </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerScreen />}></Route>
          <Route
            path="/createcustomer"
            element={<CreateCustomerScreen />}
          ></Route>
          <Route
            path="/:id/editcustomer"
            element={<EditCustomerScreen />}
          ></Route>
          <Route path="/:id/mybookings" element={<BookingScreen />}></Route>
          <Route
            path="/:id/createbooking"
            element={<CreateBookingScreen />}
          ></Route>
          <Route
            path="/:id/editbooking"
            element={<EditBookingScreen />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
