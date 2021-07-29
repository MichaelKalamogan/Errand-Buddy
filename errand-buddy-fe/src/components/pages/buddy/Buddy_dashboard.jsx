import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";

const Buddy_dashboard = (props) => {
  const history = useHistory()
  const [user, setUser] = useState({
    user: {
      name: "",
      email: "",
    },
    errands: {},
    // balance: {balance: ""},
    inProgress: [
      {
        items: "",
        itemPrice: "",
        errandFee: "",
        image: "",
        _id:""
      },
    ],
  });

  const handleSubmit = () =>
  {
    const token = localStorage.getItem("jwt");
 // router.post('/:id/accepted', authenticated, errandController.accept)

    //axios.post(`http://localhost:4000/api/errands/${ _id }/completed`,{}, {
  //    headers: {
  //      "x-auth-token": token,
  //      "content-type": "application/json"
  //  }
  //   } ).then(response =>
  //   {
  //    history.push(`/buddy/buddy-dashboard`)
      
    axios.post(`http://localhost:4000/api/errands/${ user._id }/completed`,{}, {
     headers: {
       "x-auth-token": token,
       "content-type": "application/json"
   }
    } ).then(response =>
    {
     history.push(`/buddy/buddy-dashboard`)
      
     })
  
   }
 
  const token = localStorage.getItem("jwt");

  const { name, email } = user.user;
  

  useEffect(() => {
    console.log(user);
  });

  useEffect(() => {
    // router.post('/:id/accepted', authenticated, errandController.accept)
    axios
      .get(`http://localhost:4000/api/users/dashboard`, {
        headers: {
          "x-auth-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        // history.push(`/buddy/buddy-dashboard`)
        console.log(response.data);
        setUser(response.data);
      });
  }, []);
  // const handleChange = (name) => (event) => {
  //   setUser({...user, [name]: event.target.user})
  // }

  const dashboardLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Buddy Links</h4>
        <ul className="list-group">
          <Link className="nav-link" to="/"></Link>
          {/* <li className="list-group-item">My Wallet: ${balance}</li> */}
          <Link className="nav-link" to="/buddy/profile-update">
            Update Profile
          </Link>
        </ul>
      </div>
    );
  };

  const transactionHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Transaction history</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
      </div>
    );
  };

  const buddyRating = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Rating</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {props.reviews.map((customerReview, i) => (
              <div key={i}>{customerReview}</div>
            ))}
          </li>
        </ul>
      </div>
    );
  };
  const inProgress = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Errand In Progress</h3>
{
          user.inProgress ? 
            user.inProgress.map((e) => (      
        <div class="d-flex p-1 bg-secondary text-white justify-content-between">
          <div> 
          <div class="p-2 bg-info flex-fill">Items: {e.items}</div>
          <div class="p-2 bg-info flex-fill">Item price: ${e.itemPrice}</div>
          <div class="p-2 bg-info flex-fill">Errand fee: $ {e.errandFee}</div>
          </div>
          <div class="p-2 bg-info flex-fill">
            {" "}
            <img src={e.image} alt="" width="100" height="100" />{" "}
            <button onClick={handleSubmit}>Complete Errand
            </button>
          </div>
            </div>
          ))              
            :         
            (
          <div>no outstanding jobs</div>
          )      
}            
      </div>
    );
  };

  return (
    <>
      <div title="Dashboard" description="  " className="container-fluid">
        <div className="card mb-5 ">
          <h3 className="card-header">User Information</h3>
          <ul className="list-group">
            <li className="list-group-item">Name: {name}</li>
            <li className="list-group-item">Email:{email}</li>
          </ul>
        </div>

        <div className="row">
          <div className="col-3">{dashboardLinks()}</div>
          <div className="col-9">
            {transactionHistory()}
            {buddyRating()}
            {inProgress()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Buddy_dashboard;
