import React from "react";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import "../assets/css/encouragement.css";

const Hold = () => {
  const paymentLink = "https://your-payment-link.com"; // Replace with your actual payment link
  const isPaymentLinkAvailable = true; // Replace this with the actual condition

  return (
    <>
      <Usernavbar />
      <div className="container py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />
      <div className="maindiv" style={{ padding: "20px", background: "#f8f9fa" }}>
  <div
    className="card mx-auto shadow border-0"
    style={{
      maxWidth: "600px",
      borderRadius: "15px",
      overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s",
    }}
  >
    <div className="card-body text-center" style={{ padding: "20px" }}>
      <h2 className="card-title text-danger" style={{ fontSize: "2rem", marginBottom: "10px" }}>
        🎉 Great News!
      </h2>
      <p className="card-text" style={{ fontSize: "1.2rem", margin: "20px 0" }}>
        Your DMP benefits are now ready to be activated. To start enjoying the benefits, please make your first EMI payment using the link below:
      </p>

      <a
        href="your-payment-link-here" // Replace with actual payment link
        className="btn btn-danger btn-lg"
        style={{
          borderRadius: "20px",
          padding: "10px 30px",
          fontSize: "1.2rem",
          margin: "15px 0",
        }}
      >
        Make EMI Payment
      </a>

      <p className="text-muted" style={{ fontSize: "0.9rem", margin: "10px 0" }}>
        This link is valid for 12 hours, so please complete your setup before it expires.
      </p>

      <p className="text-muted" style={{ fontSize: "0.9rem", margin: "10px 0" }}>
        If you have any questions, we’re here to help! Call us at 020 225678924 between 9 AM and 7 PM, Monday to Saturday, or access live support.
      </p>

      <footer style={{ marginTop: "20px", fontSize: "1rem" }}>
        Thank you!
      </footer>
    </div>
  </div>
</div>

      </div>
    </>
  );
};

export default Hold;

