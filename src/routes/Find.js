import React from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import 'styles/Find.scss';

function Find() {
  return (
    <>
      <Header
        heading = "Find"
        leftItem = "Edit"
        rightItem = {<i className="fa-solid fa-gear"></i>}
      />
      <main>
        <ul className="find_method">
          <li><Link to="#"><i className="fa-solid fa-address-book"></i>Find</Link></li>
          <li><Link to="#"><i className="fa-solid fa-qrcode"></i>QR Code</Link></li>
          <li><Link to="#"><i className="fa-solid fa-mobile-screen-button"></i>Shake</Link></li>
          <li><Link to="#"><i className="fa-solid fa-envelope"></i>Invite via SNS</Link></li>
        </ul>
        <section className="recommend_section">
          <header><h2>Recommended Friends</h2></header>
          <ul>
            <li>You have no recommended friends.</li>
          </ul>
        </section>
      </main>
      <Navigation />
    </>
  );
}

export default Find;