import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
// import { isAuthenticated } from "../../auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../../../style/Payment.scss";
import ErrandDisplay from "./ErrandDisplay";

const Payments = (props) => {

  const history = useHistory()
  const stripe = useStripe();

  const handleClick = (e) => {
    
    e.preventDefault();

    const { errandId, errandImage, errandName, errandPrice } =
      props.location.state.errandData;

      let line_items
    
      if (errandImage) {
        line_items = [
          {
            price_data: {
              currency: "sgd",
              unit_amount: errandPrice * 100, //amount is in cents for Stripe
              product_data: {
                name: errandName,
                images : [errandImage] 
              }
            },
  
            quantity: 1
          }
        ]
      } else {
  
        line_items = [
          {
            price_data: {
              currency: "sgd",
              unit_amount: errandPrice * 100, //amount is in cents for Stripe
              product_data: {
                name: errandName,
              }
            },
  
            quantity: 1
          }
        ]
      }
      
    const user_id = localStorage.getItem("userId");
    axios
      .post(
        `http://${process.env.REACT_APP_SERVER_URL}/api/payment/create-checkout-session`,
        { line_items, user_id, errandId },
        {
          headers: {
            "x-auth-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        const { sessionId } = res.data;

        const { error } = stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.log(error);
        }
      });
  };

  return (
    <>
      <ErrandDisplay
        handleClick={handleClick}
        errandData={props.location.state.errandData}
      />
    </>
  );
};
export default Payments;
