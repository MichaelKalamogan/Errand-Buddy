import React from 'react';
import '../../style/Support.scss'

function Support(props) {
    return (
        <div className="FAQ-container">
            <div className="FAQ-picture">
                <img src={process.env.PUBLIC_URL + "/FAQ.jpg"} alt="FAQ"/>
            </div>
            <div className="faq">
                <p>
                    <h3>1. How do I create an errand on ErrandBuddy?</h3>
                    <h6>One of the easiest things to do on ErrandBuddy is to LIST your errand request! Here's a guide on how to list your first errand here on ErrandBuddy:
                    Go to "Find A Buddy" link to create an errand for a buddy to pick up. This buddy is also known as an errand runner. 
                    When creating an errand, remember to describe the errand in detail (more details, the better!) 
                    so that the runner can fully understand what he/she is committing to before acceopting your errand.
                    </h6>
                </p>

                <p>
                    <h3>2. How do I accept an errand on ErrandBuddy?</h3>
                    <h6>To accept an errand, simply select the listing you're interested in, followed by the “Accept” button.</h6>
                    <h6>
                        Once you have accepted, you can now chat with the errand requestor. In your chat conversation with a Buddy, 
                        you can now start asking the requestor more questions about the errand, request for more photos, and more on 
                        details of how the errand will proceed!
                    </h6>

                    <h6>
                        As ErrandBuddy is a marketplace for errand requestors and runners to connect,
                        users are free to decide on the kind of arrangements that they prefer or suits them best. Here are a few suggestions
                        on how to carry out errands:

                        <div>
                            <h6>Message the requestor beforehand to confirmt eh details of the deal.</h6>
                            <h6>Always do payment through the platfomr so that we can assist with any disputes.</h6>
                            <h6>We do not advice in transacting outside the platform and we will not be responsible for any disputes that may arise from such transactions.</h6>
                            <h6>Once details of the deal have been confirmed and agreed upon both users, proceed to accept the advertised errand.</h6>
                        </div>
                    </h6>

                    
                </p>

                <p>
                <h3>3. How do I make payment to an errand runner?</h3>
                <h6>ErrandBuddy is primarily a platform to allow errand requestors and errand runner to 
                    connect through buying and selling.</h6>
                <h6>We do not advice in transacting outside the platform and we will not be responsible for any disputes that may arise from such transactions.</h6>
                </p>
            </div>
        </div>
    );
}

export default Support;