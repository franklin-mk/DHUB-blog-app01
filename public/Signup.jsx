import React, { useState } from 'react';

export default function Signup({ onSignup }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform signup logic here
        // For simplicity, call the onSignup function to simulate successful signup
        onSignup();
      };

    return (
            <div className="form-container">
                <div className="form-title">
                    <h1>DirectEd <br />Dev-HUB</h1>
                    <p className="motto">Connect,share and learn!</p>
                    <p>Signup to continue/ <a href="../public/Login">Login</a></p>
                </div>
                
                <form 
                    onSubmit={handleSubmit}         className="form" 
                    action="">
                    <label htmlFor="username">Username:</label>
                    <input 
                        className="form-input" 
                        type="text" 
                        id="username" 
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    <br />

                    <label htmlFor="email">Email:</label>
                    <input 
                    className="form-input"
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />

                    <label htmlFor="password">Password:</label>
                    <input 
                    className="form-input" 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                    <br />

                    <button 
                    className="form-submit"
                    type="submit">Sign Up</button>
                </form>
            </div>
        )
}
