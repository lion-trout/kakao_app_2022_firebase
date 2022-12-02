import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Auth from 'routes/Auth';
import Chats from 'routes/Chats';
import Chatting from 'routes/Chatting';
import Find from 'routes/Find';
import Friends from 'routes/Friends';
import More from 'routes/More';
import Profile from 'routes/Profile';
import MyProfile from 'routes/MyProfile';

function Router({isLoggedIn, userObj}) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Friends userObj={userObj} />} />
            <Route path='/chats' element={<Chats userObj={userObj} />} />
            <Route path='/find' element={<Find userObj={userObj} />} />
            <Route path='/more' element={<More userObj={userObj} />} />
            <Route path='/chatting' element={<Chatting userObj={userObj} />} />
            <Route path='/profile' element={<Profile userObj={userObj} />} />
            <Route path='/myprofile' element={<MyProfile userObj={userObj} />} />
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default Router;