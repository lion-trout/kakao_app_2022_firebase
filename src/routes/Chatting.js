import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { db } from "fbase";
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import Header from 'components/Header';
import 'styles/Chatting.scss';
import TextFactory from 'components/TextFactory';
import Text from 'components/Text';

function Chatting({userObj}) {
  const [texts, setTexts] = useState([]);

  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  if (location.state === undefined) {
    navigate('/');
  }
  
  const { name, img, bg } = location.state;

  useEffect(() => {
    const q = query(
      collection(db, "texts"),
      where("createId", "==", userObj.uid),
      orderBy("createAt", "asc")
    );
    onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      // console.log(newArray);
      setTexts(newArray);
    });
  }, []);

  return (
    <div className='chatting'>
      <Header
        heading = {name}
        leftItemLink = "/chats"
        leftItem = {<i className="fa-solid fa-angle-left"></i>}
        rightItem = {
          <>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-bars"></i>
          </>
        }
      />
      <main>
        <span className="date_info">Monday, October 17, 2022</span>
        <div className="chat_box other">
          <div className="other_info">
            <Link to="/profile" state={location.state}><span className="profile_img empty"><img src={img} alt={name} /></span></Link>
            <span className="profile_name">{name}</span>
          </div>
          <span className="chat">Hello!</span>
          <span className="chat">Hello! This is a test message. This is a test message. This is a test message.</span>
          <span className="chat">This is a test message.</span>
          <span className="chat_time"><span>17</span>:<span>33</span></span>
        </div>
        <div className='chat_box my'>
          {texts.map(text => (
            <Text
              key={text.id}
              textObj={text}
              isOwner={text.createId === userObj.uid}
            />
          ))}
        </div>
      </main>
      <TextFactory userObj={userObj} />
    </div>
  );
}

export default Chatting;