import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Usuwamy token z localStorage
        localStorage.removeItem('token');
        // Przekierowujemy na stronę główną
        navigate('/');
    }, [navigate]);

    return null;
};

export default Logout;