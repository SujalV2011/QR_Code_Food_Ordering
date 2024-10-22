import React, { useContext, useState, useEffect } from "react";
import { Container, Table, Form, Button, Card } from "react-bootstrap";
import { CartContext } from "../../context/CartContext"; // Context for cart information
import axios from "axios"; // For making API requests
import "./TotalBill.css"; // Custom styles for this component
import NavBar from "./NavBar"; // Navigation bar component

const TotalBill = () => {
  const { orderSummary } = useContext(CartContext); // Keep this if needed for other purposes
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [totalBill, setTotalBill] = useState(null); // State for total bill data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

  // Fetch the total bill from the backend API
  useEffect(() => {
    const fetchTotalBill = async () => {
      try {
        const tableNumber = 5; // Default to table 1; can be made dynamic if needed
        const response = await axios.get(
          `http://localhost:5000/api/orders/${tableNumber}`
        );

        const itemsWithPrices = await Promise.all(
          response.data.items.map(async (item) => {
            try {
              // Fetch menu item details from the menuitems collection
              const menuItemResponse = await axios.get(
                `http://localhost:5000/api/menuitems/${item.name}`
              );

              // Get the price from the response
              const itemPrice = menuItemResponse.data.itemPrice; // Access itemPrice from your schema

              return {
                ...item,
                price: itemPrice,
                totalPrice: itemPrice * item.quantity,
              };
            } catch (error) {
              console.error(
                `Failed to fetch price for item ${item.name}: ${error}`
              );
              return { ...item, price: null, totalPrice: null };
            }
          })
        );

        setTotalBill({
          ...response.data,
          items: itemsWithPrices,
          totalAmount: itemsWithPrices.reduce(
            (sum, item) => sum + (item.totalPrice || 0),
            0
          ),
        });

        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError("Failed to fetch total bill");
        setLoading(false);
      }
    };

    fetchTotalBill();
  }, []);

  const handleProceedToPay = () => {
    const number = prompt("Please enter your 10-digit contact number:");

    if (number && number.length === 10) {
      setContactNumber(number);
      // Simulate sending OTP
      setOtpSent(true);
      alert("OTP has been sent to your contact number.");
    } else if (number) {
      alert("Please enter a valid 10-digit contact number.");
    } else {
      alert("Contact number is required.");
    }
  };

  const handleOtpVerification = () => {
    if (enteredOtp === otp) {
      alert("OTP verified. Proceeding to payment...");
      // Here you can add your payment processing logic
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleGenerateOtp = () => {
    // Simulate OTP generation
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    alert(`Your OTP is: ${generatedOtp}`);
  };

  if (loading) {
    return (
      <div>
        <NavBar title="La'RIVERA INN" />
        <Container>
          <h2>Total Bill</h2>
          <p>Loading...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar title="La'RIVERA INN" />
        <Container>
          <h2>Total Bill</h2>
          <p>{error}</p>
        </Container>
      </div>
    );
  }

  if (!totalBill) {
    return (
      <div>
        <NavBar title="La'RIVERA INN" />
        <Container>
          <h2>Total Bill</h2>
          <p>No order placed yet.</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <NavBar title="La'RIVERA INN" />
      <Container>
        <h2>Total Bill</h2>
        <p>Table Number: {totalBill.tableNumber}</p>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {totalBill.items.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.name} {item.option && `(${item.option})`} {/* Show selected option */}
                </td>
                <td>₹{item.price !== null ? item.price.toFixed(2) : "N/A"}</td>
                <td>{item.quantity}</td>
                <td>₹{item.totalPrice !== null ? item.totalPrice.toFixed(2) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end">
                Total:
              </td>
              <td>₹{totalBill.totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </Table>
        <div className="contact-container">
          <Card className="contact-box">
            <Card.Body>
              <Button
                variant="primary"
                onClick={handleProceedToPay}
                className="button w-100"
              >
                Proceed to Pay
              </Button>
              {otpSent && (
                <div className="otp-section mt-3">
                  <p>
                    An OTP has been sent to {contactNumber}. Please enter it
                    below:
                  </p>
                  <Button variant="secondary" onClick={handleGenerateOtp}>
                    Generate OTP
                  </Button>
                  <Form.Group controlId="otp" className="mt-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleOtpVerification}
                    className="button w-100 mt-3"
                  >
                    Verify OTP
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default TotalBill;
