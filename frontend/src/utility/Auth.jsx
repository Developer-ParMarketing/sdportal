import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to check the current path
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const Auth = ({ Component }) => {
  const { url, user, setUser, getToken } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route
  const [error, setError] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const authenticate = async () => {
    const sdUser = JSON.parse(localStorage.getItem("sdUser"));
    const paymentStatus = localStorage.getItem("paymentStatus");
    const termsAccepted = localStorage.getItem("termsAccepted");

    // Restrict access to the homepage ("/") if payment is not completed
    if (!sdUser) {
      // If user is not logged in, redirect to login
      navigate("/login", { replace: true });
      return;
    }

    if (!termsAccepted && location.pathname === "/payment") {
      navigate("/termsconditions", { replace: true });
      return;
    }
    // Check if the user is trying to access the homepage ("/")
    if (location.pathname === "/" && paymentStatus !== "completed") {
      // If payment is not completed, redirect to the payment page
      navigate("/payment", { replace: true });
      return;
    }

    try {
      let token = await getToken();
      if (!token) {
        // If token is not found, generate a new one
        const createToken = await axios.get(`${url}/token/generate`);
        token = createToken.data.token[0].token;
      }

      // Fetch user details with the token
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
          if (details[key] === null) details[key] = "";
        }
        setUser(details);
        setLoading(false); // Stop loading once user data is set
      } else if (res.status === 401) {
        setError("Token expired. Please try again after sometime.");
        setLoading(false);
      } else if (res.status === 204) {
        setError("Account not found");
        setErrorStatus(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("Token expired. Please try again after sometime.");
      setLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    authenticate();
  }, [location.pathname]); // Make sure to re-run this logic on route change

  const differentAccount = () => {
    localStorage.removeItem("sdUser");
    localStorage.removeItem("paymentStatus");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <Loading />; // Show loading indicator while authenticating
  }

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

  return user ? <Component /> : <Loading />;
};

export default Auth;
