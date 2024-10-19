import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const Card = ({ title, emi, fee, oneTimeFee, total, unsecured }) => {
  const calculatedEMI = unsecured
    ? parseFloat((unsecured / title).toFixed(2)) // If unsecured, calculate based on unsecured value and title
    : parseFloat(emi.replace(/[₹,]/g, "")) || 0; // If not, clean EMI of ₹ symbol and commas

  const subscription = (calculatedEMI * 0.2).toFixed(2); // Calculate 20% of EMI

  // Convert all relevant values to numbers and compute total
  const totalbil =
    calculatedEMI + parseFloat(subscription) + parseFloat(oneTimeFee || 0); // Calculate total by adding EMI, subscription, and one-time fee

  localStorage.setItem("calculatedEMI", calculatedEMI);
  localStorage.setItem("subscription", subscription);
  localStorage.setItem("totalbil", totalbil);
  return (
    <div
      className="card shadow-sm"
      style={{
        background: "linear-gradient(to right, #ff866a, #ff4865)",
        height: "380px",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <div
        className="card-body text-white d-flex flex-column align-items-center"
        style={{ padding: "1rem" }}
      >
        <h5
          className="card-title text-center"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {title} Months Plan
        </h5>
        <hr className="text-white w-100" style={{ margin: "0.5rem 0" }} />

        <div
          className="w-100 d-flex justify-content-between"
          style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
        >
          <span>Monthly EMI:</span>
          <strong>₹{calculatedEMI}</strong>
        </div>
        <div
          className="w-100 d-flex justify-content-between"
          style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
        >
          <span>Subscription:</span>
          <strong>₹{subscription}</strong>
        </div>
        {oneTimeFee && (
          <div
            className="w-100 d-flex justify-content-between"
            style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}
          >
            <span>One Time Fee:</span>
            <strong>₹{oneTimeFee}</strong>
          </div>
        )}

        <hr className="text-white w-100" style={{ margin: "0.5rem 0" }} />

        <div
          className="w-100 d-flex justify-content-between"
          style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0.5rem 0" }}
        >
          <span>Total:</span>
          <strong>₹{totalbil}</strong>
        </div>

        <Link
          to="/offer"
          state={{ title, emi, fee, oneTimeFee, total, calculatedEMI }}
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              background: "#ffff", // Example background color
              color: "#ff4865",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "bolder",
              cursor: "pointer",
              display: "block",
              margin: "20px auto", // Center the button
              transition: "background 0.3s", // Smooth transition for hover effect
            }}
            onMouseEnter={(e) => (
              (e.currentTarget.style.background = "#ff866a"),
              (e.currentTarget.style.color = "#fff"),
              (e.currentTarget.style.border = "2px solid #fff")
            )} // Lighter color on hover
            onMouseLeave={(e) => (
              (e.currentTarget.style.background = "#ffff"),
              (e.currentTarget.style.color = "#ff866a"),
              (e.currentTarget.style.border = "2px solid #ff866a")
            )} // Original color
          >
            Select Plan
          </button>
        </Link>
      </div>
    </div>
  );
};

const CardCarousel = ({ unsecured }) => {
  const cards = [
    {
      title: 12,
      emi: "₹41,667",
      fee: "₹8,333",
      oneTimeFee: 599,
      total: "₹50,599",
      unsecured: unsecured,
    },
    {
      title: 24,
      emi: "₹20,833",
      fee: "₹4,167",
      oneTimeFee: 599,
      total: "₹25,599",
      unsecured: unsecured,
    },
    {
      title: 36,
      emi: "₹13,889",
      fee: "₹2,778",
      oneTimeFee: 599,
      total: "₹17,266",
      unsecured: unsecured,
    },
    {
      title: 48,
      emi: "₹10,417",
      fee: "₹2,083",
      oneTimeFee: 599,
      total: null,
      unsecured: unsecured,
    },
  ];

  return (
    <div
      id="cardCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ margin: "2rem 0" }}
    >
      <div className="carousel-inner">
        <h1
          className=""
          style={{
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bolder",
            color: "red",
            textTransform: "capitalize",
          }}
        >
          select your affordable plan
        </h1>
        {cards.reduce((acc, card, index) => {
          if (index % 2 === 0) {
            acc.push(
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="row g-2">
                  {" "}
                  {/* Use g-2 for smaller gaps */}
                  <div className="col-12 col-md-6 d-flex justify-content-center">
                    {" "}
                    {/* Adjust for mobile */}
                    <Card {...card} />
                  </div>
                  {cards[index + 1] && (
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                      {" "}
                      {/* Adjust for mobile */}
                      <Card {...cards[index + 1]} />
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return acc;
        }, [])}
      </div>

      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {cards.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#cardCarousel"
            style={{ backgroundColor: "#ff4865", border: "2px solid white" }}
            data-bs-slide-to={Math.floor(index / 2)} // Adjust to show only two buttons
            className={
              index % 2 === 0 ? (index === 0 ? "active" : "") : "d-none"
            }
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${Math.floor(index / 2) + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
