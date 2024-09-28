import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Event Manager</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>

                {isLoggedIn ? (
                    <>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>  {/* Link do rejestracji */}
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;