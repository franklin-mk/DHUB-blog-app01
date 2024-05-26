import React, { useState } from 'react';

import { onSnapshot } from "firebase/firestore"
import {blogssCollection} from "../firebase"

import './App.css';
import Navbar from '../public/Navbar';
import Signup from '../public/Signup';
import Login from '../public/Login';
import Main from '../public/Main';

export default function App() {
  const [blogs, setBlogs] = React.useState([])

  const [isNewUser, setIsNewUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState(""); // State for storing the logged-in username

  //firebase
  React.useEffect(() => {
    const unsubscribe = onSnapshot(blogssCollection, function(snapshot){
      
    })
    return unsubscribe;
}, [])

  const handleSignup = (username) => {
    setIsNewUser(false);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function switchLoginSignup() {
    setIsNewUser(!isNewUser);
  }

  return (
    <div>
      {!isAuthenticated ? (
        isNewUser ? (
          <Signup 
            toggleSwitch={switchLoginSignup}
            onSignup={handleSignup}
             />
        ) : (
          <Login 
            toggleSwitch={switchLoginSignup}
            onLogin={handleLogin}
             />
        )
      ) : (
        <>
          <Navbar onSearch={handleSearch} />
          <Main searchQuery={searchQuery} username={username} /> {/* Pass username to Main */}
        </>
      )}
    </div>
  );
}
