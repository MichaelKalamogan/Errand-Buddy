import React, { Component, useState, useEffect  } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import arrData from "../../../Data";
import Layout from "../../Layout";
import moment from "moment";
import { isAuthenticated } from "../../Auth";
import axios from "axios";

import './Show_errands.scss'
import SiteFooter from '../../SiteFooter';


const Show_errands = (props) =>
{
  
  const history = useHistory()

  const handleSubmit = () =>
  {
    
    const errandId = props.location.state.e._id
    console.log(errandId);
    const token = localStorage.getItem("jwt");
    axios.post(`http://localhost:4000/api/errands/${errandId }/accepted`,{}, {
     headers: {
       "x-auth-token": token,
       "content-type": "application/json"
   }
    } ).then(response =>
    {
      console.log(response)
     history.push(`/${props.location.state.e._id}/dashboard`)
     })
  
   }
  
  const [review, setReview] = useState({
    
      averageRating: "",
      allReviews: []
    
  });

  useEffect(() => {
    // router.post('/:id/accepted', authenticated, errandController.accept)
    axios
      .get(`http://localhost:4000/api/errands/show/${props.location.state.e._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem('jwt'),
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setReview(response.data);
      });
  },[]);


  function formatDate(string){
    return new Date(string).toLocaleString([]);
  }

  const deliveryDate = props.location.state.e.deliveryTime
  const localDeliveryDate = new Date(deliveryDate)
  

    return (
        <div>
           <div className="mainshow-container mt-5">
            <div className="row ">
              <div className="show-container col-7 mb-3" key={props.location.state.e._id}>
                <img className="show-image" src={props.location.state.e.image} alt="Item" />
                
                <div className="row show-header">
                  <p className="summary">{props.location.state.e.items}</p>
                  <p className="fees">${props.location.state.e.errandFee}</p>
                  <p className="category">{props.location.state.e.category}</p>
                </div>
              
                <div className="row location-info">
                  <div className="pickup-info">
                    <p>Pick up Location:{props.location.state.e.pickupLocation}</p>
                    <p>Pick up Time:{formatDate(props.location.state.e.pickupTime)}</p>
                  </div>

                  <div className="deliver-info">
                    <p>Delivery Location:{props.location.state.e.deliveryLocation}</p>
                    <p>Deliver By:{formatDate(props.location.state.e.deliveryTime)}</p>
                  </div>

                </div>
                              


                <p>Item Price:{props.location.state.e.itemPrice}</p>
                <p>Description:{props.location.state.e.description}</p>
                <p>Status:{props.location.state.e.status}</p>

                <button className="btn btn-outline-primary" mt-2 mb-2>
              {isAuthenticated() &&  (
                  <button onClick= {handleSubmit}> Accept
              </button>
              )}
              {!isAuthenticated() && (
                <Link to={`/login`} className="navbar-item" href="">
                  Login to accept
                </Link>
              )}
            </button>
                
              </div>

              <div className="col-4 mb-3">
                <div className="errand-guarantee">
                  <div style={{ display: "flex"}}>
                    <h2>Errand Buddy Guarantee</h2> 
                    <img className="guarantee-logo" src={process.env.PUBLIC_URL + '/guarantee.png'} alt="logo"/>
                  </div>
                  <div>
                    <h6> Create and perform your errands with confidence.
                    All payments are collected prior to errand acceptance and will only be released to respective parties 14 days after completion of order.
                    <br/>
                    Any disputes can be raised immediately.</h6>
                  </div>
                </div>

                <div className="seller-info">
                  <h4>Meet The Seller</h4>
                  
                  <div className="seller-rep">
                    <div className="ratings">
                        <h5>{props.location.state.e.username}  ({review.averageRating} <i className="fas fa-star"></i>)</h5> 
                    </div>
                    <h6 className="smaller-h6"> Based on {review.allReviews.length} reviews</h6>
                  </div>

                  
                  <div className="dotted-lines"></div>

                  <div className="review-box">
                    <h5> Reviews </h5>
                    <div>
                      {review.allReviews.map( item => (
                        <div className="reviews-list">
                          <h6>{item.review}</h6>
                          <h6>By: {item.user_name} on {formatDate(item.created)}</h6>
                        </div>

                      ))}

                    </div>
                    
                  </div>
                
                </div>

              </div>
            </div>
            

          </div>

          <SiteFooter />

        </div>
      
    );
  }

export default Show_errands;
