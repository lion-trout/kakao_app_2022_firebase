import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import ProfileList from 'components/ProfileList';
import MyProfileList from 'components/MyProfileList';
import profileImage from 'data/memberList.json';
import 'styles/Friends.scss';
import { Link } from 'react-router-dom';

function Friends({userObj}) {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setProfiles(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) return <div className='load'><span>Loading...</span></div>; 

  return (
    <>
      <Header
        heading = "Friends"
        num = {profiles.length-1}
        leftItem = "Manage"
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
          <header><h2>My Profile</h2></header>
          <ul>
            {/* <ProfileList
              key = {[0].id}
              name = {[0].name}
              email = {[0].email}
              img = {profileImage[0].image}
            /> */}
            <MyProfileList
              key = {userObj.id}
              name = {userObj.displayName}
              email = {userObj.email}
              img = {userObj.photoURL}
              bg = {profileImage[0].bg}
            />
          </ul>
        </section>
        <section className="main_section">
          <header><h2>Friends</h2></header>
          <ul>
            {profiles.map((profile, idx) => {
              if (idx !== 0) {
                return (
                  <ProfileList
                    key = {profile.id}
                    name = {profile.name}
                    email = {profile.email}
                    img = {profileImage[idx].image}
                    bg = {profileImage[idx].bg}
                  />
                )
              }
            })}
          </ul>
        </section>
      </main>
      <Navigation />
    </>
  );
}

export default Friends;