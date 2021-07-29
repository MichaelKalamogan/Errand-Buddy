import React, { useState, useEffect  } from "react";
import { Link,  useHistory } from "react-router-dom";
import { Redirect } from "react-router";

import { isAuthenticated } from "../../utils/Auth";
import axios from "axios";
import Google from "../../googleMaps/Google_map";
import '../../../style/Show_errands.scss'
import { format } from 'timeago.js'


const Show_errands = (props) =>
{
  
  const history = useHistory()
  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  const user_name = localStorage.getItem('username')


  const handleSubmit = () =>
  {
    
    const errandId = props.location.state.e._id

    axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/errands/${errandId }/accepted`,{}, {
     headers: {
       "x-auth-token": token,
       "content-type": "application/json"
   }
    } ).then(response =>
    {
     history.push(`/dashboard/${userId}`)
     })
  
   }
  
  const [review, setReview] = useState({
    
      averageRating: "",
      allReviews: []
    
  });

  useEffect(() => {
    // router.post('/:id/accepted', authenticated, errandController.accept)
    axios
      .get(`http://${process.env.REACT_APP_SERVER_URL}/api/errands/show/${props.location.state.e._id}`, {
        headers: {
          "x-auth-token": token,
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

  // Creating a chat with seller

  const [newConversation, setNewConversation] = useState(null)

  function newChat() {
  
    axios.post(`http://l${process.env.REACT_APP_SERVER_URL}api/chats/newconversation`, {

      buyer: user_name,
      seller: props.location.state.e.username,
      errand_Id: props.location.state.e._id,
      errand_desc: props.location.state.e.items

    })
    .then(res=>{
        setNewConversation(res.data.conversation)
       
        history.push ({
          pathname: `/chat`,
          state: {referredchat: newConversation}
        
        })
    })
  
  }
  

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
                    <p>Pick up Location: {props.location.state.e.pickupLocation}</p>
                    { props.location.state.e.pickupLatitude ? 
                      <Google latitude={props.location.state.e.pickupLatitude} longtitude={props.location.state.e.pickupLongtitude}/>
                      : <h5>Google Maps not available for postal code provided</h5>
                    }
                    <p>Pick up Time:{formatDate(props.location.state.e.pickupTime)}</p>
                  </div>

                  <div className="deliver-info">
                    <p>Delivery Location: {props.location.state.e.deliveryLocation}</p>
                    { props.location.state.e.deliveryLatitude ? 
                      <Google latitude={props.location.state.e.deliveryLatitude} longtitude={props.location.state.e.deliveryLongtitude}/>
                      : <h5>Google Maps not available for postal code provided</h5>
                    }     
                    <p>Deliver By:{formatDate(props.location.state.e.deliveryTime)}</p>
                  </div>

                </div>
                                              
                <p>Item Price: ${props.location.state.e.itemPrice}</p>
                <p>Description: {props.location.state.e.description}</p>
                <p>Status: {props.location.state.e.status}</p>
                { props.location.state.e.status === 'Completed' ? null : 
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
                
                }
                
                
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
                  <button onClick={newChat} > Chat with Seller</button>

                  
                  <div className="dotted-lines"></div>

                  <div className="review-box">
                    <h5> Reviews </h5>
                    <div>
                      {review.allReviews.map( (item, i )=> (
                        <div className="reviews-list" key={i}>
                          <h6>{item.review}</h6>
                          <h6>By: {item.user_name} on {format(item.created)}</h6>
                        </div>

                      ))}

                    </div>
                    
                  </div>
                
                </div>

              </div>
            </div>
            

          </div>

        </div>
      
    );
  }

export default Show_errands;
