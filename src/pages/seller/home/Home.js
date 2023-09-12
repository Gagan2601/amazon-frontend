import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function SellerHomePage({ data }) {
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Welcome, Seller!</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Add Product</Card.Title>
              <Card.Text>
                Click here to add a new product to your store.
              </Card.Text>
              <Link to="/seller/add-product">
                <Button variant="primary">Add Product</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Get Products</Card.Title>
              <Card.Text>View and manage your existing products.</Card.Text>
              <Link to="/seller/products">
                <Button variant="primary">Get Products</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Account</Card.Title>
              <Card.Text>Manage your seller account settings.</Card.Text>
              <Link to={`/seller/account/${data.entity._id}`}>
                <Button variant="primary">Account</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Save Address</Card.Title>
              <Card.Text>Update your shipping address information.</Card.Text>
              <Link to={`/seller/save-address`}>
                <Button variant="primary">Save Address</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerHomePage;
