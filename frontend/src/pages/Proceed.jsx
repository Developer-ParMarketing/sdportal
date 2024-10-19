import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import { useHistory } from "react-router-dom";

import { toast } from 'react-toastify';





const Proceed = () => {
  const navigate = useNavigate();
  const unsecuredCreditorsRef = useRef();
  const totalDebtsRef = useRef();
  const totalEMIRef = useRef();
  const harassmentTypeRef = useRef();
  const legalActionRef = useRef();

  // const history = useHistory();

  const headerStyle = {
    textAlign: "center",
    color: "red", // Darker color for better contrast
    fontWeight: "bold",
  };

  const mainDivStyle = {
    backgroundColor: "#ffffff", // White background for contrast
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Slightly stronger shadow
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto", // Center align the main div
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  };

  const inputStyle = {
    padding: "12px",
    border: "1px solid red",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
    backgroundColor: "#f9f9f9", // Light grey for inputs
  };

  const buttonStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontWeight: "bold",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3", // Darker blue on hover
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      unsecuredCreditors: unsecuredCreditorsRef.current.value,
      totalDebts: totalDebtsRef.current.value,
      totalEMI: totalEMIRef.current.value,
      harassmentType: harassmentTypeRef.current.value,
      legalAction: legalActionRef.current.value,
    };

    toast.success("Form submitted successfully!", {
      position: "top-right", // You can choose other positions like "top-left", "bottom-right", etc.
      autoClose: 3000, // Time in milliseconds before the toast automatically closes
      hideProgressBar: false, // Show/hide progress bar
      closeOnClick: true, // Close toast on click
      pauseOnHover: true, // Pause on hover
      draggable: true, // Allow dragging
      draggablePercent: 60, // Dragging distance percentage
      progress: undefined, // Custom progress
    });
    
    // Navigate to the Income page and pass the form data
    navigate("/income-and-expense", { state: formData });
  };

  const harassmentOptions = [
    { label: "Select type of harassment" },
    { label: "Phone Harassment", value: "phone" },
    { label: "Physical Harassment", value: "physical" },
    { label: "Emotional Harassment", value: "emotional" },
    { label: "Repeated Messages", value: "messages" },
    { label: "Unannounced Visits", value: "visits" },
    { label: "Other", value: "other" },
  ];

  const legalActionOptions = [
    { label: "Select type of legal action" },
    { label: "File Complaint", value: "complaint" },
    { label: "Seek Legal Counsel", value: "counsel" },
    { label: "Proceed to Court", value: "court" },
    { label: "Settlement Negotiation", value: "settlement" },
    { label: "Legal Notices", value: "legal_notices" },
    { label: "Arbitration", value: "arbitration" },
    { label: "Bounced Cheques", value: "bounced_cheques" },
    { label: "Court Hearings", value: "court_hearings" },
  ];

  return (
    <>
      <Usernavbar />
      <div className="container p-2 py-4 ">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />
        <div className="maindiv " style={mainDivStyle}>
          <h1 style={headerStyle} className="mt-4">
            Your Unsecured Debts & Type of Harassment
          </h1>
          <form style={formStyle} onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Number of unsecured creditors"
              style={inputStyle}
              ref={unsecuredCreditorsRef}
              required
            />
            <input
              type="number"
              placeholder="Total unsecured debts"
              style={inputStyle}
              ref={totalDebtsRef}
              required
            />
            <input
              type="number"
              placeholder="Total EMI for unsecured debts"
              style={inputStyle}
              ref={totalEMIRef}
              required
            />
            <select style={inputStyle} ref={harassmentTypeRef} required>
              {/* <option value="" disabled>
                Select type of harassment
              </option> */}
              {harassmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select style={inputStyle} ref={legalActionRef} required>
              {/* <option value="" disabled>
                Select type of legal action
              </option> */}
              {legalActionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/*  */}

            {/*  */}
            <button type="submit" className="procBtn" style={buttonStyle}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Proceed;
