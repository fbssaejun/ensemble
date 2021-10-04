import {useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.scss';

export default function Chat(props) {
  const [notify, setNotify] = useState([]);
  const [status, setStatus] = useState({});
  const [message, setMessage] = useState("");
  const [toUser, setToUser] = useState("");
  const [open, setOpen] = useState(false);
  const currentUser = sessionStorage.length ? {id: sessionStorage.getItem('id'), username: sessionStorage.getItem('username')} : undefined;

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const sendMessage = () => {
    const socket = io("/");
    socket.emit('chat', { message: message, toUser: toUser, fromUser: currentUser.username })
    setMessage("");
    setToUser("");
  }

  useEffect(() => {
    const socket = io("/");
    if(currentUser) {
      console.log("the user is logged in")
      socket.on('connect', (event) => {
        console.log("connected", event);
        socket.emit('send-username', currentUser.username);
      });


      socket.on('notify', msg => {
        setNotify(prev =>[...prev, msg]);
        // notify.length && console.log(notify)
      });
      
      socket.on('private', msg => {
        console.log("GOT BACK PRIVATE MSG", msg)
      })
      
      return () => socket.disconnect();
    }

  }, []);

  return (
    open ? 
    (<div className="chat-window">
      <button className="close-chat-button" onClick={handleClose}>x</button>
      <h1>CHAT BOX {notify}</h1>
      <div className="bottom-part-of-chat-window">
        <div className="message-box-container">
          <ul className="messages-list">
            <li>Message 1</li>
            <li>Message 2</li>
            <li>Message 3</li>
          </ul>
          <form className="message-input-form">
            <input 
              type="text" 
              placeholder="message" 
              value={message} 
              onChange={({target}) => {
                const val = target.value;
                setMessage(val)
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
            {/* <input type="text" placeholder="to user" value={toUser} onChange={({target}) => setToUser(target.value)}></input> */}
            <button type="button" onClick={(event) => {
              event.preventDefault();
              sendMessage();
            }}>Enter</button>
          </form>
        </div>
        <div className="users-list-container">
          <ul className="users-list">
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
          </ul>
        </div>
      </div>
    </div>)
    :
    (<button className="open-chat-button" onClick={handleOpen}>+</button>) 
  )
}