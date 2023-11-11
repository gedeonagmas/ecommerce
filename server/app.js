const morgan = require("morgan");
const path = require("path");
const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorHandlers");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const requestRoutes = require("./routes/requestRoutes");
const cors = require("cors");
//const stripeRoutes=require("./routes/stripeRoutes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

//Use morgan to detect http request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Parse json data
app.use(express.json());
app.use(
  cors({
    origin: ["https://gedi-client.vercel.app"],
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

// Main Routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/orders/stripe-payment", orderRoutes);

if (process.env.NODE_ENV != "test") {
  // app.use("/backend/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get(
    "/api/config/paypal",
    (req, res) => res.send(process.env.PAYPAL_CLIENT_ID)
    /* app.get("/api/orders/stripe-payment", (req, res) =>
    res.send(process.env.STRIPE_SECRET_KEY)*/
  );
  app.get("/api/orders/stripe-payment", (req, res) => res.send(process.env.STRIPE_SECRET_KEY));
}


  app.get("/", (req, res) => {
    res.send("hello mudie server is running");
  });

// Error Handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
