import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../../../../style/Chat.scss";
import Conversation from './Conversation';
import Message from './Message';
import {io} from "socket.io-client";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
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
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#6A6C75",
      width: "fit-content",

    },
}));

function Chat(props) {

    const [buddyConversations, setBuddyConversations] = useState([])
    const [sellerConversations, setSellerConversations] = useState([])   
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [searchField, setSearchField] = useState("")
    const [friend, setFriend] = useState("")
    const [receiverId, setReceiverId] = useState("")
    const socket = useRef()
    const scrollRef = useRef()

    const user_name = localStorage.getItem('username')
    
    useEffect(()=>{

        if(currentChat) {
            if (currentChat.buyer === user_name) {
                arrivalMessage && arrivalMessage.sender === currentChat.seller &&
                setMessages((prev) => [...prev, arrivalMessage])
            } else {
                arrivalMessage && arrivalMessage.sender === currentChat.buyer &&
                setMessages((prev) => [...prev, arrivalMessage])
            }
        }

        
    }, [arrivalMessage, currentChat, user_name])

    useEffect(() => {
        socket.current = io()
        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()

            })
        })
    }, []) 

    useEffect(() => {
       socket.current.emit("addUser",user_name)
       socket.current.on("getUsers", users=> {
           console.log(users)
       })
    },[user_name]) 
    

    let buyerChats = buddyConversations.filter( item =>
        { if (item.errand_desc.toLowerCase().includes(searchField.toLowerCase()) ||
            item.seller.toLowerCase().includes(searchField.toLowerCase()))
            return true 
        }
    )

    let sellerChats = sellerConversations.filter( item =>
        { if (item.errand_desc.toLowerCase().includes(searchField.toLowerCase()) ||
            item.buyer.toLowerCase().includes(searchField.toLowerCase()))
            return true 
        }
    )   
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const message = {
            sender: user_name,
            text: newMessage.trim(),
            conversationId: currentChat._id
        }

        socket.current.emit('sendMessage', {
            senderId: user_name,
            receiverId: receiverId,
            text: newMessage

        })

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/chats/newmessage`, {message})
        .then(res => {
            setMessages([...messages, res.data])
            setNewMessage("")

        })
    }



    useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/api/chats/buyerconversations/` + user_name)
      .then(res => {

          setBuddyConversations(res.data)
      })
      .catch((error) => {
        console.log('error')
      })
    }, [user_name])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/chats/sellerconversations/` + user_name)
        .then(res => {

            setSellerConversations(res.data)

        })
        .catch((error) => {
          console.log('error')
        })
      }, [user_name])
 
    useEffect(() => {
        
        if(currentChat) {   
            
            if (currentChat.buyer === user_name) {
                setReceiverId(currentChat.seller)
            } else {
                setReceiverId(currentChat.buyer)
            }
               
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/chats/` + currentChat?._id)
            .then(res => {

                setMessages(res.data)
            })
        }

    }, [currentChat, user_name])

    useEffect(() => {
        console.log('testing')
        scrollRef.current?.scrollIntoView()

    }, [messages])

    //Material-UI for tabs
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className="chat-container">
            <div className="chat-picture">
                <img src={process.env.PUBLIC_URL + "/chat.jpg"} alt="chat"/>
            </div>
            <div className="chat">
            <div className="errand-chats">
                <div className="search-chat">
                    <input type="text" placeholder="Search Chats" onChange={e => {setSearchField(e.target.value)}}/>

                </div>
                <div className="conversationsBox">

                <div className={classes.root} style={{margin: "0 auto"}}>
                    <AppBar position="static" color="default">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        >
                        <Tab label="Requestor" {...a11yProps(0)} />
                        <Tab label="Buddy" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >   
                        <TabPanel className="chat-tab" value={value} index={0} dir={theme.direction}>
                            {sellerChats.map((item)=> (
                                <div onClick={() => {setCurrentChat(item); setFriend(item.buyer)}}>
                                    <Conversation conversation={item} currentUser={user_name}/>
                                </div>
                            ))}   
                        </TabPanel>
                        
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            {buyerChats.map((item)=> (
                                <div onClick={() => {setCurrentChat(item); setFriend(item.seller)}}>
                                    <Conversation conversation={item} currentUser={user_name}/>
                                </div>
                            ))}
                        </TabPanel>                        
                    </SwipeableViews>
                </div>
                </div>
                
                
            </div>
                
            <div className="main-chat">
                <div className="main-wrapper">
                    {                     
                        currentChat ? 
                        (
                        <>  
                        <div class="chat-about">
                            <div class="chat-with">Chat with {friend}</div>
                            <div class="chat-num-messages">{messages.length} messages</div>
                        </div>                      
                        <div className="chatBoxTop">
                            {messages.map(msg => (
                                <div ref={scrollRef}>
                                <Message message={msg} own={msg.sender === user_name}/>
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea 
                                className="chatInput" 
                                placeholder="Type Here" 
                                onChange={e => setNewMessage(e.target.value)}
                                value={newMessage}
                                rows="3"
                            >
                            </textarea>
                            { newMessage.trim() === "" ? 
                                (<button className="chatSubmit" onClick={handleSubmit} disabled style={{color: "grey", backgroundColor: "lightgrey"}}>Send</button>) 
                                : 
                                (<button className="chatSubmit" onClick={handleSubmit}>Send</button>)
                            }
                            
                        </div>
                        </>
                        ) 
                        : 
                        <span className="noConversation">Open a Conversation to start a Chat</span>
                    }
                </div>
            </div>
                
            
        </div>


        </div>
        
    );
}

export default Chat;