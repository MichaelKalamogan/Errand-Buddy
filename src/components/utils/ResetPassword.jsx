import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';

function ResetPassword() {

        const [values, setValues] = useState({
                password: "",
                password2: "",
        });

        const [verified, setVerified] = useState(false)

        //Getting the parameters
        const { id, token } = useParams()

        const history = useHistory();

        const { password, password2 } = values;

        const handleChange = (name) => (event) => {
            setValues({ ...values, [name]: event.target.value });
        };

        //Verify token first before loading reset password
        useEffect(() => {
                axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/reset-password/${id}/${token}`)
                  .then((response) => {
                    if(response.data.success) {
                            setVerified(true)
                    }
                  });
              }, []);

        //Submitting the password change
        const clickSubmit = (event) => {
            event.preventDefault();

            if(password !== password2) { 
                alert('Passwords do not match') 
                return
            }

            axios
            .patch(`${process.env.REACT_APP_SERVER_URL}/api/users/reset-password/submit`, {

                id: id,
                password: password,
            })
            .then((response) => {

                if (response.data.success) {
                    history.push("/login")
                }
                
            }).catch((error) => {
                console.log('error')
            })
            
        };

        return (
            <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
                { verified ? 
                 (
                        <div className="add-container">
                        <h1 className="register-header mt-3">
                        Reset Password
                        </h1>            

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
                        <button
                                onClick={clickSubmit}
                                className="btn btn-primary mt-4 signup"
                        >
                                Reset Password
                        </button>
                        </div>
                        
                        </div>
                 )
                :
                 null
                }
            </div>
            </div>
        );
    
}

export default ResetPassword;