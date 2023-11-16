import React from "react";

const Pay = (props) => {
  return (
    <div>
      <form method="POST" className="" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value="CHAPUBK_TEST-7osxyPCBKmA3NdC9nlaZkIrHMas5Falj" />
        <input type="hidden" name="tx_ref" value={`gedi-tx-${Date.now()}`} />
        <input type="hidden" name="amount" value={props.price} />
        <input type="hidden" name="currency" value="USD" />
        <input type="hidden" name="email" value={props.userInfo.email} />
        <input
          type="hidden"
          name="first_name"
          value={props.userInfo.shippingAddress.fullname?.toString().split(" ")[0]}
        />
        <input
          type="hidden"
          name="last_name"
          value={props.userInfo.shippingAddress.fullname?.toString().split(" ")[1]}
        />
        <input type="hidden" name="title" value="Let us do this" />
        <input type="hidden" name="description" value="Paying with Confidence with cha" />
        <input type="hidden" name="logo" value="https://yourcompany.com/logo.png" />
        <input type="hidden" name="callback_url" value="https://ecommerce-client-eight-eosin.vercel.app" />
        <input type="hidden" name="return_url" value={`https://ecommerce-client-eight-eosin.vercel.app/success`} />
        <input type="hidden" name="meta[title]" value="test" />
        <button
          style={{
            background: "#384AEB",
            color: "white",
            height: "40px",
            width: "100%",
            padding: "2px",
            direction: "flex",
            alignItems: "center",
            border: "none",
          }}
          className=""
          type="submit"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default Pay;
