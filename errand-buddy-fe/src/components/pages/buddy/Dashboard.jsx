import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Dashboard.scss'

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function IconLabelTabs() {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
       
    axios.post(`http://localhost:4000/api/errands/${ e }/completed`,{}, {
     headers: {
       "x-auth-token": token,
       "content-type": "application/json"
   }
    } ).then(response =>
    {
      setBool(!bool);
      history.push(`/buddy/${e}/completed-errands`)
      
    })
   }

   const handleEdit=(e)=> {
    history.push({
     pathname: `/user/edit-errand/${e._id}`,
     state: { data: e }
   }
    )}

  const handleDelete=(e)=> {

   axios.delete(`http://localhost:4000/api/errands/${ e._id }/delete`, {
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

  const transactionHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Job history</h3>
        <ul className="list-group">
        {
          user.completed.length>0 ? 
            user.completed.map((e) => (   
              
        <div class="d-flex p-1 bg-secondary text-white justify-content-between">
          <div> 
           
          <div class="p-2 bg-info flex-fill">Items: {e.items}</div>
          <div class="p-2 bg-info flex-fill">Item price: ${e.itemPrice}</div>
          <div class="p-2 bg-info flex-fill">Errand fee: $ {e.errandFee}</div>
          </div>
          <div class="p-2 bg-info flex-fill">
            
            <img src={e.image} alt="" width="100" height="100" />
          
          </div>
            </div>
          ))              
            :         
            (
          <div>no outstanding jobs</div>
          )      
}  
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
          {
          user.user.reviews.length>0 ? 
          user.user.reviews.map((e) => (   
              
        <div class="d-flex p-1 bg-secondary text-white justify-content-between">
          <div> 
              {console.log(e)}
          <div class="p-2 bg-info flex-fill">Item id: {e.errand_id}</div>
          <div class="p-2 bg-info flex-fill">rating: {e.rating} star</div>
          <div class="p-2 bg-info flex-fill">Feedback summary:{e.review}</div>
          </div>
          <div class="p-2 bg-info flex-fill">Rated by: {e.user_name}</div>
          </div>
          
         
          ))              
            :         
            (
          <div>no outstanding jobs</div>
          )      
} 
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
          user.jobFulfill.length>0 ? 
            user.jobFulfill.map((e) => (   
              
        <div class="d-flex p-1 bg-secondary text-white justify-content-between">
          <div> 
            
          <div class="p-2 bg-info flex-fill">Items: {e.items}</div>
          <div class="p-2 bg-info flex-fill">Item price: ${e.itemPrice}</div>
          <div class="p-2 bg-info flex-fill">Errand fee: $ {e.errandFee}</div>
          </div>
          <div class="p-2 bg-info flex-fill">
            
            <img src={e.image} alt="" width="100" height="100" />
            <button onClick={()=>handleSubmit(e._id)}>Complete Errand
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


  const errandPosted = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Errand Posted</h3>
{
          user.jobCreated.length>0 ? 
            user.jobCreated.map((e) => (   
              
        <div class="d-flex p-1 bg-secondary text-white justify-content-between">
          <div> 
            
          <div class="p-2 bg-info flex-fill">Items: {e.items}</div>
          <div class="p-2 bg-info flex-fill">Item price: ${e.itemPrice}</div>
          <div class="p-2 bg-info flex-fill">Errand fee: $ {e.errandFee}</div>
          </div>
          <div class="p-2 bg-info flex-fill">
            
            <img src={e.image} alt="" width="100" height="100" />
            <span>{e.status}
            </span>
            
            <button onClick={()=>handleEdit(e)}>Edit</button>
            <button onClick={()=>handleDelete(e)}>Delete</button>
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

    <div>
      <div title="Dashboard" description="  " className="user-summary">
        <div className="user-card mb-5 ">
          <h3 className="card-header">User Information</h3>
          <ul className="list-group">
            <li className="list-group-item">Name: {name}</li>
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Balance: ${user.balance.balance}</li>
            <li className="list-group-item"> Total No. of Errands Posted:</li>
            <li className="list-group-item">Total No. of Errands Performed:</li>
            <li className="list-group-item">Average Rating</li>
          </ul>
          <div className="dashboard-button">
            <button>
              <Link className="nav-link" to="/buddy/profile-update">
                Update Profile
              </Link>
            </button>
          </div>

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
            <Tab icon={<HourglassEmptyIcon />} label="Errands Not Accepted Yet" {...a11yProps(0)}/>
            <Tab icon={<DirectionsRunIcon/>} label="Errands In Progress" {...a11yProps(1)} />
            <Tab icon={<CheckBoxIcon />} label="Errands Completed" {...a11yProps(2)} />
            <Tab icon={<AssignmentIcon />} label="Buddy Jobs Performed" {...a11yProps(3)} />
            <Tab icon={<AssignmentIcon />} label="All Errands Posted" {...a11yProps(4)} />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
        {errandPosted()}
        </TabPanel>
        <TabPanel value={value} index={1}>
        {inProgress()}
        </TabPanel>
        <TabPanel value={value} index={2}>
        {buddyRating()}
        </TabPanel>
        <TabPanel value={value} index={3}>
        {transactionHistory()}
        </TabPanel>
        <TabPanel value={value} index={4}>
        {errandPosted()}
        </TabPanel>

      </div>

    </div>
    

  );
}

