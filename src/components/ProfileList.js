import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProfileList({ id, name, email, img, bg }) {
  return (
    <li>
      <Link to='/profile' state={{ id, name, email, img, bg }}>
        <span className="profile_img empty"><img src={img} alt={name} /></span>
        <span className="profile_name">{name}</span>
        <span className="profile_messages">{email}</span>
      </Link>
    </li>
  );
}

ProfileList.propTypes = {
  id : PropTypes.number.isRequired,
  name : PropTypes.string.isRequired,
  email : PropTypes.string.isRequired,
  img : PropTypes.string.isRequired,
}

export default ProfileList;