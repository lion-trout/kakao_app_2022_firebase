import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import ChatList from 'components/ChatList';
import profileImage from 'data/memberList.json';
import 'styles/Chats.scss';

function Chats() {
  const [profiles, setProfiles] = useState([]);

  const getProfiles = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
    setProfiles(data);
  };
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Header
        heading = "Chats"
        num = {profiles.length-1}
        leftItem = "Edit"
        rightItem = {<i className="fa-solid fa-gear"></i>}
      />
      <main>
        <form className="search_box">
          <fieldset className="search_inner">
            <legend className="blind">검색창</legend>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" name="search" id="search" placeholder="Find Friends, Chats, Plus Friends" />
          </fieldset>
        </form>
        <section className="main_section">
          <header className="blind"><h2>Friends</h2></header>
          <ul>
            {profiles.map((profile, idx) => {
              if (idx !== 0) {
                return (
                  <ChatList
                    key = {profile.id}
                    name = {profile.name}
                    img = {profileImage[idx].image}
                    bg = {profileImage[idx].bg}
                  />
                )
              }
            })}
          </ul>
        </section>
        <div className="chat_fa_btn">
          <Link to="#"><i className="fa-solid fa-comment"></i></Link>
        </div>
      </main>
      <Navigation />
    </>
  );
}

export default Chats;