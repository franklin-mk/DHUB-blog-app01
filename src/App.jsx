import React, { useState } from 'react';

import './App.css';
import Navbar from '../public/Navbar';
import Signup from '../public/Signup';
import Login from '../public/Login';
import Main from '../public/Main';

export default function App() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignup = () => {
    // Logic for signing up the user
    // For simplicity, we'll assume signup is always successful
    setIsNewUser(false);
    setIsAuthenticated(true);
  };

  const handleLogin = () => {
    // Logic for logging in the user
    // For simplicity, we'll assume login is always successful
    setIsAuthenticated(true);
  };

  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <div>
      {!isAuthenticated ? (
        isNewUser ? (
          <Signup onSignup={handleSignup} />
        ) : (
          <Login onLogin={handleLogin} />
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
