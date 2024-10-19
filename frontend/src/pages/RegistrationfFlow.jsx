import React from "react";
import "../assets/css/registraionflow.css";
import { FaFileAlt } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import Usernavbar from "../components/Usernavbar";
import Shweta from '../assets/images/Advocate.jpg'
import Hishweta from "../components/Hishweta";


const RegistrationFlow = () => {
  return (
    <>
        <Usernavbar />
    <div className="container p-2 py-4">
    <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />
      <div className="maindiv1">
        {[
          {
            step: 1,
            icon: <FaFileAlt style={{ color: "gray", fontSize: "54px" }} />,
            title: "Share Your Debts and Type of Harassment",
            description:
              "Provide us with information about the type of harassment and your current debts. This helps us understand your situation and tailor the best legal and debt solution that fits your needs.",
          },
          {
            step: 2,
            icon: (
              <RiSecurePaymentFill
                style={{ color: "blue", fontSize: "54px" }}
              />
            ),
            title: "Outline your Income and Expenses",
            description:
              "Tell us about your income and monthly expenditures. This will allow us to assess your financial landscape and identify the best options for you.",
          },
          {
            step: 3,
            icon: (
              <MdVerifiedUser style={{ color: "green", fontSize: "54px" }} />
            ),
            title: "Harassment and Debt Solutions",
            description:
              "Based on the information you provide, we will present personalized solutions to stop harassments and debt designed to help you regain control and achieve financial stability.",
          },
        ].map(({ step, icon, title, description }) => (
          <div className="card">
            <div className="count" style={{color:'black',fontWeight:'bolder',fontSize:'26px'}}>{step}</div>
            <div className="stepcard">
              <div className="header">
                <div className="icon">{icon}</div>
                <div style={{fontSize: "20px" ,color:'red' ,fontWeight:'bold'}}>
                {title}
                </div>
              </div>
              <div className="py-3">{description}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="footer-text">
          Our solutions are tailored to help you become debt-free while
          improving your credit score, enabling you to qualify for new loans
          after successfully completing the debt management program (DMP).{" "}
        </p>
      </div>
      <Link to="/proceed" style={{display:'flex',justifyContent:'center'}}>
        
        <button className="procBtn">Proceed</button>
      </Link>
    </div>
    </>
  );
};

export default RegistrationFlow;
