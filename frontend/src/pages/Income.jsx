import React, { useContext, useEffect, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Usernavbar from '../components/Usernavbar';
import Hishweta from '../components/Hishweta';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Income = () => {
    const { url, user, getToken } = useContext(AppContext);
 
    const location = useLocation();
    const navigate = useNavigate();

    const formData = location.state;

    const incomeRef = useRef();
    const expensesRef = useRef();

    const mainDivStyle = {
        backgroundColor: "#ffffff", // White background for contrast
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow for depth
        textAlign: "center",
        maxWidth: "600px",
        margin: "auto", // Center the main div
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        marginTop: '20px', // Space between heading and form
    };

    const inputStyle = {
        padding: '12px',
        border: '1px solid red', // Border color for emphasis
        borderRadius: '8px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s',
        backgroundColor: '#f9f9f9', // Light grey for inputs
    };

    const headerStyle = {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
    };

    const buttonStyle = {
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontWeight: 'bold',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Retrieve the values from your refs
        const totalIncome = incomeRef.current.value;
        const monthlyExpenses = expensesRef.current.value;
    
        // Prepare the form data to be sent to the Zoho API
        const combinedData =  [
                {
                    Income: totalIncome, // Assuming this corresponds to the total income
                    Expenses: monthlyExpenses,
                    Step: 2, // Make sure to set the correct step for this API call
                }
            ]
       
    
        try {
            const token = await getToken(); 
            const recordId = localStorage.getItem('recordId'); 
    
            console.log(recordId);
            console.log(token);
            
            // Make the PUT request to update data in Zoho CRM
            const response = await axios.put(
                `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${recordId}`,
                combinedData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Zoho-oauthtoken ${token}`,
                    },
                }
            );
    
            // Check the response for success
            if (response.data.data[0].code === "SUCCESS") {
                toast.success("Data updated successfully!");
                navigate('/description'); // Navigate to the Description page
            }
        } catch (error) {
            console.error("Error updating data:", error);
            toast.error("Failed to update data.");
        }
    };
    

  
    return (
        <>
            <Usernavbar />
            <div className="container p-2 py-4">
            <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        /> 
           
                <div className="maindiv" style={mainDivStyle}>
                    <h1 style={headerStyle} className="mt-4">Your Income & Expenses</h1>
                    <form style={formStyle} onSubmit={handleSubmit}>
                        <input
                            type="number"
                            placeholder="Total Income per month"
                            style={inputStyle}
                            ref={incomeRef} 
                            required
                        />
                        <input
                            type="number"
                            placeholder="Total monthly expenses for daily needs"
                            style={inputStyle}
                            ref={expensesRef} 
                            required
                        />
                        <button type="submit" className="procBtn" style={buttonStyle}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Income;
