import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import "../../../style/Add_errand.scss";
import { makeStyles } from '@material-ui/core/styles';

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function AddErrands(props) {
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState({
    category: "",
    items: "",
    description: "",
    pickupLocation: "",
    deliveryLocation: "",
    itemPrice: "",
    errandFee: "",
  });

  // const [errandData, setErrandData] = useState({
  //   name:"",
  //   image:"",
  //   price:""
  // })

  const [pickupDate, setPickupDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  useEffect(() => {
    setData({
      category: "",
      items: "",
      description: "",
      pickupLocation: "",
      deliveryLocation: "",
      itemPrice: "",
      errandFee: "",
    });
    if (props.location.state) {
      setData(props.location.state.data);
    }
  }, [id]);

  const [image, setImage] = useState({
    image: "",
  });

  function uploadImage(event) {
    setImage({
      newImage: event.target.files[0],
    });
  }

  // function updateErrandData (info) { //this needs to be checked

  //   const { name, value } = info

  //   setErrandData((prevData) => {
  //     return {
  //       ...prevData,
  //       [name]: value,
  //     };
  //   })
  // }

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  //Loading state; loading a spinner to render conditionally
  const [isLoading, setIsLoading] = useState(false);

  function handleClick(event) {
    event.preventDefault();

    setIsLoading(true);


    let formData = new FormData();
    formData.append("items", data.items);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("pickupLocation", data.pickupLocation);
    formData.append("deliveryLocation", data.deliveryLocation);
    formData.append("pickupTime", pickupDate);
    formData.append("deliveryTime", deliveryDate);
    formData.append("itemPrice", data.itemPrice);
    formData.append("errandFee", data.errandFee);
    formData.append("image", image.newImage);

    if (
      data.items &&
      data.category &&
      data.description &&
      data.pickupLocation &&
      data.deliveryLocation &&
      data.itemPrice &&
      data.errandFee &&
      pickupDate &&
      deliveryDate
    ) {
      props.location.state?.data === undefined
        ? axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/errands/create-errand`, formData, {
              headers: {
                "x-auth-token": localStorage.getItem("jwt"),
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              history.push({
                pathname: `/stripe/payment`,
                state: { errandData: response.data.errandInfo },
              });
            })
        : axios
            .patch(
              `${process.env.REACT_APP_SERVER_URL}/api/errands/${props.match.params.id}/update`,
              formData,
              {
                headers: {
                  "x-auth-token": localStorage.getItem("jwt"),
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((response) => {

              if (response.data.priceChange) {
                history.push({
                  pathname: `/stripe/payment`,
                  state: { errandData: response.data.errandInfo },
                });
              } else {
                history.push({
                  pathname: "/",
                });
              }
            })
            .catch((err) => {
              console.log(err.data);
            })
            .finally(() => {
              setIsLoading(false);
            });
    } else {
      window.alert("All field required")
      setIsLoading(false);
    }
  }

  return (

    <div className="add-row">
      <div className="add-errand-picture">
      <img src={process.env.PUBLIC_URL + "/personal-assistant-sitting.jpg"} alt="sitting"/>
      </div>
      <div className="add-main-container">
        <div className="add-container">
          <form method="POST" action="" />
          <h1>{!props.location.state ? "Create an Errand" : "Modify Errand"}</h1>
          <select
            className="input mb-3"
            aria-label=".form-select-lg example"
            name="category"
            value={data.category}
            onChange={handleChange}
            required
          >
            <option defaultValue> Select Categories</option>
            <option value="Grocery">Grocery Pick Up</option>
            <option value="Queue">Queue</option>
            <option value="Pet-Sitting">Pet Sitting Services</option>
            <option value="Nanny Services">Nanny Services</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Others">Others</option>
          </select>

          <div className="outer mb-3">
            
            <input
              onChange={handleChange}
              required
              type="text"
              className="input  "
              id="items"
              name="items"
              value={data.items}
              placeholder="Summary of Errand"
              
            />
          </div>

        <div className="outer mb-3">
          <label for="image" class="btn">Upload an Image of the Item/Errand</label>
            <input
              onChange={uploadImage}
              required
              className="input"
              id="image"
              type="file"
              name="newImage"
              placeholder="Upload an image of the item/errand"
            />
          </div>
          <div className="outer textbox mb-3">
            <textarea
              rows="5"
              onChange={handleChange}
              required
              type="text"
              className="input"
              id="description"
              name="description"
              placeholder="Description of Errand"
              value={data.description}
            />
          </div>

          <div className="outer mb-3">
            <input
              onChange={handleChange}
              required
              type="text"
              className="input"
              id="pickupLocation"
              name="pickupLocation"
              placeholder="Postal code of errand/pickup location"
              value={data.pickupLocation}
            />
          </div>

          <div className="outer mb-3">
            <input
              onChange={handleChange}
              required
              type="text"
              className="input"
              id="deliveryLocation"
              name="deliveryLocation"
              placeholder="Postal code of delivery/ending location"
              value={data.deliveryLocation}
            />
          </div>
          <div className="outer date-inputs mb-3">
            <div className="inputDate">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  label="Start/Pick Up Time"
                  id="pickupTime"
                  name="pickupTime"
                  value={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="inputDate">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  label="End/Delivery Time"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={deliveryDate}
                  onChange={(date) => setDeliveryDate(date)}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="outer moneyDisplay mb-3">
            <input
              onChange={handleChange}
              required
              type="text"
              className="input"
              id="itemPrice"
              name="itemPrice"
              placeholder="Price of Items being purchased (if applicable)"
              value={data.itemPrice}
            />
          </div>
          <div className="outer moneyDisplay mb-3">
            <input
              onChange={handleChange}
              required
              type="text"
              className="input"
              id="errandFee"
              name="errandFee"
              placeholder="Amount you are willing to pay for the errand"
              value={data.errandFee}
            />
          </div>

          <br />

          {isLoading ? (
            <button onClick={handleClick} className="inputButton" disabled>
              {" "}
              {!props.location.state ? "Add Errand" : "Modify Details"}
              <i class="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button onClick={handleClick} className="inputButton">
              {" "}
              {!props.location.state ? "Add Errand" : "Modify Details"}
            </button>
          )}

          {id && (
            <button
              onClick={() => {
                history.goBack();
              }}
              className="inputButton"
            >
              Back to Previous
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddErrands;
