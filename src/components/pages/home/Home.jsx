import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Likes from "./Likes";
import "../../../style/Home.scss";

const Home = () => {
  const [data, setData] = useState([]);

  //For Search Bar
  const [searchField, setSearchField] = useState("");
  //For Sort Bar
  const [sortedField, setSortedField] = useState("items");

  let filteredErrands = data.filter((item) => 
    typeof item[sortedField] == Number
      ? item[sortedField].includes(searchField)
      : item[sortedField].toLowerCase().includes(searchField.toLowerCase())
  );

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/errand-buddy`)

      .then(function (response) {
        // handle success
        setData(response.data.errands);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  useEffect(() => {
    console.log(data, "filter");
    console.log(sortedField);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.select.value);
  };

  return (
    <div className="home-body">
      <div className="home-headers" style={{padding: "10px 0"}}>
        <h1>Stop rushing through your Day. We can make it simpler.</h1>
        <h1>Use Errand Buddy</h1>
      </div>
      <div className="main-container mt-5">
        <h2 className="mb-4">Available Errands! </h2>
        <input
          name="input"
          value={searchField}
          type="search"
          placeholder="Search the Errands"
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
        />
        <select
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          name="select"
          onChange={(e) => setSortedField(e.target.value)}
        >
          <option defaultValue value="items">
            {" "}
            Items{" "}
          </option>
          {/* <option value="errandFee">Errand Fee</option> */}
          <option value="username">User Name</option>
          {/* <option value="itemPrice">Item Price</option> */}
        </select>

        <div id="errand-container" className="errand-container row ">
          {filteredErrands.map((e) => {
            if (userId !== e.user_id) {
              return (
                
                <div className="errand-card mb-3" key={e._id}>
                  <Link
                      to={{ pathname: `/${e._id}`, state: { e } }}
                      className=""
                      href=""
                      style={{ textDecoration: 'none'}}
                    >
                      <div className="card-image">
                        <img src={e.image} alt="Item" />
                       </div>
                      
                    </Link>
                  <div className="card-body">
                    <Link
                      to={{ pathname: `/${e._id}`, state: { e } }}
                      className=""
                      href=""
                      style={{ textDecoration: 'none'}}
                    >
                      <h5 className="card-header">{e.username}</h5>
                    
                      <h5 className="item-details">{e.items}</h5>
                    </Link>
                    <p>Errand Fee: ${e.errandFee}</p>
                    <p>Pickup At: {e.pickupLocation}</p>
                    <p>Deliver To: {e.deliveryLocation}</p>
                  </div>
                  <Likes errandId={e._id} userId={userId} />
                </div>
                
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
