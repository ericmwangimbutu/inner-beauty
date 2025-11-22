import React from 'react';
import { 
  Crown,
  CheckCircle,
  Sparkles,
  Wand2,
  Loader2
} from 'lucide-react';

const WeddingPage = ({ bridalQuery, setBridalQuery, handleBridalAI, isBridalLoading, bridalResponse }) => (
    <div className="py-24 bg-pink-50 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <Crown className="w-12 h-12 text-pink-500" />
        </div>
        <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">Bridal & Wedding Services</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16 font-light">
          From Sisterlocks styling to HD makeup, we make your special day unforgettable.
        </p>
        
        {/* Glassmorphism AI Bridal Generator */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/60 mb-20 text-left relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-pink-400 to-rose-600"></div>
           <div className="flex items-start gap-6 flex-col md:flex-row">
               <div className="flex-1">
                   <h3 className="text-3xl font-serif text-gray-900 mb-3 flex items-center">
                     <Sparkles className="text-pink-500 mr-3" /> AI Look Generator
                   </h3>
                   <p className="text-gray-600 mb-6 text-lg">
                     Describe your dress or theme (e.g., "Boho lace dress, garden wedding"). We'll suggest the perfect hair & makeup.
                   </p>
                   <div className="flex gap-3">
                       <input aria-label="Bridal Style Description"
                         type="text" 
                         className="flex-1 border border-gray-200 bg-white/50 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
                         placeholder="Describe your vibe..."
                         value={bridalQuery}
                         onChange={(e) => setBridalQuery(e.target.value)}
                       />
                       <button aria-label="Generate Bridal Look"
                         onClick={handleBridalAI}
                         disabled={isBridalLoading || !bridalQuery.trim()}
                         className="bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg disabled:opacity-50"
                       >
                         {isBridalLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                       </button>
                   </div>
               </div>
               {bridalResponse && (
                   <div className="flex-1 bg-pink-50 p-6 rounded-2xl border border-pink-100 animate-fade-in">
                     <h4 className="font-bold text-pink-900 mb-2 uppercase tracking-wider text-sm">Your Custom Vision</h4>
                     <p className="text-gray-700 leading-relaxed whitespace-pre-line">{bridalResponse}</p>
                   </div>
               )}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform">
            <h3 className="text-2xl font-serif text-gray-800 mb-6 pb-2 border-b border-gray-100">For the Bride</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> Consultation & Trial Run</li>
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> HD Bridal Makeup</li>
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> Loc Styling / Braiding</li>
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> Skin Prep Facial</li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform">
            <h3 className="text-2xl font-serif text-gray-800 mb-6 pb-2 border-b border-gray-100">For the Party</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> Bridesmaids Makeup</li>
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> Mother of the Bride Glam</li>
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> Group Manicure Sessions</li>
              <li className="flex items-center"><CheckCircle size={20} className="text-pink-500 mr-3 flex-shrink-0"/> On-Location Service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  export default WeddingPage;