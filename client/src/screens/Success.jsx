import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartReset } from "../actions/cartAction";
import { createOrder } from "../actions/orderAction";
import { Link } from "react-router-dom";

const Success = () => {
  const [pending, setPending] = useState(true);
  const [errorPopup, setErrorPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // Caculate price
  cart.itemPrices = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  cart.shippingPrice = addDecimal(cart.itemPrices > 100 ? 0 : 30);
  cart.taxPrice = addDecimal(Number((0.15 * cart.itemPrices).toFixed(2)));
  cart.totalPrice = addDecimal(+cart.itemPrices + +cart.shippingPrice + +cart.taxPrice);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const placeOrderHandler = async () => {
    const data = await axios.post(
      "/api/order",
      {
        orderItems: cart.cartItems,
        shippingAddress: userInfo.shippingAddress,
        paymentMethod: "chapaa",
        itemPrices: cart.itemPrices,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      },
      config
    );
    if (data.status === 201) {
      setPending(false);
      setSuccessPopup(true);
    } else if (data.status !== 201) {
      setPending(false);
      setErrorPopup(true);
      setTimeout(() => {
        setErrorPopup(false);
      }, 5000);
    }
  };
  useEffect(() => {
    placeOrderHandler();
    dispatch(cartReset());
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        font: "40px",
        top: "0px",
        width: "100%",
        height: "100%",
        direction: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
      className=""
    >
      {pending && (
        <p
          style={{
            paddingLeft: "8px",
            paddingRight: "8px",
            color: "gray",
            font: "50px",
          }}
        >
          Paying...
        </p>
      )}
      {successPopup && (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <p style={{ marginTop: "2rem", fontWeight: "extrabold", fontSize: "2rem", color: "#718096" }}>
            Payment Successful.
          </p>
          <img src="./success.png" alt="" style={{ width: "40%", height: "50%", borderRadius: "0.25rem" }} />
          <Link
            to="/"
            style={{
              marginTop: "2rem",
              borderRadius: "0.25rem",
              padding: "0.5rem 1.25rem",
              color: "white",
              backgroundColor: "#1a202c",
              ":hover": {
                color: "#e2e8f0",
              },
            }}
          >
            Back to Home
          </Link>
        </div>
      )}
      {errorPopup && (
        <div
          style={{
            border: "1px solid #ef4444",
            color: "#ef4444",
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            padding: "1rem",
          }}
        >
          Something went wrong please try again
        </div>
      )}
    </div>
  );
};

export default Success;
