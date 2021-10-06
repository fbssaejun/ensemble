import {useState, useEffect, useRef, Fragment } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import classnames from 'classnames';
import { Avatar, IconButton } from '@mui/material';

import './Chat.scss';
import axios from 'axios';
const io = require('socket.io-client');


export default function Chat(props) {
  const [notify, setNotify] = useState("");
  const [status, setStatus] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [toUser, setToUser] = useState("");
  const [selected, setSelected] = useState(true);
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState([]);
  const socket = useRef(null);
  const currentUser = sessionStorage.length ? {id: sessionStorage.getItem('id'), username: sessionStorage.getItem('username')} : undefined;

  const userSelected = classnames('chat-user-button', {
    'chat-user-button--selected' : selected
  })

  const sendMessage = () => {
    console.log("emitting...");
    
    socket.current.emit('chat', {
      message: message,
      toUser: toUser,
      fromUser: currentUser.username,
    });
    setChatHistory((prev) => [...prev, {text: message, sender: `I say: `}]);
    setMessage("");
  }


  useEffect(() => {
    socket.current = io('/');
    if(currentUser) {
      console.log("the user is logged in")
      socket.current.on('connect', (event) => {
        console.log("connected", event);
        socket.current.emit('send-username', currentUser.username);
      });

      socket.current.on('notify', (msg) => {
        setNotify(msg);
      });
      
      socket.current.on('users-list', (users) => {
        console.log("got a list of users!");
        console.log("users:", users);
        setUsersList((prev) => users);
      })
      
      socket.current.on('private', (msg) => {
        console.log("GOT BACK PRIVATE MSG", msg)
        setChatHistory((prev) => [...prev, {text: msg.text, sender: `${msg.from}: `}]);
      })

      axios.get('/api/users/profileimgs/all').then((results) => {
        console.log("USER NAME", results)
        setProfilePic(() => results.data);
      })
      
      return () => socket.current.disconnect();
    }

  }, []);

  const mappedChatHistory = chatHistory.map((chat) => {
    return chat.sender.charAt(0) === "I" ? (<div  className="chat-message--right"><p>{chat.sender} {chat.text}.</p></div>) : (<div className="chat-message--left"><p>{chat.sender} {chat.text}.</p></div>)
  })

  const filterSelfList = usersList.filter((user) => {
    return user !== currentUser.username;
  })

  const findUserPic = profilePic.find((user) => user.username === filterSelfList[0]);
  console.log("found the user", findUserPic)

  const mappedUserList = filterSelfList.map((user) => {
      return (
        <IconButton id="chat-user-button" className={userSelected} type="button" onClick={() => {setToUser(user)
        setSelected((prev) => false)}}>
          <Avatar alt={currentUser.username} src={findUserPic ? findUserPic.profile_image : '/'} sx={{ width: 50, height: 50, border:(selected ? "3px solid darkgrey" : "3px solid green") }} />
        </IconButton>
      )
    })
  

  return (
    <Fragment>
      {open &&
      <div className="chat-window">
        <div className="chat-box-title"><h4>{notify}</h4></div>
        <div className="bottom-part-of-chat-window">
          <div className="message-box-container">
            <div className="messages-list">
              {mappedChatHistory}
            </div>
            <form 
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="message-input-form">
              <input className="input-message-box"
                type="text"
                placeholder="message"
                value={message}
                onChange={({target}) => {
                  const val = target.value;
                  setMessage(val);
                }}>
              </input>
              <span className="input-button-spacer"></span>
              <button className="send-message-button" type="submit"><SendIcon/></button>
            </form>
          </div>
          <div className="users-list-container">
            <ul className="users-list">
              {mappedUserList}
            </ul>
          </div>
        </div>
      </div>}
      <button className="open-chat-button" onClick={()=>setOpen(!open)}><ChatIcon/></button>
    </Fragment>)
}