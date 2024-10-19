import React, { useEffect } from "react";
import Hishweta from "../components/Hishweta";
import Usernavbar from "../components/Usernavbar";
import "aos/dist/aos.css"; // Import AOS CSS
import AOS from "aos"; // Import AOS Library
import {
  Imgone,
  Imgtwo,
  Imgthree,
  Imgfour,
  Imgfive,
  Imgsix,
} from "../assets/images/index";
import { useLocation, useNavigate } from "react-router-dom";

const Offer = () => {
  const location = useLocation(); // Get the current location and data passed from the Card component
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Retrieve data from location state or localStorage as fallback
  const { title, emi, oneTimeFee } = location.state || {};
  const calculatedEMI = localStorage.getItem("calculatedEMI");
  const subscription = localStorage.getItem("subscription");
  const totalbil = localStorage.getItem("totalbil");

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with 1s duration
  }, []);

  // Styles for the component
  const headerStyle = {
    textAlign: "center",
    color: "#e74c3c",
    fontSize: "2.5rem",
    marginBottom: "30px",
    fontWeight: "bold",
  };

  const mainDivStyle = {
    backgroundColor: "#f9f9f9",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
  };

  const offerCardStyle = {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardFrontStyle = {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "400px",
    padding: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
  };

  const offerImageContainerStyle = {
    height: "150px",
    overflow: "hidden",
  };

  const offerTitleStyle = {
    fontSize: "1.6rem",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "bold",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };

  const offerDescriptionStyle = {
    fontSize: "1rem",
    color: "#666",
    textAlign: "center",
    marginBottom: "15px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  };

  const offerImageStyle = {
    width: "100%",
    height: "auto",
    maxHeight: "120px",
    objectFit: "contain",
  };

  const buttonStyle = {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    display: "block",
    margin: "0 auto",
  };

  const offersData = [
    {
      title: "Boost Your Credit Score",
      description:
        "Enroll in our Debt Management Plan (DMP) to improve your credit score, without affecting your credit report like loan settlements do.",
      image: Imgone,
    },
    {
      title: "Access to Future Loans",
      description:
        "Completing your DMP strengthens your credit profile, making you eligible for future loans.",
      image: Imgtwo,
    },
    {
      title: "Shield from Creditor Harassment & Legal Protection",
      description:
        "We handle all creditor communications and legal matters, including harassment, notices, arbitration, and court representation, keeping you protected 24/7.",
      image: Imgfive,
    },
    {
      title: "Personalized Financial Support",
      description:
        "Get a dedicated relationship manager for customized budgeting and financial advice.",
      image: Imgthree,
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your payment progress in real time through our app and online portal.",
      image: Imgsix,
    },
  ];

  // Handler to navigate to the payment page
  const handleContinue = () => {
    navigate("/payment", {
      state: {
        title,
        calculatedEMI,
        subscription,
        oneTimeFee,
        totalbil,
        emi,
      },
    });
  };

  return (
    <>
      <Usernavbar />
      <div className="container py-4">
        <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Explore the Benefits You'll Gain with Our App"}
        />
        <div className="maindiv" style={mainDivStyle}>
          <h1 style={headerStyle}>OFFERS</h1>

          <div className="offers-grid ">
            {offersData.map((offer, index) => (
              <div
                key={index}
                className="offer-card"
                style={offerCardStyle}
                data-aos="fade-up"
              >
                <div style={cardFrontStyle}>
                  <div style={offerImageContainerStyle}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      style={offerImageStyle}
                    />
                  </div>
                  <h2 style={offerTitleStyle} className="text-danger">
                    {offer.title}
                  </h2>
                  <p style={offerDescriptionStyle}>{offer.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto">
            {/* <div style={{ marginBottom: "20px", textAlign: "center" }}>
              {title && <h2>{title} Months Plan</h2>}
              {emi && <p>Monthly EMI: {emi}</p>}
              {oneTimeFee && <p>One Time Fee: ₹{oneTimeFee}</p>}
            </div> */}

            <button style={buttonStyle} onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Additional CSS */}
      <style jsx>{`
        .offers-grid {
          display: flex;
          flex-wrap: wrap; /* Allow wrapping to the next line */
          justify-content: center; /* Center the items in the container */
          gap: 30px;
        }

        .offer-card {
          flex: 1 1 300px; /* Flex-grow and flex-shrink with a minimum size of 300px */
          max-width: 300px; /* Ensure cards don’t stretch too wide */
        }

        @media (max-width: 768px) {
          .offers-grid {
            justify-content: center; /* Ensure the cards are centered on smaller screens */
          }

          .offer-card {
            flex: 1 1 100%; /* Full width on smaller screens */
          }

          h1 {
            font-size: 1.8rem;
          }

          .offer-card h2 {
            font-size: 1.5rem;
            margin-bottom: 5px;
          }

          .offer-card p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Offer;
