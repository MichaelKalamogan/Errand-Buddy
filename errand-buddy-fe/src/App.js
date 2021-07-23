import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Shared Components
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";

//Buddy Components
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ShowErrands from "./components/pages/buddy/Show_errands";
import CompletedErrands from "./components/pages/buddy/Completed_errands";
import BuddyDashboard from "./components/pages/buddy/Buddy_dashboard";

//User components

import UserDashboard from './components/pages/users/User_dashboard';
import UserReview from './components/pages/users/User_review';
import ErrandCompleted from './components/pages/users/Errand_completed';
import Payments from './components/Stripe/Payment';
import AddErrands from './components/pages/users/Add_errand';
import ErrandRequest from './components/pages/users/Errand_request';
import Success from './components/Stripe/Success'
import Support from './components/pages/Support'


function App() {
  const [isAuth, setAuth] = useState(false);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  // const token = localStorage.getItem("jwt")

  const displayReviews = (latestReview) => {
    setReviews([...reviews, latestReview]);
  };

  // const id = localStorage.getItem("jwt");
  // // const {id} = localStorage;
  // console.log(id, "localstorage userID");
  // const {userID} = useParams();

  return (
    <div className="app">
      <SiteHeader setAuth={setAuth} isAuth={isAuth} />
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
        <Route path="/stripe/payment" exact component={Payments} />
        <Route
          path="/dashboard/:id"
          exact
          render={(props) =>
            userId ? (
              <BuddyDashboard reviews={reviews} />
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
        {/* <Route path="/profile-update/:id" exact component={Register} /> */}
      </Switch>

      <SiteFooter />
    </div>
  );
}

export default App;
