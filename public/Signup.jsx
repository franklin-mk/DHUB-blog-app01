import React, { useState } from 'react';

export default function Signup({ onSignup, toggleSwitch}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const newUser = { username, password };
        localStorage.setItem("user", JSON.stringify(newUser));
        onSignup();
    };

    return (
        <div className="form-container">
            <div className="form-title">
                <h2>DirectEd <br />Dev-HUB</h2>
                <p className="motto">Connect, share and learn!</p>
                <p>
                    Signup to continue/
                    <span id='switchLogin' onClick={toggleSwitch}>Login</span>
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
                <br />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    className="form-input"
                    type="password"
                    id="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    name="confirmPassword"
                />
                <br />

                {error && <p className="error">{error}</p>}

                <button
                    className="form-submit"
                    type="submit">Signup
                </button>
                <br />
            </form>
        </div>
    );
}
