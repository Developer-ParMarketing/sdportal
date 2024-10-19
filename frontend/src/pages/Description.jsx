import React from "react";
import Usernavbar from "../components/Usernavbar";
import CardCarousel from "../components/CardCarousel ";
import debtsol from "../assets/images/Imgfive.png";
import Hishweta from "../components/Hishweta";
import { useLocation, useNavigate } from "react-router-dom";
const Description = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    totalIncome,
    monthlyExpenses,
    unsecuredCreditors,
    totalDebts,
    totalEMI,
    harassmentType,
    legalAction,
  } = location.state || {};

  const handleNavigateToPayment = () => {
    navigate("/payment", {
      state: {
        totalIncome,
        monthlyExpenses,
        unsecuredCreditors,
        totalDebts,
        totalEMI,
        harassmentType,
        legalAction,
      },
    });
  };

  const headerStyle = {
    textAlign: "center",
    color: "red",
  };

  const cardContent = [
    {
      title: "1 Debt Solution",
      text: "It’s looking good, We’ve found 4 debt and 2 harassment solutions that match your profile based on the information you have provided.",
      imgSrc: debtsol,
      imgAlt: "Debt Solutions",
    },
    {
      title: "2 Debt Management Plan",
      text: "Our lawyers will negotiate with all your creditors a structured repayment plan that consolidates all unsecured debts into a single monthly payment. Manage payments on your behalf to ensure consistent and timely repayment, so that your credit score will start to increase as you stay on the plan.",
    },
    {
      title: "3 Harassment Solutions",
      text: "We’ll handle all calls for you, prevent creditors from contacting your friends and family, stop unannounced visits, and provide complete legal support, including responding to notices and attending hearings.",
      subTitles: [
        {
          title1: "Shield from Creditor Calls",
          text1: "We protect you from aggressive creditor calls.",
          additionalData1:
            "You will receive legal support to handle all calls.",
          title2: "Full Legal Coverage",
          text2: "Comprehensive legal protection against harassment.",
          additionalData2: "Includes representation in court if necessary.",
        },
      ],
    },
    {
      title: "Our Fees",
      text: "We believe in flexible pricing based on your affordability. Instead of a fixed fee, we charge the equivalent of your first two months' EMIs for establishing the DMP with all your creditors, handled by our team of lawyers. This fee can be spread out over the course of your DMP.",
    },
  ];

  return (
    <>
      <Usernavbar />
      <div className="container p-2 py-4">
        {/* <div className="bg">
          <div className="herotext">
            <h1>Hi! I'm Shweta</h1>
            <p>Your specialist lawyer in harassment and debt matters</p>
          </div>
          <div className="image-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Illustration representing progress"
            />
          </div>
        </div> */}
       <Hishweta
          heading={"Hi! I'm Shweta"}
          paragraph={"Your specialist lawyer in harassment and debt matters"}
        />
        <div className="maindiv">
          <h1 style={headerStyle}>Harassment and Debt Solutions</h1>

          <div className="container py-4 ">
            <div className="row justify-content-center">
              {cardContent.map((item, index) => (
                <div key={index} className="col-12 mb-4 position-relative">
                  <div className="shadow-lg border-0 rounded-lg overflow-hidden bg-light">
                    <div className="p-4 text-center">
                      <h2
                        className="mb-3"
                        style={{
                          color: "#d9534f",
                          fontSize: "28px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.title}
                      </h2>
                      <div className="d-flex flex-column align-items-center mb-4">
                        {item.imgSrc && (
                          <img
                            src={item.imgSrc}
                            alt={item.imgAlt}
                            className="img-fluid mb-3"
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                              // borderRadius: "50%",
                              // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                        )}
                        <p
                          className="text-muted"
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "bold",
                            maxWidth: "90%",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                      {item.subTitles &&
  item.subTitles.map((subItem, subIndex) => (
    <div key={subIndex} className="mb-3">
      <div className="d-flex justify-content-between mb-3 flex-column flex-md-row">
        <div
          style={{ flex: 1, marginRight: "10px" }}
          className="text-center text-md-right"
        >
          <h4
            style={{
              color: "#d9534f",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            {subItem.title1}
          </h4>
          <p
            className="text-muted text-center text-md-left"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {subItem.text1}
          </p>
          <p
            className="text-muted text-center text-md-left"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {subItem.additionalData1}
          </p>
        </div>
        <div
          style={{ flex: 1, marginLeft: "10px" }}
          className="text-center text-md-left"
        >
          <h4
            style={{
              color: "#d9534f",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            {subItem.title2}
          </h4>
          <p
            className="text-muted text-center text-md-left"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {subItem.text2}
          </p>
          <p
            className="text-muted text-center text-md-left"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {subItem.additionalData2}
          </p>
        </div>
      </div>
    </div>
  ))}

                    </div>
                  </div>
                  {index < cardContent.length - 1 && (
                    <div
                      className="timeline-connector"
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "100%",
                        width: "4px",
                        height: "40px",
                        backgroundColor: "#ccc",
                        transform: "translateX(-50%)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* cards */}
          <CardCarousel unsecured={totalDebts} />
          {/* <button onClick={handleNavigateToPayment}>Go to Payment</button> */}
        </div>
      </div>
    </>
  );
};

export default Description;
