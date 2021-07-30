import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../utils/Layout";
import axios from "axios";
import '../../style/Register.scss'

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    password2: "",
  });

  const history = useHistory();

  const { name, username, email, password, password2 } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //Loading state; loading a spinner to render conditionally
  const [isLoading, setIsLoading] = useState(false) 

  const clickSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true)

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, {
        username: username,
        name: name,
        email: email,
        password: password,
        password2: password2,
      })
      .then((response) => {
        history.push("/login");
      }).catch((error) => {
        console.log('error')
      }).finally (() => {
          setIsLoading(false)
        })
    
  };

  return (
    <div className="container mt-5 mb-5">
      <Layout title="Welcome to Errand Buddy!" description="  "></Layout>
      <div className=" row d-flex align-items-center justify-content-center">
        <div className="add-container">
            <h1 className="register-header mt-3">
              Join Errand Buddy! 
            </h1>
            <h6 className="register-header  mt-1">Take A Break or Help Perform an Errand</h6>
            
            <div className="outer registration mb-3">
              <i className="fa fa-envelope"/>
              <input
                onChange={handleChange("email")}
                type="email"
                className="input"
                value={email}
                placeholder="Email Address"
              />
            </div>
            <div className="outer registration mb-3">
              <i className="fa fa-user"></i>
              <input
                onChange={handleChange("username")}
                type="text"
                className="input"
                value={username}
                placeholder="User Name"
              />
            </div>
            <div className="outer registration mb-3">
              <i className="fa fa-user"></i>
              <input
                onChange={handleChange("name")}
                type="text"
                className="input"
                value={name}
                placeholder="name"
              />
            </div>
            <div className="outer registration mb-3">
              <i className="fa fa-lock"></i>
              <input
                onChange={handleChange("password")}
                type="password"
                className="input"
                value={password}
                placeholder="Password"
              />
            </div>

            <div className="outer registration mb-3">
              <i className="fa fa-lock"></i>
              <input
                onChange={handleChange("password2")}
                type="password"
                className="input"
                value={password2}
                placeholder="Confirm Password"
              />
            </div>
            <div className="register-button">
            { isLoading ? 
              <button
                onClick={clickSubmit}
                className="btn btn-primary mt-4 signup"
              > Join us now<i class="fas fa-spinner fa-spin"></i>
              </button>
              :
              <button
                onClick={clickSubmit}
                className="btn btn-primary mt-4 signup"
              >Join us now</button>
            
            }
            </div>


            <div className="text-center mt-4">
              <span>Already a member?</span>
              <a href="/login" className="text-decoration-none">
                Login
              </a>
            </div>

            <div className="pdpa">
              <small className="text-muted">
                By registering, you agree that you have read and understood our <a href="/">Data Protection Notice</a>, and consent to
                the collection, use and disclosure of my personal data by Errand Buddy for the purposes set out in the Notice.
              </small>
            </div>

         
        </div>
      </div>
    </div>
  );
};

export default Register;
