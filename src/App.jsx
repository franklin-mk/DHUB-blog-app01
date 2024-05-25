import React, { useState } from 'react';

import './App.css';
import Navbar from '../public/Navbar';
import Signup from '../public/Signup';
import Login from '../public/Login';
import Main from '../public/Main';

export default function App() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignup = () => {
    setIsNewUser(false);
    setIsAuthenticated(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
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
          <Main searchQuery={searchQuery} />
        </>
      )}
    </div>
  );
}
