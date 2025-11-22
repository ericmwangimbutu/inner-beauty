import React from 'react';
import { 
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const ContactPage = () => (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">Visit Inner Beauty</h2>
          <p className="text-gray-500">We look forward to welcoming you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {[
                { icon: MapPin, title: "Salon Address", text: "Kahawa Sukari, Nairobi County" },
                { icon: Phone, title: "Phone", text: "+254 798 865 988" },
                { icon: Mail, title: "Email", text: "contact@innerbeautysalon.com" }
            ].map((item, i) => (
                <div key={i} className="flex items-center space-x-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-pink-200 transition-colors">
                  <div className="bg-white p-4 rounded-full text-pink-500 shadow-sm">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-3xl h-96 flex items-center justify-center relative overflow-hidden shadow-lg group">
             <img 
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Map location" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="relative z-10 bg-white/90 backdrop-blur px-8 py-4 rounded-2xl shadow-2xl border border-white/50 transform group-hover:-translate-y-2 transition-transform text-center">
               <span className="font-serif text-pink-600 font-bold text-xl block">Inner Beauty</span> 
               <span className="text-gray-800 font-medium text-sm">View on Google Maps</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  export default ContactPage;