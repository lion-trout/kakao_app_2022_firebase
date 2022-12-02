import React from 'react';
import { authService, db, storage } from "fbase";
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import 'styles/More.scss';

function More({userObj}) {
  return (
    <>
      <Header
        heading = "More"
        rightItem = {<i className="fa-solid fa-gear"></i>}
      />
      <main>
        <section className="user_info">
          <h2 className="blind">사용자 정보</h2>
          <span className="profile_img empty"><img src={userObj.photoURL} alt={userObj.displayName+" image"} /></span>
          <span className="profile_info">
            <span className="profile_name">{userObj.displayName}</span>
            <span className="profile_email">{userObj.email}</span>
          </span>
          <span className="chat_img"><Link to="/chats"><i className="fa-solid fa-comment"></i></Link></span>
        </section>
        <section className="user_menu">
          <h2 className="blind">사용자 메뉴</h2>
          <ul>
            <li><Link to="#"><i className="fa-regular fa-face-smile"></i>
            Emoticons</Link></li>
            <li><Link to="#"><i className="fa-solid fa-palette"></i>Themes</Link></li>
            <li><Link to="#"><i className="fa-regular fa-hand-peace"></i>Plus Friends</Link></li>
            <li><Link to="#"><i className="fa-regular fa-circle-user"></i>Account</Link></li>
          </ul>
        </section>
        <section className="plus_friends">
          <header>
            <h2>Plus Friends</h2>
            <span><i className="fa-solid fa-circle-info"></i> Learn More</span>
          </header>
          <ul className="plus_list">
            <li><Link to="#"><i className="fa-solid fa-utensils"></i>Order</Link></li>
            <li><Link to="#"><i className="fa-solid fa-house"></i>Store</Link></li>
            <li><Link to="#"><i className="fa-solid fa-tv"></i>TV Channel/Radio</Link></li>
            <li><Link to="#"><i className="fa-solid fa-pencil"></i>Creation</Link></li>
            <li><Link to="#"><i className="fa-solid fa-graduation-cap"></i>Education</Link></li>
            <li><Link to="#"><i className="fa-solid fa-building-columns"></i>Politics/Society</Link></li>
            <li><Link to="#"><i className="fa-solid fa-won-sign"></i>Finance</Link></li>
            <li><Link to="#"><i className="fa-solid fa-video"></i>Movies/Music</Link></li>
          </ul>
        </section>
        <section className="more_app">
          <h2 className="blind">앱 더보기</h2>
          <ul>
            <li><Link to="#"><span className="app_icon"></span>Kakao Story</Link></li>
            <li><Link to="#"><span className="app_icon"></span>Path</Link></li>
            <li><Link to="#"><span className="app_icon"></span>Kakao Friends</Link></li>
          </ul>
        </section>
      </main>
      <Navigation />
    </>
  );
}

export default More;