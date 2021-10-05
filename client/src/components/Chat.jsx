import {useState, useEffect, useRef } from 'react';
import './Chat.scss';
const io = require('socket.io-client');


export default function Chat(props) {
  const [notify, setNotify] = useState("");
  const [status, setStatus] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [toUser, setToUser] = useState("");
  const [open, setOpen] = useState(false);
  const socket = useRef(null);
  const currentUser = sessionStorage.length ? {id: sessionStorage.getItem('id'), username: sessionStorage.getItem('username')} : undefined;

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const sendMessage = () => {
    console.log("emitting...");
    
    socket.current.emit('chat', {
      message: message,
      toUser: toUser,
      fromUser: currentUser.username,
    });
    setChatHistory((prev) => [...prev, {text: message, sender: "I say:"}]);
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
        setChatHistory((prev) => [...prev, {text: msg.text, sender: `${msg.from} says:`}]);
      })
      
      return () => socket.current.disconnect();
    }

  }, []);

  const mappedChatHistory = chatHistory.map((chat) => {
    return <li>{chat.sender} {chat.text}.</li>
  })

  const filterSelfList = usersList.filter((user) => {
    return user !== currentUser.username;
  })

  const mappedUserList = filterSelfList.map((user) => {
    return <button type="button" onClick={() => setToUser(user)}>Chat {user}</button>
  })

  return (
    open ? 
    (<div className="chat-window">
      <button className="close-chat-button" onClick={handleClose}>x</button>
      <h1>CHAT BOX {notify}</h1>
      <div className="bottom-part-of-chat-window">
        <div className="message-box-container">
          <ul className="messages-list">
            {mappedChatHistory}
          </ul>
          <form onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}className="message-input-form">
            <input 
              type="text"
              placeholder="message"
              value={message}
              onChange={({target}) => {
                const val = target.value;
                setMessage(val);
              }
            }></input>
            <input 
              type="text" 
              placeholder="to user..." 
              value={toUser} 
              onChange={({target}) => {
                const val = target.value;
                setToUser(val);
              }  
            }></input>
            <button type="submit">Enter</button>
          </form>
        </div>
        <div className="users-list-container">
          <ul className="users-list">
            {mappedUserList}
          </ul>
        </div>
      </div>
    </div>)
    :
    (<button className="open-chat-button" onClick={handleOpen}>+</button>) 
  )
}