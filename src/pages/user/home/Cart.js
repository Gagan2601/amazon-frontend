import React, { useState, useEffect } from "react";
import { Container, Card, Button, ListGroup } from "react-bootstrap";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCartData(token);
    }
  }, []);

  const fetchCartData = async (token) => {
    try {
      const apiUrl = "http://localhost:5000/api/cart";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });

      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData.items.slice(1));
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:5000/api/remove-from-cart/${productId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.ok) {
        fetchCartData(token);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <Container>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <Card key={item._id} className="mb-3">
          <Card.Body>
            <Card.Title>{item.product.title}</Card.Title>
            <Card.Text>Price: ${item.product.discountedPrice}</Card.Text>
            <Card.Text>Quantity: {item.quantity}</Card.Text>
            <Card.Text>
              Total: ${item.quantity * item.product.discountedPrice}
            </Card.Text>
            <Button variant="primary" className="mr-2">
              Buy Now
            </Button>
            <Button
              variant="danger"
              onClick={() => removeFromCart(item.product._id)}
            >
              Remove from Cart
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Cart;
