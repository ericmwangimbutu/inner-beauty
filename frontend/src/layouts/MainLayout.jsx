import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot'; // Import the new Chatbot component

const MainLayout = ({ cartItems, navigate, isMenuOpen, setIsMenuOpen, callGemini, servicesData, products }) => {
    return (
        <div className="min-h-screen font-sans text-gray-900 relative selection:bg-pink-200 selection:text-pink-900 bg-gray-50">
            <Header cartItems={cartItems} navigate={navigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main className="animate-fade-in">
                <Outlet />
            </main>
            <Footer navigate={navigate} />

            {/* Render the new Chatbot component */}
            <Chatbot 
                callGemini={callGemini} 
                servicesData={servicesData} 
                products={products} 
            />
        </div>
    );
};

export default MainLayout;