import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService, db, storage } from "fbase";
import { updateProfile } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Header from 'components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'styles/MyProfile.scss';

function MyProfile({userObj}) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newDisplayEmail, setNewDisplayEmail] = useState(userObj.email);
  const [attachment, setAttachment] = useState(userObj.photoURL);
  console.log(userObj);

  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  if (location.state === undefined) {
    navigate('/');
  }
  const { id, name, bg } = location.state;

  const onChange = e => {
    const {target: {value}} = e;
    setNewDisplayName(value);
    // console.log(newDisplayName);
  }
  const onChangeEmail = e => {
    const {target: {value}} = e;
    setNewDisplayEmail(value);
    // console.log(newDisplayEmail);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(ref(storage, response.ref));
    }

    if (userObj.displayName !== newDisplayName || userObj.photoURL !== attachmentUrl) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
        photoURL: attachmentUrl
      });
    }
  };

  const onFileChange = e => {
    // console.log(e.target.files);
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {currentTarget: {result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => setAttachment("");

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
        <form onSubmit={onSubmit}>
          <section className="background">
            <h2 className="blind">My Profile Background</h2>
            <img src={bg} alt={name+" bg"} className='bg_img'/>
          </section>
          <section class="profile">
            <h2 class="blind">My Profile Info</h2>
            <div class="profile_img empty"><img src={attachment} alt='' /></div>
            <div class="profile_cont">
              <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplayName} required className='formInput' />
              <input type="mail" placeholder={newDisplayEmail} onChange={onChangeEmail} className='formInput' />
              <ul class="profile_menu">
                <li>
                  <Link to="/chats"><span class="icon"><i class="fa-solid fa-comment"></i></span>My Chatroom</Link>
                </li>
                <li>
                  <label htmlFor='attach-file' className='profileInput__label'>
                    <span class="icon"><FontAwesomeIcon icon="fa-solid fa-plus" /></span><strong>Upload</strong>
                  </label>
                  <input type="file" accept="image/*" onChange={onFileChange} id='attach-file' style={{opacity: 0}} />
                </li>
                <li>
                  {attachment && (
                    <div className='profileForm__attachment'>
                      <div onClick={onClearAttachment} className='profileForm__clear'>
                        <span>Clear</span>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <input type="submit" value="완료" className='formBtn' />
                </li>
              </ul>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}

export default MyProfile;