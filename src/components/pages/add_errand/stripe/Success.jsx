import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Success = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get("session_id");
  const userId = localStorage.getItem("userId");

  const [paid, setPaid] = useState(false);

  useEffect(() => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/api/errands/successfulpayment`,

        {
          sessionId,
        },

        {
          headers: {
            "x-auth-token": localStorage.getItem("jwt"),
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setPaid(true);
        }

      }).catch((err) => {
          console.log(err, 'error')
      });
  }, []);

  return (
    <div>
      {paid ? <h1>Successful Payment</h1> : <h1>Please contact us to ensure payment was successfully made and you are not double charged</h1>}

      <Link to={`/dashboard/${userId}`}>
        <button> Continue</button>
      </Link>
    </div>
  );
};

export default Success;
