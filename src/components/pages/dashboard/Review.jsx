import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Layout from "../../utils/Layout";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function UserReview({reviews, displayReviews}) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviewText, setReviewText] = useState("");
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div style={styles.container}>
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
      <textarea placeholder="What's your experience?" onChange={(e) => setReviewText(e.target.value)} style={styles.textarea} />

      <button onClick={() =>displayReviews(reviewText)} style={styles.button}>
        <Link to="/user/user-dashboard" className="navbar-item" href="">
          Submit
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

export default UserReview;
