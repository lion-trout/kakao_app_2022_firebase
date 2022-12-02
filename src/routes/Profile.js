import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import 'styles/Profile.scss';

function Profile() {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  if (location.state === undefined) {
    navigate('/');
  }
  
  const { id, name, email, img, bg } = location.state;

  return (
    <div className='profile'>
      <Header
        h1Class = "blind"
        heading = "Profile"
        leftItemLink = "/"
        leftItem = {<i className="fa-solid fa-angle-left"></i>}
        rightItem = {<i className="fa-solid fa-user"></i>}
      />
      <main>
        <section className="background">
          <h2 className="blind">My Profile Background</h2>
          <img src={bg} alt={name+" bg"} />
        </section>
        <section class="profile">
          <h2 class="blind">Friend's Profile Info</h2>
          <div class="profile_img empty"><img src={img} alt={name} /></div>
          <div class="profile_cont">
            <span class="profile_name">{name}</span>
            <input type="mail" class="profile_email" placeholder={email} />
            <ul class="profile_menu">
              <li>
                <Link to="/chats"><span class="icon"><i class="fa-solid fa-comment"></i></span>My Chatroom</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;