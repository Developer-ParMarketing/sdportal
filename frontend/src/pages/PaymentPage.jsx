import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, getToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Fetch the data from location or localStorage
  const {
    title: passedTitle,
    emi: passedEmi,
    oneTimeFee: passedOneTimeFee,
    calculatedEMI: passedCalculatedEMI,
  } = location.state || {
    title: localStorage.getItem("selectedPlan"),
    emi: localStorage.getItem("monthlyEmi"),
    oneTimeFee: localStorage.getItem("enrollmentFee"),
  };

  const [title, setTitle] = useState(passedTitle || "Please Select Your Plan");
  const [emi, setEmi] = useState(passedEmi || "Please Select Your Plan");
  const [oneTimeFee, setOneTimeFee] = useState(passedOneTimeFee || "Please Select Your Plan");
  const [calculatedEMI, setCalculatedEMIe] = useState(passedCalculatedEMI || "Please Select Your Plan");

  useEffect(() => {
    console.log("Passed title:", passedTitle);
    console.log("Passed EMI:", passedEmi);
    console.log("Passed One-Time Fee:", passedOneTimeFee);
  
    const paymentStatus = localStorage.getItem("paymentStatus");
    if (paymentStatus === "completed") {
      setIsEnrolled(true);
      const currentPlan = JSON.parse(localStorage.getItem("currentPlan"));
      if (currentPlan) {
        setTitle(currentPlan.title);
        setEmi(currentPlan.emi);
        setOneTimeFee(currentPlan.oneTimeFee);
        setCalculatedEMIe(currentPlan.calculatedEMI);

      }
    }
  
    if (passedTitle) localStorage.setItem("selectedPlan", passedTitle);
    if (passedEmi) localStorage.setItem("monthlyEmi", passedEmi);
    if (passedOneTimeFee) localStorage.setItem("enrollmentFee", passedOneTimeFee);
  }, [passedTitle, passedEmi, passedOneTimeFee]);
  
  // Function to handle payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://enroll.singledebt.in/api/payment/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: oneTimeFee,
          currency: "INR",
        }),
      });

      const orderData = await response.json();
      if (!orderData.id) throw new Error("Failed to create Razorpay order");

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Singledebt",
        description: `Payment for ${title}`,
        order_id: orderData.id,
        handler: handlePaymentSuccess,
        modal: {
          ondismiss: () => {
            alert("Payment was cancelled.");
            setLoading(false);
          },
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    // alert("Payment successful! Payment ID: " + response.razorpay_payment_id);

    // Store payment status and plan details
    localStorage.setItem("paymentStatus", "completed");
    localStorage.setItem("currentPlan", JSON.stringify({
      title: title,
      emi: emi,
      oneTimeFee: oneTimeFee,
    }));

    // Update payment status in Zoho CRM
    try {
      const token = await getToken();
      await updatePaymentStatusInZoho(response.razorpay_payment_id, token);
    } catch (error) {
      console.error("Error updating payment status in Zoho:", error);
    }

    // Redirect to Thank You page

    toast.success(`Payment successful! Payment ID: " + ${response.razorpay_payment_id}`, {
      position: "top-right", // You can choose other positions like "top-left", "bottom-right", etc.
      autoClose: 3000, // Time in milliseconds before the toast automatically closes
      hideProgressBar: false, // Show/hide progress bar
      closeOnClick: true, // Close toast on click
      pauseOnHover: true, // Pause on hover
      draggable: true, // Allow dragging
      draggablePercent: 60, // Dragging distance percentage
      progress: undefined, // Custom progress
    });
    setIsEnrolled(true);
    navigate("/hold");
  };

  const updatePaymentStatusInZoho = async (paymentId, token) => {
    const recordId = "REPLACE_WITH_RECORD_ID"; // Replace this with the correct record ID

    try {
      const response = await fetch(`${url}/crm/v2/Leads/${recordId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Zoho-oauthtoken ${token}`,
        },
        body: JSON.stringify({
          data: [
            {
              id: recordId,
              Payment_Status: "Completed",
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed to update payment status in Zoho");
      console.log("Payment status updated in Zoho successfully");
    } catch (error) {
      console.error("Error updating Zoho:", error);
    }
  };

  return (
    <>
      <Usernavbar />
      <div className="">
        <div className="container p-2 py-4">
          {/* <div className="bg text-center">
            <div className="herotext">
              <h1>Hi! I'm Shweta</h1>
              <p>Your specialist lawyer in harassment and debt matters</p>
            </div>
            <div className="image-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Illustration representing progress"
                className="img-fluid"
              />
            </div>
          </div> */}
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Join us today for just ₹599 and begin your journey!"}
        />
          <h1 style={{}} className="maindiv">
            Get Started Today for Just {oneTimeFee}!
          </h1>
          <ul className=" list-unstyled pt-4">
            <li className="d-flex align-items-center mb-2">
              <MdCheckCircle
                className="text-success me-2"
                style={{ fontSize: "1.5rem", width: "30px" }}
              />
              <span style={{ flex: 1, fontSize: "1rem" }}>
                Achieve debt freedom within {passedTitle} months.
              </span>
            </li>
            <li className="d-flex align-items-center mb-2">
              <MdCheckCircle
                className="text-success me-2"
                style={{ fontSize: "1.5rem", width: "30px" }}
              />
              <span style={{ flex: 1, fontSize: "1rem" }}>
                Enjoy affordable EMIs—pay only <strong>{emi}</strong> per month,
                saving <strong>₹XXX</strong> compared to your original EMI
                payments.
              </span>
            </li>
            <li className="d-flex align-items-center mb-2">
              <MdCheckCircle
                className="text-success me-2"
                style={{ fontSize: "1.5rem", width: "30px" }}
              />
              <span style={{ flex: 1, fontSize: "1rem" }}>
                Say goodbye to creditor harassment and regain peace of mind.
              </span>
            </li>
            <li className="d-flex align-items-center">
              <MdCheckCircle
                className="text-success me-2"
                style={{ fontSize: "1.5rem", width: "30px" }}
              />
              <span style={{ flex: 1, fontSize: "1rem" }}>
                Start improving your credit score and be ready to access future
                loans.
              </span>
            </li>
          </ul>
          <div
            className="container mt-5"
            style={{
              background: "linear-gradient(to right, #ff866a, #ff4865)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <ul
              className="text-white"
              style={{ listStyle: "none", padding: 0 }}
            >
              {/* Adjusting the width of the list items */}
              <li
                className="d-flex align-items-center mb-3 p-2"
                style={{
                  maxWidth: "400px", // Set a maximum width
                  margin: "0 auto", // Center the list item
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <p
                  className="me-2"
                  style={{ width: "50%", fontWeight: "bold" }}
                >
                  Selected Plan:
                </p>
                <span style={{ flex: 1, fontSize: "1rem", textAlign: "right" }}>
                  {title || "Please Select Your Plan"} Months{" "}
                  {/* Ensure data is always displayed */}
                </span>
              </li>
              <li
                className="d-flex align-items-center mb-3 p-2"
                style={{
                  maxWidth: "400px",
                  margin: "0 auto",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <p
                  className="me-2"
                  style={{ width: "50%", fontWeight: "bold" }}
                >
                  Monthly EMI:
                </p>
                <span style={{ flex: 1, fontSize: "1rem", textAlign: "right" }}>
                  {emi || "Please Select Your Plan"}
                </span>
              </li>
              <li
                className="d-flex align-items-center mb-3 p-2"
                style={{
                  maxWidth: "400px",
                  margin: "0 auto",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <p
                  className="me-2"
                  style={{ width: "50%", fontWeight: "bold" }}
                >
                  Enrollment Fee:
                </p>
                <span style={{ flex: 1, fontSize: "1rem", textAlign: "right" }}>
                ₹{oneTimeFee || "Please Select Your Plan"}
                </span>
              </li>
            </ul>

            <div>
              {isEnrolled ? (
                <button
                  disabled
                  style={{
                    background: "#ccc",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    fontSize: "1rem",
                    cursor: "not-allowed",
                    display: "block",
                    margin: "20px auto",
                  }}
                >
                  You are already enrolled
                </button>
              ) : (
                <Link
                  to="#"
                  onClick={handlePayment}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      background: "#ff4865",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      display: "block",
                      margin: "20px auto",
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#ff866a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#ff4865")
                    }
                  >
                    Enroll now for only ₹{oneTimeFee || "Please Select Your Plan"}
                  </button>
                </Link>
              )}
            </div>




          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
