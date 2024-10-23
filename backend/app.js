import express from "express";
import request from "request";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import fetch from "node-fetch";
import Token from "./model/tokenSchema.js";
import connectToDatabase from "./database/connection.js";
import multer from "multer";
import FormData from "form-data";

import Razorpay from "razorpay";

dotenv.config();
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
  cors({
    origin: [
      "https://client.singledebt.in",
      "https://enroll.singledebt.in",
      "https://api-enroll.singledebt.in",
      "http://localhost:3000",
      "https://msg.mtalkz.com",
      
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// connect to database
connectToDatabase();


const razorpay = new Razorpay({
  key_id: 'rzp_test_i6at6OINiz1V5I', 
  key_secret: 'vdcnj54E9uk3pmbbcS5MTLNH', 
});




// Create order route
app.post("/api/payment/orders", async (req, res) => {
  console.log('hi');
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
    receipt: "receipt#1",
    
  };
  

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
} catch (error) {
    console.error("Error creating Razorpay order:", error); // Log the error
    res.status(500).json({ error: "Failed to create order", details: error });
}

});




// handle requests/response
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});



// generate token
const generateToken = async () => {
  try {
    const options = {
      refresh_token:
        "1000.a530d33e4a344e47acfc1084c66e7e72.d1be5c5eadffbdcf72f6ad6f891c9f5a",
      client_id: "1000.FJVT66QNSRUXJOLZEYRRVUOAKP064T",
      client_secret: "c46217b322daa316db60f7c6319dd7ca088b7e49d2",
      grant_type: "refresh_token",
    };

    var formBody = [];
    for (var option in options) {
      var encodedKey = encodeURIComponent(option);
      var encodedValue = encodeURIComponent(options[option]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (response.status === 200) {
      const data = await response.json();
      await Token.deleteMany(); // Delete existing tokens
      const newToken = new Token({ token: data.access_token });
      await newToken.save();
    } else {
      console.log(
        "Failed to fetch token:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

// Schedule token generation every 15 minutes
cron.schedule("*/15 * * * *", generateToken);

// Example route to get the latest token
app.get("/token/generate", async (req, res) => {
  try {
    let latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
    if (!latestToken) {
      await generateToken();
      latestToken = await Token.findOne().sort({ createdAt: -1 }).exec();
    }
    return res.json({ token: latestToken.token });
  } catch (error) {
    console.error("Error fetching or generating token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/token", async (req, res) => {
  try {
    const token = await Token.find({});
    if (!token) {
      return res.status(400).json({ message: "Failed to fetch token" });
    } else {
      return res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

// proxy request
app.get("/proxy", (req, res) => {
  let url = req.query.url;
  const email = req.query.email;
  const authorization = req.header("Authorization");
  //
  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  //
  const headers = {
    Authorization: authorization,
  };
  if (email) {
    const urlObj = new URL(url);
    urlObj.searchParams.append("email", email);
    url = urlObj.toString();
  }

  const options = {
    url: url,
    headers: headers,
  };
  request(options).pipe(res);
});
//
const upload = multer();
app.post("/proxy", upload.any(), async (req, res) => {
  const url = req.query.url;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    let response;
    const headers = {
      Authorization: authorization,
    };

    if (req.is("multipart/form-data")) {
      // Handle multipart/form-data
      const form = new FormData();
      for (const key in req.body) {
        form.append(key, req.body[key]);
      }
      req.files.forEach((file) => {
        form.append(file.fieldname, file.buffer, file.originalname);
      });

      headers["Content-Type"] = form.getHeaders()["content-type"];

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: form,
      });
    } else {
      // Handle application/json
      headers["Content-Type"] = "application/json";

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          data: req.body,
        }),
      });
    }

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error occurred while proxying request:", error);
    return res.status(500).send({
      message: "Error occurred while proxying request",
      error: error.message,
      stack: error.stack,
    });
  }
});
//

//
const generateTicketToken = async (req, res) => {
  try {
    const options = {
      refresh_token:
        "1000.a530d33e4a344e47acfc1084c66e7e72.d1be5c5eadffbdcf72f6ad6f891c9f5a",
      client_id: "1000.FJVT66QNSRUXJOLZEYRRVUOAKP064T",
      client_secret: "c46217b322daa316db60f7c6319dd7ca088b7e49d2",
      grant_type: "refresh_token",
    };

    var formBody = [];
    for (var option in options) {
      var encodedKey = encodeURIComponent(option);
      var encodedValue = encodeURIComponent(options[option]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return res.status(200).send(data);
    } else {
      console.log(
        "Failed to fetch token:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
app.get("/ticket", generateTicketToken);

// start server
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
