import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import {
  FaEdit,
  FaFile,
  FaPhoneAlt,
  FaUserAlt,
  FaUserSecret,
} from "react-icons/fa";
import { VscLaw } from "react-icons/vsc";
import { MdPayment } from "react-icons/md";
import { MdOutlineRestartAlt } from "react-icons/md";
import AppBar from "../components/AppBar";

const Home = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      {user !== null ? (
        <>
            <AppBar />
          <div className="container p-2 pt-0">
            <ul className="links my-4">
              <li>
                <NavLink to="/userdetails" className="white-button">
                  <FaUserAlt />
                  Your details
                </NavLink>
              </li>
              <li>
                <NavLink to="/reportchange" className="white-button">
                  <FaEdit />
                  Report a change of circumstance
                </NavLink>
              </li>
              <li>
                <NavLink to="/advocatelawyer" className="white-button">
                  <VscLaw />
                  Advocate & Lawyers
                </NavLink>
              </li>
              <li>
                <NavLink to="/paralegal" className="white-button">
                  <FaPhoneAlt />
                  Paralegal - calls & harassments
                </NavLink>
              </li>
              <li>
                <NavLink to="/makepayment" className="white-button">
                  <MdPayment />
                  Make a payment
                </NavLink>
              </li>
              <li>
                <NavLink to="/accountmanager" className="white-button">
                  <FaUserSecret />
                  Contact details of your account manager, T&C
                </NavLink>
              </li>
              <li>
                <NavLink to="/documents" className="white-button">
                  <FaFile />
                  Documents
                </NavLink>
              </li>
              <li>
                <a
                  href="https://enach.singledebt.in"
                  target="_blank"
                  className="white-button"
                >
                  <MdOutlineRestartAlt />
                  Setup eNACH
                </a>
              </li>
            </ul>
            <div className="text-end logout"></div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
