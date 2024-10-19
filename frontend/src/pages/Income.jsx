import React, { useEffect, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Usernavbar from '../components/Usernavbar';
import Hishweta from '../components/Hishweta';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const Income = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalIncome = incomeRef.current.value;
        const monthlyExpenses = expensesRef.current.value;

        // Combine the existing form data with the new data
        const combinedData = {
            ...formData,
            totalIncome,
            monthlyExpenses,
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

        // Navigate to the Description page with combined data
        navigate("/description", { state: combinedData });
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
                            type="text"
                            placeholder="Total Income per month"
                            style={inputStyle}
                            ref={incomeRef} 
                            required
                        />
                        <input
                            type="text"
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
