import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

function ChatList({ id, name, img, bg }) {
  return (
    <li>
    <Link to="/chatting" state={{ id, name, img, bg }}>
      <span className="chats_img empty"><Link to="/profile" state={{ id, name, img, bg }}><img src={img} alt={name} /></Link></span>
      <span className="chats_cont">
        <span className="chats_name">{name}</span>
        <span className="chats_latest">Hello! This is a test message!</span>
      </span>
      <span className="chats_time"><span>15</span>:<span>33</span></span>
    </Link>
  </li>
  );
}

ChatList.propTypes = {
  id : PropTypes.number.isRequired,
  name : PropTypes.string.isRequired,
  img : PropTypes.string.isRequired
}

export default ChatList;