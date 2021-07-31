
# Errand Buddy - Helping With Your Errands Daily

The intent of the site is to provide an online p2p marketplace for users to errands such as dog walks, pet sitting, picking up groceries, queuing for the latest phone or sneaker launch, etc. Users can list the errands they wish to outsource for a pre-determined fee and, other users (whom we call the buddy) can accept these errands.

* Built as part of a project for a software engineering course.
* Mern Stack App
* Can be accessed at the following url: https://thanks-buddy.herokuapp.com/
* Backend uses MongoDB, mongoose and Express. Can be accessed at the following url: https://github.com/MichaelKalamogan/Errand-Buddy-Backend


## Tech Stack / Libraries
* React.Js
* Javascript
* Node.Js
* Express
* Axios
* Mongoose
* MongoDB
* JsonWebToken
* Material UI
* Bootstrap
* Nodemailer
* Date fns
* Socket.io
* Timeago.js

## API Used
* Stripe
* Google map

![homepage-1](https://user-images.githubusercontent.com/79918648/127741343-c367b6a6-3783-44ff-9dd1-5604bbc84a1b.jpg)![homepage-2](https://user-images.githubusercontent.com/79918648/127741370-9981789f-09ce-40e5-8c1c-6229f6b382ce.jpg)


## App Features

*  New User can see lists of errands posted at the Homepage
* Clicking on a picture on the homepage, will go to the individual Errand's page, which will have a full description of the errand, location maps as well as the seller's ratings and reviews from past transactions.
*  After successful login/register , User can accept these errands. Users can also like the errands ( the Hearts at the bottom of each card ) which they want to shortlist or actually like. When liked, it will be under the user's likes and it will be reflected in his dashboard so that he can refer to his likes to go back to any errands that he previously liked. 
* They can also have a chat with the seller, in real-time, to ask more details about the errand. The chat utilises socket.io to pass the messages instantly and mongoDB to store the conversations and messages
![image of chat]
* User can also created their own errands for acceptance. When creating these errands, they will have to pay upfront the cost of the errand as well as the actual costs of the items (if any). The payment uses stripe gateway and upon successful payment, it will be reflected in their wallet. These errands will also be reflected in their dashboard for easy reference. 
![image of stripe payment and wallet]

*  Upon completion of errand, the amount of the whole errand is transferred from the seller's wallet to the buddy's wallet. An email is sent to both user and buddy. This uses nodemailer. 
* User can then submit review and ratings of the other user which will be reflected in user's dashboard.


#### Layout of website
* Bootstap and material ui frameworks were used to complement the css.
* The website was made to be mobile friendly (in progress).

#### Authentication
* Authentication is done by using jsonwebtoken and localstorage stores the token for authenticating the client side routes, where needed.
* Reset password uses jsonwebtoken to send a link, through nodemailer, that is valid for a short period of time.

#### Uploading of files
Images are uploaded to cloudinary using multer and streamify, so as to minimise any local disk storage: https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
* A cloudinary id was included in errand schemas to faciliate the deletion of previous images whenever there is an update to the image or the errand is deleted.

# Suggestions and Improvements
Will appreciate any suggestions and improvements to the code, layout, user interface or even the basic idea itself. Thank you. 

## Wireframes
<img src=https://github.com/MichaelKalamogan/Errand-Buddy-Frontend/blob/yaqin10/errand-buddy-fe/public/Readme/Wireframe1.jpeg width="500" height="400">
<img src=https://github.com/MichaelKalamogan/Errand-Buddy-Frontend/blob/yaqin10/errand-buddy-fe/public/Readme/Wireframe2.jpeg width="500" height="400">
<img src=https://github.com/MichaelKalamogan/Errand-Buddy-Frontend/blob/yaqin10/errand-buddy-fe/public/Readme/Wireframe3.jpeg width="500" height="400">



### Ratings & Review
<img src=https://github.com/MichaelKalamogan/Errand-Buddy-Frontend/blob/yaqin10/errand-buddy-fe/public/Readme/Ratings%20and%20review.png width="600" height="400">


## Restful Routes

| No      | Route    |   Url  | HTTP Verb   |   Description  |
| ------- | -------- | ------ | ----------- | -------------  | 
|  1      | Index    |   /    |   Get       |    Homepage    |


## User Routes
 
| No      | Route    | Url                    | HTTP Verb   | Description                    |
| ------- | -------- | --------------------   | ---------   | ---------------------------    | 
| 1       | Login    | /api/users/login       | Post        | Login to accept/create errands |
| 2       | Register | /api/users/register    | Post        | Register new user              |
| 3       | Dashboard| /api/users/dashboard   | Get         | User's dashboard with job history, details and wallet balance |
| 4       | Create   |/api/users/create-errand| Post        | Create errands with form data  |
| 5       | Edit     |/api/users/forgot-password| Post      | Form to submit reset password  |
| 6       | Reset Password| api/users/reset-password/:id/:token| Get | Page to reset password |
| 7       | Submit New Password | /api/users/reset-password/submit| Patch | Submit new password|


## Errand Routes

| No      | Route    | Url                    | HTTP Verb   | Description                    |
| ------- | -------- | --------------------   | ---------   | ---------------------------    | 
| 1       | Show     | /api/errands/show/:id     | Get       | Direct to show full details of the errand
| 2       | Accept   | /api/errands/:id/accepted | Post      | Update database which buddy has accepted the errand |
| 3       | Completed | /api/errands/:id/completed| Post     | Update database that the buddy has completed the errand |
| 4       | Review    | /api/errands/:id/completed/review| Post |  For buddy to post review and rating on the job |




## Area of Improvements

* Components in the dashboard page could further broken into several components
* The styling could be improved more
* Web app to be responsive e.g. mobile, tablet etc



