import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Loading from "../components/Loading";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import AppBar from "../components/AppBar";

const Documents = () => {
  const { url, user, getToken } = useContext(AppContext);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/zohosign__ZohoSign_Documents/search?criteria=((zohosign__Lead:equals:${user.id}))`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data.data;
        data.forEach((obj) => {
          for (const key in obj) {
            if (obj[key] === null) {
              obj[key] = "";
            }
          }
        });
        const filtered = data.filter((item) => {
          return (
            item.zohosign__Document_Status === "Signed" ||
            item.zohosign__Document_Status === "Out for Signature"
          );
        });
        setDocuments(filtered);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <>
        <AppBar />
      <div className="container p-2">
        <div className="text-center mt-4">
          <h2>Documents</h2>
        </div>

        {loading ? (
          <Loading />
        ) : documents.length === 0 ? (
          <p className="text-center my-4">No data found</p>
        ) : (
          <div className="new-grid my-4">
            {documents.map((item, index) => {
              return (
                <div key={index} className="new-card">
                  <p>
                    <span className="fw-bold">Name:</span> {item.Name}
                  </p>
                  <p>
                    <span className="fw-bold">Owner:</span> {item.Owner.name}
                  </p>
                  <p>
                    <span className="fw-bold">Status:</span>{" "}
                    {item.zohosign__Document_Status}{" "}
                    <FaCheck className="text-success" />
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Documents;
