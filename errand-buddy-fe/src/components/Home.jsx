import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrData from "../Data";
import Layout from "./Layout";
import axios from "axios";
import Likes from "./Sections/Likes";
import "./Home.scss";

const Home = ({auth}) => {
  const [data, setData] = useState([]);
console.log(auth);
  useEffect(() => {
    axios
      .get("http://localhost:4000/")

      .then(function (response) {
        // handle success
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  //Likes function

  return (
    <>
      <Layout
        title="Errand Buddy"
        description="Let us share your errands today."
      ></Layout>

      <div className="main-container mt-5">
        <h2 className="mb-4">Available Errands! </h2>
        <div id="errand-container" className="errand-container row ">
          {data.map((e) => {
              if (auth.userId !== e.user_id) {
                return (
                  <div className="errand-card mb-3" key={e._id}>
                    <div className="card-image">
                      <img src={e.image} alt="Item" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-header">{e.username}</h5>
                      <Link
                        to={{ pathname: `/buddy/${e._id}`, state: { e } }}
                        className=""
                        href=""
                      >
                        <h5 className="item-details">{e.items}</h5>
                      </Link>
                      <p>Errand Fee: ${e.errandFee}</p>
                      <p>Pickup At: {e.pickupLocation}</p>
                      <p>Deliver To: {e.deliveryLocation}</p>
                    </div>
                    <Likes errandId={e._id} userId={auth.userId} />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
