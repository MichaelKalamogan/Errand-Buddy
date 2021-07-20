import React, {useState} from "react";
import Layout from "../../Layout";
// import { isAuthenticated } from "../../auth";
import {Link} from "react-router-dom";
import Add_errand  from "./Add_errand";

const Payments = () => {

     return (
          <>
       <Layout title="Payment Page" description=" {Hi user!} "> </Layout>
         <div className="row">
           
           <div className="col-md-8 offset-md-2">Hello</div>

           
           <button className="btn btn-outline-primary">
       <Link to={`/user/user-dashboard`} className="navbar-item" href="">Confirm Payment
       </Link>
       </button>  
         </div>
         </>
      
     );
   };
   
   export default Payments;

//   import react from "react"

//   import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

// const Payment = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     // Get a reference to a mounted CardElement. Elements knows how
//     // to find your CardElement because there can only ever be one of
//     // each type of element.
//     const cardElement = elements.getElement(CardElement);

//     // Use your card Element with other Stripe.js APIs
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//     }
//   };

//   return (
//     <>
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//     </>
//   );
// };

// export default Payment