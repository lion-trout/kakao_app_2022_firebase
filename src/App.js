import { useEffect, useState } from 'react';
import Router from 'Router';
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faTwitter, faGoogle, faGithub)

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      // console.log(user);
      if (user) {
        // signed in
        setIsLoggedIn(user);
        setUserObj(user);
        // const uid = user.uid;
      } else {
        // signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  
  return (
    <>
      {init ? <Router isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "initializing..."}
    </>
  );
}

export default App;