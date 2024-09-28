const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getEvents = async () => {
    const response = await fetch(`${API_URL}/events`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.json();
};

export const addEvent = async (eventData) => {
    const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(eventData),
    });
    return response.json();
};

export const deleteEvent = async (eventId) => {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.json();
};