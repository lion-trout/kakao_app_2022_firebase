import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styles/Navigation.scss';

function Navigation() {
  return (
    <nav className='tab_bar'>
      <ul>
        <li>
          <NavLink end to="/" className={ ( { isActive } ) => (isActive ? "active" : "") }><i className="fa-solid fa-user"></i>Friends</NavLink>
        </li>
        <li>
          <NavLink to='/chats'><i class="fa-solid fa-comment"></i>Chats</NavLink>
        </li>
        <li>
          <NavLink to='/find'><i class="fa-solid fa-magnifying-glass"></i>Find</NavLink>
        </li>
        <li>
          <NavLink to='/more'><i class="fa-solid fa-ellipsis"></i>More</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;