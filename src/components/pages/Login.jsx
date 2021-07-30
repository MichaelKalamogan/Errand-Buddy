import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import '../../style/Login.scss'


const Login = (props) => {


  const [values, setValues] = useState({
      
    email: '',
    password: '',

  })

  const history = useHistory()

  const {email, password} = values

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})

  }

  //Loading state; loading a spinner to render conditionally
  const [isLoading, setIsLoading] = useState(false)

  const clickSubmit = (event) => { 
    event.preventDefault()

    setIsLoading(true)

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
        email: email,
        password: password,
      })
    .then(data => { 
      localStorage.setItem ('jwt', data.data.token)
      localStorage.setItem('userId', data.data.userId )
      localStorage.setItem('username', data.data.username )
      props.setAuth(true)

      setValues({...values, email: '',
      password: '',})
      history.push('/')
    })
    .catch(err => {
      console.log("errror",err)
    }).finally (() => {
      setIsLoading(false)
    })
    
  }
    
    return (
      <div className="container mt-5 mb-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5">
              <h1>Errand Buddy</h1>
              <div className="email-input">
                
                <input
                onChange={handleChange("email")}
                  type="text"
                  className="form-control"
                  value={email}
                  placeholder="Email address"
                />
                <i className="fa fa-user"></i>
              </div>
              <div className="password-input">
                <input
                onChange={handleChange
                ("password")}
                  type="password"
                  className="form-control"
                  value={password}
                  placeholder="password"
                />
                <i className="fa fa-lock"></i>
              </div>
              <div className="form-check"> </div>

              { isLoading ? 
              <button  onClick={clickSubmit}className="btn btn-primary mt-4 login-btn" disabled>Login<i class="fas fa-spinner fa-spin"></i></button>
              :
              <button  onClick={clickSubmit}className="btn btn-primary mt-4 login-btn">Login</button>
              
              }
              <div className="d-flex justify-content-center mt-4">
                
               
              </div>
              <div className="text-center mt-4">
                <span>Forgot your password?</span>
                <Link to={`/request-reset-password`}> Reset Password</Link>
              </div>
              <div className="text-center mt-4">
                <span>No Account? </span>
                <Link to={`/register`}> Sign Up Now!</Link>
              </div>
          </div>
        </div>
      </div>
    </div>
    );
  }


export default Login;
