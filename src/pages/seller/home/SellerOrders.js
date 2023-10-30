import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function SellerOrders() {
  const [sellerOrders, setSellerOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sellers/orders", {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });

        if (response.ok) {
          const ordersData = await response.json();
          setSellerOrders(ordersData);
        } else {
          console.error("Failed to fetch seller orders");
        }
      } catch (error) {
        console.error("Error fetching seller orders", error);
      }
    };
    fetchSellerOrders();
  }, [token]);

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Seller Orders</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        {sellerOrders.map((order) => (
          <Col md={6} key={order._id}>
            <Card>
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>
                  User: {order.userId.name}
                  <br />
                  Email: {order.userId.email}
                  <br />
                  Products:
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.product._id}>
                        {product.product.title} - ${product.product.discountedPrice}
                      </li>
                    ))}
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SellerOrders;
