import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="text-3xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600 mb-6 block">Inner Beauty</span>
            <p className="text-gray-400 text-sm leading-loose">
              Expert Braids, Locs, and Beauty Services. <br/>Elevating your natural glow.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-pink-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-pink-400 transition-colors">Services</Link></li>
              <li><Link to="/products" className="hover:text-pink-400 transition-colors">Products</Link></li>
              <li><Link to="/weddings" className="hover:text-pink-400 transition-colors">Weddings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Knotless & Braids</li>
              <li>Sisterlocks & Dreadlocks</li>
              <li>Manicure & Pedicure</li>
              <li>Remote Service</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Follow Us</h4>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors bg-gray-800 p-3 rounded-full"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors bg-gray-800 p-3 rounded-full"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors bg-gray-800 p-3 rounded-full"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Inner Beauty Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  export default Footer;