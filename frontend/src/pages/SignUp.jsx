import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import whitelogo from "../assets/images/white logo.png";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import googleStore from "../assets/images/Google-Store.webp";
import appStore from "../assets/images/App-Store.webp";

const SignUp = () => {
  const [generated, setGenerated] = useState(false);
  //
  const [inputs, setInputs] = useState({
    mobile: "",
    otp: "",
    details: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //
  const navigate = useNavigate();
  const generateOTP = async () => {
    if (!inputs.mobile) {
      setMessage("Enter your mobile number");
    } else {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://msg.mtalkz.com/V2/http-api-sms.php?apikey=ZwNEGnllw1d6psrt&senderid=SGLDBT&number=${inputs.mobile}&message=Your%20secret%20One%20Time%20Password%20(OTP)%20is%20{OTP}.%20Keep%20it%20confidential%20for%20security%20reasons%2C%20and%20don%27t%20share%20it%20with%20anyone.%20SingleDebt&format=json`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.Status === "Success") {
          setGenerated(true);
          setInputs({
            ...inputs,
            details: res.data.Details,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  //
  const verifyOTP = async () => {
    if (!inputs.otp) {
      setMessage("Enter OTP");
    } else {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://msg.mtalkz.com/V2/http-verifysms-api.php?apikey=ZwNEGnllw1d6psrt&sessionid=${inputs.details}&otp=${inputs.otp}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.Status === "Success") {
          localStorage.setItem("sdUser", JSON.stringify(inputs.mobile));
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  //
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  return (
    <>
      <div className="login-page">
        <div className="left-part">
          <div className="inner-part">
            <Link to="/" className="logo">
              <img src={whitelogo} alt="logo" loading="lazy" />
            </Link>

            <div>
              <h2>Welcome to SingleDebt Portal</h2>
              <p>
                Where your financial journey begins towards a debt-free future
              </p>
            </div>

            <ul className="d-flex align-items-lg-center align-items-start justify-content-start flex-lg-row flex-column terms-list">
              <li>
                <Link to="/termsconditions">Term & Conditions</Link>
              </li>
              <li>
                <a href="https://singledebt.in/privacy-policy" target="_blank">
                  Privacy policy
                </a>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-part">
          <div className="inner-part">
            <div>
              <h2>Sign Up</h2>
              <p>Please Sign Up to your account</p>
            </div>
            <div className="login-form my-5">
              <div className="mb-3">
                <div className="form-control" style={{ border: "none" }}>
                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Name"
                      required
                      autoComplete="off"

                      value={inputs.name}
                   
                    />
                    <label htmlFor="mobile" className="form-label input-label">
                      Name
                    </label>
                  </div>

                 

                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="email"
                      required
                      autoComplete="off"
                     
                      value={inputs.email}
                     
                    />
                    <label
                      htmlFor="email"
                      className="form-label input-label"
                    >
                      Email
                    </label>
                  </div>

                  <div className="input-group">
                    <input
                      type="tel"
                      name="alternativeMobile"
                      className="form-input"
                      placeholder=" "
                      required
                      autoComplete="off"
                      disabled={generated}
                      value={inputs.alternativeMobile}
                      onChange={handleInputs}
                    />
                    <label
                      htmlFor="alternativeMobile"
                      className="form-label input-label"
                    >
                       Mobile No
                    </label>
                  </div>
                </div>

                {generated === true ? (
                  <p
                    className="text-end mt-1 fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => setGenerated(false)}
                  >
                    Wrong mobile number?
                  </p>
                ) : (
                  ""
                )}
              </div>
              {generated === true ? (
                <div className="form-control mb-3" style={{ border: "none" }}>
                  <input
                    type="number"
                    name="otp"
                    className="form-input"
                    placeholder="OTP"
                    required
                    autoComplete="off"
                    value={inputs.otp}
                    onChange={handleInputs}
                  />
                  <label htmlFor="otp" className="form-label input-label">
                    OTP
                  </label>
                </div>
              ) : (
                ""
              )}
              {message && <p className="text-danger">{message}</p>}
              <button
                className="button"
                style={{ justifyContent: loading ? "center" : "space-between" }}
                onClick={generated === false ? generateOTP : verifyOTP}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    {generated === false ? "Generate OTP" : "Login"}
                    <FaArrowRight />
                  </>
                )}
              </button>
              {generated === true ? (
                <p
                  className="text-end mt-1 fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setGenerated(false)}
                >
                  Regerate OTP
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="d-flex align-items-sm-center align-items-start justify-content-start gap-2 flex-sm-row flex-column">
              <a
                href="https://play.google.com/store/apps/details?id=com.singledebt&hl=en_IN"
                target="_blank"
                className="store-image"
              >
                <img src={googleStore} className="invert-image" alt="" />
              </a>
              <a
                href="https://apps.apple.com/in/app/singledebt/id6480590793"
                target="_blank"
                className="store-image"
              >
                <img src={appStore} className="invert-image" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
