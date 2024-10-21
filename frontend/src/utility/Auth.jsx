import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const Auth = ({ Component }) => {
  const { url, user, setUser, getToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);

  const authenticate = async () => {
    const sdUser = JSON.parse(localStorage.getItem("sdUser"));
    const paymentStatus = localStorage.getItem("paymentStatus");

    // Check if user is logged in
    if (!sdUser) {
      navigate("/login", { replace: true });
      return;
    } else if (window.location.pathname === "/" && paymentStatus !== "completed") {
      // If payment is not completed, redirect to the payment page
      navigate("/payment", { replace: true });
      return;
    }

    try {
      let token = await getToken();
      if (token === null) {
        const createToken = await axios.get(`${url}/token/generate`);
        token = createToken.data.token[0].token;
        await authenticate(); // Re-run authentication after generating a token
      } else {
        const res = await axios.get(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Phone_Number:equals:${sdUser}))`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );

        if (res.status === 200) {
          const details = res.data.data[0];
          for (const key in details) {
            if (details[key] === null) {
              details[key] = "";
            }
          }
          setUser(details);
        } else if (res.status === 401) {
          setError("Token expired. Please try again after sometime.");
        } else if (res.status === 204) {
          setError("Account not found");
          setErrorStatus(true);
        }
      }
    } catch (error) {
      console.error(error);
      setError("Token expired. Please try again after sometime.");
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const differentAccount = () => {
    localStorage.removeItem("sdUser");
    localStorage.removeItem("paymentStatus");
    navigate("/login", { replace: true });
  };

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-between gap-2 py-4">
        <p>{error}</p>
        {errorStatus && (
          <button className="button" onClick={differentAccount}>
            Login with different account
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {user ? (
        <Component />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Auth;
