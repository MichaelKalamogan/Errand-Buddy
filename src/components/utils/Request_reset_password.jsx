import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

function Request_reset_password(props) {

    const [values, setValues] = useState({
      
        email: '',
    
    })

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    
    }
    const {email} = values
    const history = useHistory()


    //Loading state; loading a spinner to render conditionally
    const [isLoading, setIsLoading] = useState(false)

    const clickSubmit = (event) => { 
        event.preventDefault()

        setIsLoading(true)
        
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/users/forgot-password`, {
            email: email,
          })
        .then(res => { 

          if(res.data.success) {
            history.push(`/`)
          }
        })
        .catch(err => {
          console.log("errror",err)
        }).finally (() => {
          setIsLoading(false)
        })
        
    }
        
    return (
        <div>
            <div className="row after-navbar">
            <div className="col-md-6 m-auto">
              <div className="card card-body">
                <h1 className="text-center mb-3">Forgot Password</h1>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                        onChange={handleChange("email")}
                        type="text"
                        id="email" 
                        name="email"
                        className="form-control"
                        value={email}
                        placeholder="Enter Email"
                    />
                  </div>
                  { isLoading ? 
                    <button onClick={clickSubmit} className="btn btn-primary btn-block" disabled>Submit<i class="fas fa-spinner fa-spin"></i> </button> 
                    : 
                    <button onClick={clickSubmit} className="btn btn-primary btn-block">Submit</button>
                  }
                  
                <p className="lead mt-4">
                  No Account? <Link to="/Register">Register Here</Link>
                </p>
              </div>
            </div>
          </div>
            
        </div>
    );
}

export default Request_reset_password;