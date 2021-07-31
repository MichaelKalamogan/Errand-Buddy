import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory,useParams } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../../style/Dashboard.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Dashboard() {
  
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // To show the data in the dashboard according to whether user or buddy is chosen to view
  const [userTab, setUserTab] = useState(true)
  // const [selectedOption, setSelectedOption]= useState("option1")
  const changeUserTab = (event) => {
      // setSelectedOption(event.target.value)
      setUserTab(true)
  }
  const changeBuddyTab = (event) => {
    setUserTab(false)
    // setSelectedOption(event.target.value)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [liked, setliked] = useState([])

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}/retrieveLikes`)
    .then(response => {

      setliked(response.data)
    })
  }, ([]))

  const {id} = useParams()
  const history = useHistory()
  const token = localStorage.getItem("jwt");

  const [bool, setBool]= useState(true)
  const [user, setUser] = useState({
    user: {
      name: "",
      email: "",
      reviews: []
    },
    errands: {},
    balance: {balance: ""},
    jobFulfill: [
      {
        items: "",
        itemPrice: "",
        errandFee: "",
        image: "",
        _id:""
      },
    ],
    jobCreated: [
      {
        items: "",
        itemPrice: "",
        errandFee: "",
        image: "",
        _id:"",
        status:""
      },
    ],
    completed:[

    ]
  });

  const handleSubmit = (e) => {
       
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/errands/${ e }/completed`,{}, {
     headers: {
       "x-auth-token": token,
       "content-type": "application/json"
   }
    } ).then(response =>
    {
      setBool(!bool);
      history.push(`/${e}/completed-errands`)
      
    })
   }

   const handleEdit=(e)=> {
    history.push({
     pathname: `/edit-errand/${e._id}`,
     state: { data: e }
   }
    )}

  const handleDelete=(e)=> {
  
   axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/errands/${ e._id }/delete`,{
     headers: {
       "x-auth-token": token,
       "content-type": "application/json"
   }
   }).then(response => {

     setBool(!bool);
   });
  }

  const handleCancel = (e) => {

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/errands/${ e._id }/buddycancel`, {}, {
      headers: {
        "x-auth-token": token,
        "content-type": "application/json"
      }
    }).then(response => {
      setBool(!bool);
    });
  }
 const { name, email } = user.user;
 
 useEffect(() => {
   axios
     .get(`${process.env.REACT_APP_SERVER_URL}/api/users/dashboard`, {
       headers: {
         "x-auth-token": token,
         "content-type": "application/json",
       },
     })
     .then((response) => {

       setUser(response.data);
     });
 }, [bool]);

  const dashboardLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Buddy Links</h4>
        <ul className="list-group">
          <Link className="nav-link" to="/"></Link>
          
          
        </ul>
      </div>
    );
  };

  const buddyRating = () => {
    return (
      <div className="dashboard-card container mb-5">
        {
          user.user.reviews.length>0 ? 
          user.user.reviews.map((e,i) => (   
          
          <div className="inner-card col mb-3" key={i}>
            <div className="card-image">
              <img src={e.image} alt="Item" />
            </div>
            <div className="card-body">
              <Link to={{ pathname: `/${e.errand_id}`, state: { e } }}><h5 className="item-details">{e.errand_summary}</h5></Link>
              <h6>rating: {e.rating} <i className="fas fa-star"></i></h6>
              <h6>Feedback summary:{e.review}</h6>
              <h6>Rated by: {e.user_name}</h6>
            </div>
          </div>
          
         
          ))              
            :         
            (
          <div >
            <h3 className="dashboard-comments">No Completed Jobs Yet</h3>
          </div>
          )      
        } 
  
      </div>
    );
  };

  // Jobs created by User and already accepted by a buddy, but not completed yet
  const userInProgress = () => {
    return (
      <div className="dashboard-card mb-5">
        {
          user.jobFulfill.length>0 ? 
            user.jobFulfill.map((e,i) => (   
              
              <div className="inner-card mb-3" key={i}>
                <div className="card-image">
                  <img src={e.image} alt="Item" />
                </div>
                <div className="card-body">
                  <h5 className="item-details">{e.items}</h5>
                  <h6>Errand Fee: ${e.errandFee}</h6>
                  <h6>Items'Price: ${e.itemPrice}</h6>
                </div>
                <div className="button-div">
                  <button onClick={()=>handleEdit(e)}>Edit</button>
                </div>
              </div>
          ))              
            :         
            (
          <div>
            <h3 className="dashboard-comments">No Outstanding Jobs</h3>
          </div>
          )      
        }            
      </div>
    );
  };

  //Errands created by User and still available
  const errandPosted = () => {
    return (
      <div className="dashboard-card mb-5">
        {
          user.jobCreated.length>0 ? 
            user.jobCreated.map((e,i) => (   
              
              <div className="inner-card mb-3" key={i}>
                <div className="card-image">
                  <img src={e.image} alt="Item" />
                </div>
                <div className="card-body">
                  <h5 className="item-details">{e.items}</h5>
                  <h6>Errand Fee: ${e.errandFee}</h6>
                  <h6>Items'Price: ${e.itemPrice}</h6>
                </div>
                <div className="button-div">
                  <button onClick={()=>handleEdit(e)}>Edit</button>
                  <button onClick={()=>handleDelete(e)}>Delete</button>
                </div>
              </div>
          ))              
            :         
            (
          <div className="dashboard-comments">No Outstanding Jobs</div>
          )      
        }            
      </div>
    );
  };

  //Errands accept as a Buddy to perform
  const buddyErrandsAccepted = () => {
    return (
      <div className="dashboard-card mb-5">
        {
          user.buddyAccepted.length>0 ? 
            user.buddyAccepted.map((e,i) => (   
              
              <div className="inner-card mb-3" key={i}>
                <div className="card-image">
                  <img src={e.image} alt="Item" />
                </div>
                <div className="card-body">
                  <h5 className="item-details">{e.items}</h5>
                  <h6>Errand Fee: ${e.errandFee}</h6>
                  <h6>Items'Price: ${e.itemPrice}</h6>
                </div>
                <div className="button-div">
                  <button onClick={()=>handleCancel(e)}>Cancel</button>
                  <button onClick={()=>handleSubmit(e._id)}>Complete Errand 
                  </button>
                </div>
              </div>
          ))              
            :         
            (
          <div>
            <h3 className="dashboard-comments">No Outstanding Jobs</h3>
          </div>
          )      
        }            
      </div>
    );
  };

    // Errands completed as a Buddy
    const buddyErrandsCompleted = () => {
      return (
        <div className="dashboard-card mb-5">
          
          {
            user.completed.length>0 ? 
              user.completed.map((e,i) => (   
                <Link
                      to={{ pathname: `/${e._id}`, state: { e } }}
                      className=""
                      href=""
                      style={{ textDecoration: 'none'}}
                    >
                <div className="inner-card mb-3" key={i}>
                  <div className="card-image">
                    <img src={e.image} alt="Item" />
                  </div>
                  <div className="card-body">
                    <h5 className="item-details">{e.items}</h5>
                    <h6>Errand Fee: ${e.errandFee}</h6>
                    <h6>Items'Price: ${e.itemPrice}</h6>
                  </div>
                </div>
                </Link>
            ))              
              :         
              (
            <div>
              <h3 className="dashboard-comments">No Errands Completed yet. Accept a job and earn some extra $$$.</h3>
            </div>
            )      
          }  
         
        </div>
      );
    };

    const errandsLiked = () => {
      return (
        <div className="dashboard-card mb-3">
          
          {
            liked.length>0 ? 
              liked.map((e) => (    
                <div className="inner-card mb-3" key={e.errandId._id}>
                  <Link
                      to={{ pathname: `/${e.errandId._id}`, state: { e: e.errandId } }}
                      className=""
                      href=""
                      style={{ textDecoration: 'none'}}
                    >
                  <div className="card-image">
                    <img src={e.errandId.image} alt="Item" />
                  </div>
                  <div className="card-body">
                    <h5 className="item-details">{e.errandId.items}</h5>
                    <h6>Errand Fee: ${e.errandId.errandFee}</h6>
                    <h6>Items'Price: ${e.errandId.itemPrice}</h6>
                    <h6>{e.errandId.status}</h6>
                  </div>
                  </Link>
                </div>
            ))              
              :         
              (
            <div>
              <h3 className="dashboard-comments">No Errands Liked yet</h3>
            </div>
            )      
          }  
         
        </div>
      );
    };


  return (

    <div className="dashboard-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/create-background.jpg"})`,  backgroundRepeat: "no-repeat", backgroundSize:"cover"}} >
      <div className="header-tabs">
        <div>
          <input onClick={changeUserTab} defaultChecked value="option1" id="one" name="tabs" type="radio" />
          <label className="first-label" htmlFor="one"><i className="fa fa-pencil-square-o"></i> Errand Requestor</label>
        </div>
        <div>
          <input onClick={changeBuddyTab} value="option2" id="two" name="tabs" type="radio"/>
          <label htmlFor="two"><i className="fa fa-magic"></i> Errand Buddy</label>
        </div>
      </div>
      
      <div>
      <div title="Dashboard" description="  " className="user-summary">
        <div className="user-card mb-5 ">
          { userTab ?
            <h3 className="card-header">Requestor Information</h3>
            :
            <h3 className="card-header">Buddy Information</h3>
          }
          <ul className="list-group">
            <li className="list-group-item">Name: {name}</li>
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Balance: ${user.balance.balance}</li>
             
            { userTab ? 
                 <li className="list-group-item"> Total No of Errands Posted: {user.errands.length}</li>
                : <li className="list-group-item"> Total No of Errands Accepted: { user.buddyErrands.length } </li>
            }

            { userTab ? 
              <li className="list-group-item">Average Rating: {user.averageRating} </li>
              : null
            }
          </ul>
          <div className="dashboard-button">

          </div>

        </div>

      
      <div id="tabs">
        <Paper square className={classes.root}>
          <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
            
            <Tab icon={<DirectionsRunIcon/>} label="Errands In Progress" {...a11yProps(0)} />
            <Tab icon={<CheckBoxIcon />} label="Errands Completed" {...a11yProps(1)} />
            { userTab ? 
              <Tab icon={<HourglassEmptyIcon />} label="Errands Not Accepted Yet" {...a11yProps(2)}/>
              : <Tab icon={<FavoriteIcon />} label="Errands Liked" {...a11yProps(2)}/>
            }
          </Tabs>
        </Paper>


        {userTab ?
          (
            <div>
              <TabPanel value={value} index={0}>
                {userInProgress()}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {buddyRating()}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {errandPosted()}
              </TabPanel>
            </div>
          ) : 
          (
            <div>
              <TabPanel value={value} index={0}>
                {buddyErrandsAccepted()}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {buddyErrandsCompleted()}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {errandsLiked()}
              </TabPanel>
            </div>
            
          ) 
          }
     

      </div>

      </div>
      

    </div>

    </div>

      
  
    

  );
}