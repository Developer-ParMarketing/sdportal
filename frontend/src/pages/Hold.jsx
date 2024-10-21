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
        <div
          className="maindiv"
          style={{
            padding: "20px",
            background: "#f8f9fa",
          }}
        >
          <div
            className="card mx-auto shadow border-0"
            style={{
              maxWidth: "600px",
              borderRadius: "15px",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <div
              className="card-body text-center"
              style={{
                padding: "20px",
              }}
            >
              <h2
                className="card-title text-danger"
                style={{
                  fontSize: "2rem",
                  marginBottom: "10px",
                }}
              >
                🎉 Great News!
              </h2>
              <p
                className="card-text"
                style={{
                  fontSize: "1.2rem",
                  margin: "20px 0",
                }}
              >
                Thank You for Enrolling in Our DMP
              </p>
              <p
                className="card-text"
                style={{
                  fontSize: "1rem",
                  margin: "20px 0",
                }}
              >
                Thank you for enrolling in our <strong>Debt Management Plan (DMP)</strong> to
                begin your journey towards becoming debt-free and improving your
                credit score.
              </p>
              <p
                className="card-text"
                style={{
                  fontSize: "1rem",
                  margin: "20px 0",
                }}
              >
                One of our financial advisors will contact you shortly from the
                number <strong>020 225678924</strong>. Please ensure you’re
                available to discuss your financial situation so we can guide
                you through the next steps.
              </p>
              <p
                className="card-text"
                style={{
                  fontSize: "1rem",
                  margin: "20px 0",
                }}
              >
                We’re here to support you every step of the way in achieving
                financial freedom!
              </p>

              {isPaymentLinkAvailable && (
                <>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1.2rem",
                      margin: "20px 0",
                    }}
                  >
                    Your DMP benefits are now ready to be activated. To start
                    enjoying the benefits, please make your first EMI payment
                    using the link below:
                  </p>

                  <a
                    href={paymentLink} // Use the actual payment link here
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

                  <p
                    className="text-muted"
                    style={{
                      fontSize: "0.9rem",
                      margin: "10px 0",
                    }}
                  >
                    This link is valid for <strong>12 hours</strong>, so please
                    complete your setup before it expires.
                  </p>
                </>
              )}

              <p
                className="text-muted"
                style={{
                  fontSize: "0.9rem",
                  margin: "10px 0",
                }}
              >
                If you have any questions, we’re here to help!{" "}
                <strong>Call us at 020 225678924</strong> between{" "}
                <strong>9 AM and 7 PM, Monday to Saturday</strong>, or access
                live support.
              </p>

              <footer
                style={{
                  marginTop: "20px",
                  fontSize: "1rem",
                }}
              >
                <strong className="card-title text-danger">Thank you!</strong>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 100%;
          padding-left: 15px;
          padding-right: 15px;
        }

        .card {
          max-width: 100%;
        }

        @media (max-width: 576px) {
          .card-body {
            padding: 15px;
          }

          .card-title {
            font-size: 1.6rem;
          }

          .card-text {
            font-size: 0.9rem;
          }

          .btn-lg {
            padding: 8px 20px;
            font-size: 1rem;
          }
        }

        @media (min-width: 577px) and (max-width: 768px) {
          .card-body {
            padding: 20px;
          }

          .card-title {
            font-size: 1.8rem;
          }

          .card-text {
            font-size: 1rem;
          }

          .btn-lg {
            padding: 10px 25px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Hold;
