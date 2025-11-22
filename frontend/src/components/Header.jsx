import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = ({ cartItems, isMenuOpen, setIsMenuOpen }) => {
    const location = useLocation();

    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-pink-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex items-center cursor-pointer group">
                        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white font-serif w-10 h-10 flex items-center justify-center rounded-xl mr-2 font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                            IB
                        </div>
                        <span className="text-2xl font-serif text-gray-800 tracking-wide group-hover:text-pink-600 transition-colors">Inner Beauty</span>
                    </Link>
                    <nav className="hidden md:flex space-x-8">
                        {['Home', 'Services', 'Products', 'Weddings', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
                                className={`text-sm uppercase tracking-wider font-medium transition-all duration-200 relative group ${location.pathname === (item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`)
                                        ? 'text-pink-600'
                                        : 'text-gray-600 hover:text-pink-500'
                                    }`}
                            >
                                {item}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full ${location.pathname === (item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`) ? 'w-full' : ''}`}></span>
                            </Link>
                        ))}
                        <Link
                            to="/booking"
                            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-2 rounded-xl text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-pink-500/30 transition-all transform hover:-translate-y-0.5 font-bold"
                        >
                            Book Now
                        </Link>
                        <Link to="/cart" className="relative ml-4 text-gray-600 hover:text-pink-500 transition-colors">
                            <ShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </Link>
                    </nav>
                    <div className="md:hidden flex items-center">
                        <Link to="/cart" className="relative mr-4 text-gray-600 hover:text-pink-500">
                            <ShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-pink-500 transition-colors">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 animate-fade-in shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {['Home', 'Services', 'Products', 'Weddings', 'Contact', 'Booking', 'Cart'].map((item) => (
                            <Link
                                key={item}
                                to={item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;