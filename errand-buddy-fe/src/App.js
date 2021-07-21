import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  useParams
} from 'react-router-dom';

//Shared Components
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';

//Buddy Components
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import ShowErrands from './components/pages/buddy/Show_errands';
import CompletedErrands from './components/pages/buddy/Completed_errands';
import Dashboard from './components/pages/buddy/Dashboard';

//User components
import UserReview from './components/pages/users/User_review';
import ErrandCompleted from './components/pages/users/Errand_completed';
import Payments from './components/pages/users/Payment';
import AddErrands from './components/pages/users/Add_errand';
import ErrandRequest from './components/pages/users/Errand_request';




const App=()=> {

  const [auth, setAuth] = useState({username:'',userId: '', 
isAuth:false});
  const [reviews, setReviews] = useState([]);
  
  const displayReviews = (latestReview) => {
    setReviews([...reviews, latestReview]);
  }
    return (
      <div className="app">
        
        <Router>
          
          <BrowserRouter>
          <SiteHeader setAuth={setAuth} auth={auth}/>
            <Switch>
              <Route
                path="/buddy/:errantID/completed-errands"
                exact
                render = { () => (<CompletedErrands />)}
              />
              <Route
                path="/:id/dashboard"
                exact
                render={(props) => ( <Dashboard reviews={reviews} />)}
              />
              <Route path="/buddy/:id" exact component={ShowErrands} />
              <Route path="/" exact component={()=> <Home auth={auth}/>}  />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={()=> <Login setAuth={setAuth} />} />
              <Route path="/user/user-review" exact render={(props) => (<UserReview reviews={reviews} displayReviews={displayReviews}/>)} />
              <Route path="/user/errand-completed" exact render={(props) => (<ErrandCompleted reviews={reviews} displayReviews={displayReviews} />)} />
              <Route path="/user/payment" exact component={Payments} />
              <Route path="/user/add-errand" exact component={AddErrands} />
              <Route path="/user/edit-errand/:id" exact component={AddErrands} />
              <Route path="/errand-request" exact component={ErrandRequest} />
              <Home />
            </Switch>
          </BrowserRouter>

          {/* <SiteFooter /> */}
        </Router>
      </div>
    );
  }


export default App;
