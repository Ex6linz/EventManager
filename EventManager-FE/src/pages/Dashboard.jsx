import React, { useState, useEffect } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import './Dashboard.css';
import axios from 'axios';

Modal.setAppElement('#root');

// Funkcja do pobierania tokenu JWT z localStorage
function getToken() {
    return localStorage.getItem('access_token');
}

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventName, setNewEventName] = useState('');
    const [newEventDetails, setNewEventDetails] = useState('');
    const [events, setEvents] = useState([]);  // Inicjalizujemy events jako pustą tablicę
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    // Funkcja do pobierania wydarzeń z backendu
    const fetchEvents = async () => {
        const token = getToken();  // Pobieramy token JWT z localStorage
        try {
            const response = await axios.get(`${API_URL}/events`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Przesyłanie tokenu JWT w nagłówku
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Failed to fetch events', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Funkcja do dodawania nowego wydarzenia
    const addNewEvent = async () => {
        const newEvent = {
            title: newEventName,
            date: selectedDate.toISOString(),
            description: newEventDetails,
        };

        const token = getToken();  // Pobieramy token JWT z localStorage

        try {
            const response = await axios.post(`${API_URL}/events`, newEvent, {
                headers: {
                    Authorization: `Bearer ${token}`  // Przesyłanie tokenu JWT w nagłówku
                }
            });
            setEvents([...events, response.data]);
            setNewEventName('');
            setNewEventDetails('');
        } catch (error) {
            console.error('Failed to add event', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="calendar-container">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className="events-list">
                <h2>Events</h2>
                <ul>
                    {Array.isArray(events) && events.length > 0 ? (
                        events.map((event) => (
                            <li key={event.id} onClick={() => openModal(event)}>
                                <strong>{event.title}</strong> - {new Date(event.date).toLocaleString()}
                            </li>
                        ))
                    ) : (
                        <p>No events available</p>
                    )}
                </ul>

                <div className="new-event-form">
                    <h3>Add New Event</h3>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={newEventName}
                        onChange={(e) => setNewEventName(e.target.value)}
                    />
                    <textarea
                        placeholder="Event Details"
                        value={newEventDetails}
                        onChange={(e) => setNewEventDetails(e.target.value)}
                    />
                    <button onClick={addNewEvent}>Add Event</button>
                </div>
            </div>

            {/* Modal z szczegółami wydarzenia */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Event Details"
                className="modal"
                overlayClassName="modal-overlay"
            >
                {selectedEvent && (
                    <div>
                        <h2>{selectedEvent.title}</h2>
                        <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
                        <p><strong>Details:</strong> {selectedEvent.description}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Dashboard;