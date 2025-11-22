import React, { useState } from 'react';
import { 
  CheckCircle,
  Scissors,
  Car,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingPage = ({ servicesData, bookingData, setBookingData, handleBookingSubmit, showConfirmation, setIsAIModalOpen }) => {
    const navigate = useNavigate();

    return(
    <div className="py-24 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full mx-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-pink-500 to-rose-700 p-10 text-center md:w-1/3 flex flex-col justify-center text-white">
            <h2 className="text-3xl font-serif mb-4">Book Appointment</h2>
            <p className="text-rose-100 mb-8">Salon visits or remote service available.</p>
            <div className="bg-white/20 backdrop-blur p-4 rounded-xl">
                <p className="text-sm font-bold">Opening Hours</p>
                <p className="text-xs mt-1 opacity-90">Mon-Sat: 9am - 7pm</p>
                <p className="text-xs opacity-90">Sun: Afternoon Hours</p>
            </div>
          </div>
          
          <div className="p-10 md:w-2/3">
          {showConfirmation ? (
            <div className="text-center animate-fade-in h-full flex flex-col justify-center items-center">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6 shadow-sm">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Booking Request Sent!</h3>
              <p className="text-gray-500 mb-8">We will contact you shortly at {bookingData.email}.</p>
              <button aria-label="Return Home"
                onClick={() => { navigate('/'); }}
                className="text-pink-600 font-bold hover:text-pink-800 underline"
              >
                Return Home
              </button>
            </div>
          ) : (
            <form aria-label="Booking Form" onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input aria-label="Full Name"
                    required
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input aria-label="Email Address"
                    required
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Location Toggle */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Service Location</label>
                 <div className="flex space-x-3">
                    <button aria-label="Select Salon Location"
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 font-bold text-sm ${bookingData.location === 'salon' ? 'bg-white text-pink-600 shadow-md border-2 border-pink-500' : 'bg-transparent border border-gray-300 text-gray-500 hover:bg-gray-200'}`}
                      onClick={() => setBookingData({...bookingData, location: 'salon'})}
                    >
                      <Scissors size={16} className="mr-2" /> Salon
                    </button>
                    <button aria-label="Select Remote Location"
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 font-bold text-sm ${bookingData.location === 'remote' ? 'bg-white text-pink-600 shadow-md border-2 border-pink-500' : 'bg-transparent border border-gray-300 text-gray-500 hover:bg-gray-200'}`}
                      onClick={() => setBookingData({...bookingData, location: 'remote'})}
                    >
                      <Car size={16} className="mr-2" /> Remote
                    </button>
                 </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Select Service</label>
                  <button aria-label="Ask AI for Service Recommendation"
                    type="button"
                    onClick={() => setIsAIModalOpen(true)}
                    className="text-xs text-pink-500 flex items-center hover:text-pink-700 font-bold bg-pink-50 px-2 py-1 rounded-md transition-colors"
                  >
                    <Sparkles size={12} className="mr-1" /> Ask AI
                  </button>
                </div>
                <select aria-label="Select Service"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-white"
                  value={bookingData.service}
                  onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
                >
                  <option value="" italics="true">Choose a treatment...</option>
                  <optgroup label="Braids & Cornrows">
                    {servicesData["Braids & Cornrows"].map(s => <option key={s.name} value={s.name}>{s.name} ({s.price})</option>)}
                  </optgroup>
                  <optgroup label="Locs & Natural">
                    {servicesData["Locs & Natural"].map(s => <option key={s.name} value={s.name}>{s.name} ({s.price})</option>)}
                  </optgroup>
                  <optgroup label="Nails & Care">
                    {servicesData["Nails & Care"].map(s => <option key={s.name} value={s.name}>{s.name} ({s.price})</option>)}
                  </optgroup>
                  <optgroup label="Face & Body">
                    {servicesData["Face & Body"].map(s => <option key={s.name} value={s.name}>{s.name} ({s.price})</option>)}
                  </optgroup>
                  <optgroup label="Weddings & Remote">
                    {servicesData["Weddings & Remote"].map(s => <option key={s.name} value={s.name}>{s.name} ({s.price})</option>)}
                  </optgroup>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                  <input aria-label="Select Date"
                    required
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-gray-600"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Time</label>
                  <select aria-label="Select Time"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none bg-white text-gray-600"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  >
                    <option value="">Select...</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>
              </div>

              <button aria-label="Confirm Booking"
                type="submit"
                onClick={handleBookingSubmit}
                disabled={!bookingData.name || !bookingData.email || !bookingData.service || !bookingData.date || !bookingData.time}

                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl transform active:scale-95"
              >
                Confirm Booking
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    </div>
)};

export default BookingPage;