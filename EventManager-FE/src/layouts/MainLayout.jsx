import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <div className="content" style={{ paddingTop: '60px' }}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;