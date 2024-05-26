import React, { useState } from "react";
import SearchIcon from "../img/search icon.png"

export default function Navbar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showNavMenu, setShowNavMenu] = useState(false);

    function handleSearchChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleSearchClick() {
        onSearch(searchQuery);
    }

    function toggleSearch() {
        setShowSearch(!showSearch);
        if (showSearch) {
            setSearchQuery("");
            onSearch("");
        }
    }

    function toggleNavMenu() {
        setShowNavMenu(!showNavMenu);
    }

    return (
        <div>
            <nav className="nav-bar">
                <div onClick={toggleNavMenu} className="menu-btn">
                    <div className="menu-icon"></div>
                    <div className="menu-icon"></div>
                    <div className="menu-icon"></div>
                </div>
                <h3>DirectEd Dev-HUB</h3>
                <div className="search-bar">
                    {showSearch ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="searchBar"
                            />
                            <button className="searchIcon" onClick={handleSearchClick}>🔎</button>
                            <button className="searchIcon" onClick={toggleSearch}>❌</button>
                        </div>
                    ) : (
                        <img
                            onClick={toggleSearch}
                            src={SearchIcon}
                            alt="Search icon"
                            className="search-icon"
                        />
                    )}
                </div>
            </nav>
            {showNavMenu && (
                <nav className="side-nav">
                    <ol>
                        <li className="navMenuItems"><a href="#home">Create blog</a></li>
                        <li className="navMenuItems"><a href="#my-blogs">My Blogs</a></li>
                        <li className="navMenuItems"><a target="_blank" href="https://travel-5pwshibtajxtfaqszyw6h5.streamlit.app/">Chat with our AI Assistant</a></li>
                    </ol>
                </nav>
            )}
        </div>
    );
}
