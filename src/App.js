import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Shared Components
import Register from "./components/pages/Register";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/Login";
 
//Buddy Components
import SiteHeader from "./components/utils/SiteHeader";
import ShowErrands from "./components/pages/home/Show_errands";
import CompletedErrands from "./components/pages/dashboard/Completed_errands";
import Dashboard from "./components/pages/dashboard/Dashboard";

//User components
import UserReview from './components/pages/dashboard/Review';
import ErrandCompleted from './components/pages/dashboard/Errand_completed';
import Payments from './components/pages/add_errand/stripe/Payment';
import AddErrands from './components/pages/add_errand/Add_errand';
import Success from './components/pages/add_errand/stripe/Success'
import Support from './components/pages/Support'
import Chat from './components/pages/home/chatbox/Chat'
import Request_reset_password from './components/utils/Request_reset_password'
import ResetPassword from './components/utils/ResetPassword'
import './App.scss'


function App() {
  const [isAuth, setAuth] = useState(false);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const displayReviews = (latestReview) => {
    setReviews([...reviews, latestReview]);
  };



  return (
    <div className="App">
      <SiteHeader setAuth={setAuth} isAuth={isAuth} />
      <div className="content">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          exact
          component={() => <Login setAuth={setAuth} />}
        />
        <Route path="/register" exact component={Register} />
        <Route
          path="/add-errand"
          exact
          render={(props) =>
            userId ? <AddErrands {...props} /> : <Redirect to="/login" />
          }
        />
        <Route path="/support" exact component={Support} />
        <Route path="/request-reset-password" exact component={Request_reset_password} />
        
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route path="/chat" 
          render={(props) =>
            userId ? (
              <Chat userId={userId} />
            ) : (
              <Redirect to="/login" />
            )
          } 
        />
        <Route path="/stripe/payment" exact component={Payments} />
        <Route
          path="/dashboard/:id"
          exact
          render={(props) =>
            userId ? (
              <Dashboard reviews={reviews} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/stripe/success" exact component={Success} />
        
        <Route path="/:id" exact component={ShowErrands} />
        <Route
          path="/:errantID/completed-errands"
          render={() => <CompletedErrands />}
        />

        {/* <Route path="/user/user-dashboard" exact component={UserDashboard} /> */}
        <Route
          path="/user/user-review"
          exact
          render={(props) => (
            <UserReview reviews={reviews} displayReviews={displayReviews} />
          )}
        />
        <Route
          path="/user/errand-completed"
          exact
          render={(props) => (
            <ErrandCompleted
              reviews={reviews}
              displayReviews={displayReviews}
            />
          )}
        />
        <Route path="/user/payment" exact component={Payments} />
        <Route path="/edit-errand/:id" exact component={AddErrands} />
        <Route path="/reset-password/:id/:token" exact component={ResetPassword} />
        {/* <Route path="/profile-update/:id" exact component={Register} /> */}
      </Switch>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}

export default App;
