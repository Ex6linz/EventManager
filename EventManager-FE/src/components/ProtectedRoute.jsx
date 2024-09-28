import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Sprawdzamy, czy użytkownik ma token w localStorage
    const token = localStorage.getItem('access_token');

    // Jeśli token nie istnieje, przekierowujemy na stronę logowania
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jeśli token istnieje, renderujemy chronioną trasę
    return children;
};

export default ProtectedRoute;