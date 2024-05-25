import React, { useState } from 'react';

export default function Login({ onLogin }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here
        // For simplicity, call the onLogin function to simulate successful login
        onLogin();
      };

    return (
            <div className="form-container">
                <div className="form-title">
                    <h2>DirectEd <br />Dev-HUB</h2>
                    <p className="motto">Connect,share and learn!</p>
                    <p>Login to continue/ <a href="../public/Signup">Signup</a></p>
                </div>
                
                <form onSubmit={handleSubmit} className="form" action="">
                    <label htmlFor="username">Username:</label>
                    <input 
                    className="form-input" 
                    type="text" 
                    id="username" 
                    placeholder='Enter username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    name="username" />
                    <br />

                   {/*  <label htmlFor="email">Email:</label>
                    <input 
                    className="form-input"
                    type="email"
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    name="email" /> */}

                    <label htmlFor="password">Password:</label>
                    <input 
                    className="form-input" 
                    type="password" 
                    id="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    name="password" />
                    <br />

                    <button 
                    className="form-submit"
                    type="submit">Login</button>
                    <br />

                    <p className="forgot">Forgot Password? <a href="#">Click here</a></p>
                </form>
            </div>
        )
}
