import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from "react";
import Axios from 'axios';

function Likes(props) {

    const variable = { errandId: props.errandId, userId: props.userId}
    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    useEffect( () => {

        Axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/errands/like`, variable)
        .then(response => {
            if(response.data.success) {
                
                setLikes(response.data.likes.length)

                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('failed to get likes')
            }
        })
    }, [])

    const onLike = () => {

        if(!props.userId) {

            alert('Log in to like a post')
            return
        }
        
        if(LikeAction === null)  {

            Axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/errands/like/addLike`, variable)
            .then(response => {
                if (response.data.success) {

                    setLikes(Likes + 1)
                    setLikeAction('liked')

                } else {
                    alert('failed to add like')
                }
            })

        } else {

            Axios.post(`http://${process.env.REACT_APP_SERVER_URL}/api/errands/like/removeLike`, variable)
            .then(response => {
                if (response.data.success) {

                    setLikes(Likes - 1)
                    setLikeAction(null)

                } else {
                    alert('failed to remove like')
                }
            })
        }
    }

    return (
        <div className="card-like">
            { LikeAction === 'liked' 
            ?
            <i className="fas fa-heart" onClick={onLike} style={{color: "red"}}></i>

            : <i className="far fa-heart" onClick={onLike}></i>
            }
            <span className="likes-amt">{Likes}</span>
        </div>
    );
}

export default Likes;