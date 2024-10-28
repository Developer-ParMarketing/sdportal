
import React, { useContext, useRef } from "react";

import { useNavigate } from "react-router-dom";
import Usernavbar from "../components/Usernavbar";
import Hishweta from "../components/Hishweta";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Proceed = () => {
  const { url, user, getToken } = useContext(AppContext);
 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = [
      {
          No_Of_Loans: unsecuredCreditorsRef.current.value,
          Outstanding: totalDebtsRef.current.value,
          EMI_Payments: totalEMIRef.current.value,
          Harassment_Type: harassmentTypeRef.current.value,
          Legal_Status: legalActionRef.current.value,
          Step: 1,
      }
  ]

    try {
        const token = await getToken(); 
        const recordId = localStorage.getItem('recordId'); 
        console.log(recordId);
        console.log(token);
        
        
        const response = await axios.put(
            `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${recordId}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Zoho-oauthtoken ${token}`,
                },
            }
        );

        if (response.data.data[0].code === "SUCCESS") {
            toast.success("Data updated successfully!");
            navigate('/income-and-expense')
        }
    } catch (error) {
        console.error("Error updating data:", error);
        toast.error("Failed to update data.");
    }
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
            <select
              style={inputStyle}
              ref={harassmentTypeRef}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select type of harassment
              </option>
              {harassmentOptions
                .filter((option) => option.value) // Filter out the first placeholder option from the array
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>

            <select
              style={inputStyle}
              ref={legalActionRef}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select type of legal action
              </option>
              {legalActionOptions
                .filter((option) => option.value) // Filter out the first placeholder option from the array
                .map((option) => (
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
