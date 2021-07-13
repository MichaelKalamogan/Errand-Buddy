import React, { Component } from "react";


import {Link} from 'react-router-dom'

const Buddy_dashboard = () => {

  // const {user:{_id, name, email, role} } = isAuthenticated()

  const dashboardLinks = () => {
    return (
     
      <div className="card">

        <h4 className="card-header">Buddy Links</h4>
        <ul className="list-group">
         <Link className="nav-link" to="/"></Link>
         <li className="list-group-item">My Wallet</li>
         <Link className="nav-link" to="/buddy/profile-update">Update Profile</Link>
        

       </ul>


      </div>
    )
  }

 

  const transactionHistory = () => {
    return (
      <div className="card mb-5">
      <h3 className="card-header">Transaction history</h3>
      <ul className="list-group">
        <li className="list-group-item">history</li>
       
        {/* <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li> */}

      </ul>
      </div>

    )
  }

  const buddyRating= () => {
    return (
      <div className="card mb-5">
      <h3 className="card-header">Rating</h3>
      <ul className="list-group">
        <li className="list-group-item">Review</li>
       
        {/* <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li> */}

      </ul>
      </div>

    )
  }
  
    return (
<>
<div 
title="Dashboard" 
  description="  " 
  className="container-fluid">
     <div className="card mb-5 ">
       <h3 className="card-header">User Information</h3>
       <ul className="list-group">
         <li className="list-group-item">name</li>
         <li className="list-group-item">email</li>
         <li className="list-group-item">role</li>
         {/* <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li> */}

       </ul>
       </div>

       <div className="row">
    < div className="col-3">
      {dashboardLinks()}

    </div>
    < div className="col-9">
      
      {transactionHistory ()}
      {buddyRating()}
   


    </div>
    </div>
    </div>
   
     </>
    );
  }




export default Buddy_dashboard;