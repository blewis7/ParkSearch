import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar navbar-light justify-content-between sticky-top lg" style={{backgroundColor: "#e3f2fd"}}>
            <a clasNames="navbar-brand">ParkSearch</a>
            <Link to="/" className="search-parks">Search Parks</Link>
        </nav>
    )
}

export default NavBar;