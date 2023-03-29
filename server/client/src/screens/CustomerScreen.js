import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import M from "materialize-css";

const CustomerScreen = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/allcustomers")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result.customers);
      });
  }, []);

  const deleteCustomer = (id) => {
    fetch(`/${id}/deletecustomer`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((result) => {
        M.toast({
          html: "Customer Deleted",
          classes: "#d32f2f red darken-2",
        });
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <Container>
      <h3>Customers</h3>
      <Row>
        <Col md={{ span: 1, offset: 11 }}>
          <LinkContainer to={`/createcustomer`}>
            <Button variant="success" className="btn-sm align">
              <i className="fas fa-plus"></i>
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>
                  <a
                    style={{ "text-decoration": "none", "color": "white" }}
                    href={`mailto:${customer.email}`}
                  >
                    {customer.email}
                  </a>
                </td>
                <td>{customer.phone}</td>
                <td>
                  <LinkContainer
                    to={`/${customer._id}/editcustomer`}
                    state={{ customer }}
                  >
                    <Button variant="dark" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm ml-2 mr-2"
                    onClick={() => deleteCustomer(customer._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                  <LinkContainer to={`/${customer._id}/mybookings`}>
                    <Button variant="dark" className="btn-sm">
                      Bookings
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default CustomerScreen;
