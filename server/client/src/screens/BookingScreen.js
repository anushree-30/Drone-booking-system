import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import M from "materialize-css";

const BookingScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`/${id}/mybookings`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.bookings);
      });
  }, [id]);

  const deleteBooking = (id) => {
    fetch(`/${id}/deletebooking`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((result) => {
        M.toast({
          html: "Booking Deleted",
          classes: "#d32f2f red darken-2",
        });
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    // <div className="container">
    <Container>
      <h3>Customer Bookings</h3>
      <Row>
        <Col md={{ span: 1, offset: 9 }}>
          <LinkContainer
            to={`/${id}/createbooking`}
            state={{ customer_id: id }}
          >
            <Button variant="success" className="btn">
              <i className="fas fa-plus"></i>
            </Button>
          </LinkContainer>
        </Col>
        <Col md={{ span: 1, offset: 0 }}>
          <LinkContainer to={`/`}>
            <Button variant="success" className="btn">
              {/* <i className="fas fa-plus"></i> */}
              <h6>Go Back</h6>
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        {/* <Table className="striped highlight centered responsive-table m-2"> */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Location ID</th>
              <th>Drone Shot ID</th>
              <th>Created Time</th>
              {/* <th>PHONE</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.location_id}</td>
                <td>{booking.drone_shot_id}</td>
                <td>{booking.created_time}</td>
                <td>
                  <LinkContainer
                    to={`/${booking._id}/editbooking`}
                    state={{ customer_id: id, booking }}
                  >
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm ml-2 mr-2"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default BookingScreen;
