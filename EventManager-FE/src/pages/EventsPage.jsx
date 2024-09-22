import React, { useState, useEffect } from 'react';
import { getEvents } from '../api/eventsAPI';
import './EventsPage.css';

const EventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Pobieranie wydarzeń z API po załadowaniu komponentu
        const fetchEvents = async () => {
            const eventsData = await getEvents();
            setEvents(eventsData);
        };

        fetchEvents();
    }, []);

    return (
        <div className="events-page">
            <h1>All Events</h1>
            {events.length > 0 ? (
                <ul className="events-list">
                    {events.map((event) => (
                        <li key={event.id}>
                            <strong>{event.name}</strong>
                            <p>{new Date(event.date).toLocaleString()}</p>
                            <p>{event.details}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events available.</p>
            )}
        </div>
    );
};

export default EventsPage;