import React, { useState } from 'react';

export default function Login({ onLogin, toggleSwitch }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            onLogin();
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="form-container">
            <div className="form-title">
                <h2>DirectEd <br />Dev-HUB</h2>
                <p className="motto">Connect, share and learn!</p>
                <p>
                    Login to continue/
                    <span id='switchLogin' onClick={toggleSwitch}>Signup</span>
                    </p>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="username">Username:</label>
                <input
                    className="form-input"
                    type="text"
                    id="username"
                    placeholder='Enter username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                />
                <br />

                <label htmlFor="password">Password:</label>
                <input
                    className="form-input"
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    name="password"
                />
                {error && <p id='invalid-error' className="error">{error}</p>}
                <br />

                <button
                    className="form-submit"
                    type="submit">Login
                </button>
                <br />

                <p className="forgot">Forgot Password? <a href="https://m.media-amazon.com/images/I/31O4v0lLcHL._SY466_.jpg">Click here</a></p>
            </form>
        </div>
    );
}
