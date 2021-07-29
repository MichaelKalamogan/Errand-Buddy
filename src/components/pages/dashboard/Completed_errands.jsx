import React, { useState, useEffect } from "react";
import {  Link,useParams,useHistory  } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Layout from "../../utils/Layout";
import axios from "axios";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Completed_errands()
{
  
  const history = useHistory();
  const { errantID } = useParams();
  const userId = localStorage.getItem("userId")

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [feedback, setFeedback]=useState('')
  const stars = Array(5).fill(0);
  let feedbackMessage = ''


  const handleSubmit = () =>
  {
    const token = localStorage.getItem("jwt");
 // router.post('/:id/accepted', authenticated, errandController.accept)
    axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/errands/${ errantID }/completed/review`,{rating: currentValue, review:feedback}, {
     headers: {
       "x-auth-token": token,
       "content-type": "application/json"
   }
    } ).then(response =>
    {
     history.push(`/dashboard/${userId}`)
      
     })
  
   }

  const handleClick = (value) => {
    setCurrentValue(value);
  
  };
  // const handleSubmit = () => {
  //   console.log(feedback);
  // };
  const handleOnChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div style={styles.container}>
      <Layout title="Thanks Buddy!" description=""></Layout>

      <h2> Please rate your experience </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea placeholder="What's your experience?" style={styles.textarea} onChange={handleOnChange} />
      <button onClick={handleSubmit}>
        submit feedback
</button>
      
      <button type="button" className="btn btn-warning">
        <Link to={`/dashboard/${userId}`} className="navbar-item">
          My Profile
        </Link>
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "40px ",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    margin: "20px 0",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 200,
    width: 500,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    margin: "20px 0",
    width: 300,
    padding: 10,
  },
};

export default Completed_errands;
