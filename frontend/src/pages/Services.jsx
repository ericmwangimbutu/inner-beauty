import React, { useState } from 'react';
import { 
  Scissors, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Feather,
  Droplets,
  Crown,
  Search,
  Loader2
} from 'lucide-react';

const ServicesPage = ({ servicesData, serviceSearchQuery = '', setServiceSearchQuery, careQuery, setCareQuery, handleCareAI, isCareLoading, careResponse, plannerQuery, setPlannerQuery, handlePlannerAI, isPlannerLoading, plannerResponse }) => {
    const filteredServices = Object.entries(servicesData).reduce((acc, [category, items]) => {
      const filteredItems = items.filter(service =>
        service.name.toLowerCase().includes(serviceSearchQuery.toLowerCase())
      );
      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }
      return acc;
    }, {});

    return (
      <div className="py-32 bg-pink-50/30 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-900 mb-4">Service Menu</h2>
          <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
            From intricate Sisterlocks to rejuvenating Facials, we offer a full spectrum of beauty services.
          </p>

          <div className="relative w-full max-w-lg mx-auto mb-16">
            <input
              type="text"
              placeholder="Search for services like 'Knotless Braids'..."
              className="w-full px-6 py-4 pr-12 text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent shadow-sm transition"
              value={serviceSearchQuery}
              onChange={(e) => setServiceSearchQuery(e.target.value)}
            />
            <Search className="absolute w-6 h-6 text-gray-400 right-5 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Existing: Aftercare Architect */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100 flex flex-col">
              <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center text-pink-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aftercare Architect</h3>
              <p className="text-gray-600 text-sm mb-4 flex-1">
                Got fresh braids? Enter your service (e.g., "Sisterlocks Retie") to get a personalized maintenance routine.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={careQuery}
                    onChange={(e) => setCareQuery(e.target.value)}
                    placeholder="E.g. Silk Press"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none text-sm"
                  />
                  <button aria-label="Generate Aftercare Plan"
                    onClick={handleCareAI}
                    disabled={isCareLoading || !careQuery.trim()}
                    className="bg-gray-900 text-white px-4 rounded-lg font-bold text-sm hover:bg-black"
                  >
                    {isCareLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Plan"}
                  </button>
                </div>
                {careResponse && (
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line border border-gray-200 animate-fade-in">
                    <Sparkles className="w-3 h-3 text-pink-500 inline mr-1"/> {careResponse}
                  </div>
                )}
              </div>
            </div>

            {/* NEW: Smart Braid Planner */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100 flex flex-col">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Braid Planner</h3>
              <p className="text-gray-600 text-sm mb-4 flex-1">
                Planning a long sitting? Enter your hair length/style (e.g., "Waist length boho knotless, 4C hair") for estimates.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input aria-label="Braid Style Details"
                    type="text"
                    value={plannerQuery}
                    onChange={(e) => setPlannerQuery(e.target.value)}
                    placeholder="Style & Hair Details"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none text-sm"
                  />
                  <button aria-label="Get Braid Estimate"
                    onClick={handlePlannerAI}
                    disabled={isPlannerLoading || !plannerQuery.trim()}
                    className="bg-purple-600 text-white px-4 rounded-lg font-bold text-sm hover:bg-purple-700"
                  >
                    {isPlannerLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Estimate"}
                  </button>
                </div>
                {plannerResponse && (
                  <div className="bg-purple-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line border border-purple-100 animate-fade-in">
                    {plannerResponse}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(filteredServices).length > 0 ? (
              Object.entries(filteredServices).map(([category, items]) => (
                <div key={category} className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white hover:shadow-2xl hover:bg-white transition-all duration-300 group">
                  <h3 className="text-2xl font-serif text-gray-800 mb-6 flex items-center">
                    <span className="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3 shadow-sm group-hover:bg-pink-600 group-hover:text-white transition-colors">
                        {category.includes('Nails') && <Sparkles size={20} />}
                        {category.includes('Face') && <Droplets size={20} />}
                        {category.includes('Braids') && <Scissors size={20} />}
                        {category.includes('Locs') && <Feather size={20} />}
                        {category.includes('Weddings') && <Crown size={20} />}
                    </span>
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {items.map((service, idx) => (
                      <div key={idx} className="flex justify-between items-center group/item p-3 rounded-xl hover:bg-pink-50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-700 group-hover/item:text-pink-600 transition-colors">{service.name}</h4>
                          <div className="flex items-center text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">
                            <Clock size={10} className="mr-1" /> {service.duration}
                          </div>
                        </div>
                        <span className="font-bold text-pink-600 bg-white px-4 py-1.5 rounded-full text-sm shadow-sm border border-pink-100">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 text-center py-16 px-8 bg-white/50 rounded-3xl border-2 border-dashed border-pink-200">
                <h3 className="text-2xl font-serif text-gray-700">No Services Found</h3>
                <p className="text-gray-500 mt-2">Try a different search term or clear the search to see all services.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ServicesPage;