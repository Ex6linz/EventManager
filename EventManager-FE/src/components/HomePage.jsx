import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Event Manager</h1>
            <p>Your one-stop solution for managing events and organizations.</p>
            <div className="home-buttons">
                <Link to="/login" className="btn">Log In</Link>
                <Link to="/events" className="btn">Browse Events</Link>
            </div>
        </div>
    );
}

export default HomePage;