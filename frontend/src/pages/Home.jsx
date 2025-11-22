import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Calendar, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Menu, 
  X, 
  Star, 
  Clock, 
  CheckCircle, 
  Sparkles,
  Heart,
  Mail,
  MessageCircle,
  Send,
  Loader2,
  Bot,
  ShoppingBag,
  Car,
  Crown,
  Wand2,
  Gift,
  Feather,
  Droplets,
  ShieldCheck,
  Sparkle,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Palette,
  Package,
  PenTool,
  Search,
  ShoppingCart
} from 'lucide-react';

const heroImages = [
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop", // Braids/Styling
  "https://images.unsplash.com/photo-1560066984-12186d309bd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Salon Interior
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1350&q=80", // Makeup
  "https://images.unsplash.com/photo-1632345031435-8727f6897693?auto=format&fit=crop&w=800&q=80" // Nails
];

const testimonials = [
  { id: 1, name: "Judy W. Macharia", text: "They saved my Sisterlocks! The restoration service was incredible.", rating: 5 },
  { id: 2, name: "Lucy W. Macharia", text: "Best Knotless braids in the city. So neat and painless.", rating: 5 },
  { id: 3, name: "Esther Macharia", text: "The remote service for my wedding was a lifesaver. Highly recommend.", rating: 5 },
];

const instagramPosts = [
  { id: 1, img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=400&q=80", likes: 124, comments: 12 },
  { id: 2, img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=400&q=80", likes: 89, comments: 5 },
  { id: 3, img: "https://images.unsplash.com/photo-1522337360705-8b6b8f4f6249?auto=format&fit=crop&w=400&q=80", likes: 210, comments: 34 },
  { id: 4, img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80", likes: 156, comments: 18 },
];

const Hero = ({ navigate, setIsAIModalOpen }) => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 h-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 h-full">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-xs font-bold mb-6 tracking-widest uppercase border border-pink-200">
              Now Booking Weddings 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6 text-gray-900">
              Reveal Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 italic">Inner Beauty</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
              Specializing in Sisterlocks, Knotless Braids, Luxury Nails, and Facials. Elevating your natural glow with premium care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('booking')}
                className="px-8 py-4 bg-pink-600 text-white rounded-xl font-bold shadow-lg shadow-pink-300/50 hover:bg-pink-700 transition-all transform hover:-translate-y-1"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => setIsAIModalOpen(true)}
                className="px-8 py-4 bg-white text-pink-600 border border-pink-200 rounded-xl font-bold shadow-md hover:bg-pink-50 transition-all flex items-center justify-center group"
              >
                <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                Ask AI Assistant
              </button>
            </div>
          </div>

          {/* Right Carousel */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl relative">
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
               {heroImages.map((img, index) => (
                 <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                 >
                   <img 
                    src={img} 
                    alt={`Hero ${index}`}
                    className="w-full h-full object-cover"
                   />
                   {/* Overlay Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                 </div>
               ))}
               
               {/* Carousel Indicators */}
               <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                 {heroImages.map((_, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setCurrentHeroIndex(idx)}
                     className={`w-2.5 h-2.5 rounded-full transition-all ${
                       idx === currentHeroIndex ? 'bg-white w-6' : 'bg-white/50'
                     }`}
                   />
                 ))}
               </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3 animate-bounce-slow">
               <div className="bg-pink-100 p-2 rounded-full text-pink-600"><Star size={20} fill="currentColor"/></div>
               <div>
                 <p className="text-xs text-gray-500 font-bold uppercase">Rating</p>
                 <p className="font-bold text-gray-900">5.0 Stars</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StyleHarmonySection = ({ navigate, handleStyleAI, styleQuery, setStyleQuery, isStyleLoading, styleResponse }) => (
    <section className="py-24 bg-white relative overflow-hidden border-b border-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-pink-100 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Text Side */}
          <div className="flex-1 text-left">
            <span className="text-pink-600 font-bold tracking-wider uppercase text-sm flex items-center mb-3">
              <Palette className="w-4 h-4 mr-2" /> New Feature
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              Style Harmony AI
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Going to a special event? Tell us your **outfit** (e.g., "Red velvet dress") or **occasion** (e.g., "Job interview"), and our AI will design the perfect hair, nail, and makeup look to match.
            </p>
            
            <div className="bg-white p-2 rounded-2xl shadow-md border border-pink-100 flex flex-col sm:flex-row gap-2">
              <input aria-label="Style Description"
                type="text" 
                placeholder="Describe outfit or occasion..."
                className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-700 placeholder-gray-400"
                value={styleQuery}
                onChange={(e) => setStyleQuery(e.target.value)}
              />
              <button aria-label="Generate Style"
                onClick={handleStyleAI}
                disabled={isStyleLoading || !styleQuery.trim()}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isStyleLoading ? <Loader2 className="animate-spin" /> : <span className="flex items-center">Style Me <Wand2 className="ml-2 w-4 h-4"/></span>}
              </button>
            </div>
          </div>

          {/* Response Side */}
          <div className="flex-1 w-full">
            {styleResponse ? (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100 animate-fade-in relative">
                <div className="absolute -top-3 -right-3 bg-pink-500 text-white p-2 rounded-full shadow-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-4">Your Custom Look</h3>
                <div className="space-y-4">
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {styleResponse}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Generated by Gemini</span>
                  <button onClick={() => navigate('booking')} className="text-pink-600 font-bold hover:underline text-sm">
                    Book This Look &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/50 rounded-2xl p-8 border-2 border-dashed border-pink-200 flex flex-col items-center justify-center text-center h-64">
                <div className="bg-pink-100 p-4 rounded-full mb-4">
                  <Bot className="w-8 h-8 text-pink-400" />
                </div>
                <p className="text-gray-400 font-medium">Waiting for your style inspiration...</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );

const InstagramSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">Follow Us</h2>
             <p className="text-pink-600 font-medium flex items-center">
               <Instagram size={18} className="mr-2"/> @innerbeautysalon
             </p>
          </div>
          <button className="hidden md:flex items-center text-gray-600 hover:text-pink-600 font-medium transition-colors mt-4 md:mt-0">
            View all posts <ArrowRight size={18} className="ml-2"/>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
              <img src={post.img} alt="Insta Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                <div className="flex items-center"><Heart size={20} className="mr-1 fill-white"/> {post.likes}</div>
                <div className="flex items-center"><MessageCircle size={20} className="mr-1"/> {post.comments}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <button className="inline-flex items-center text-pink-600 font-bold">
             View Profile <ArrowRight size={16} className="ml-2"/>
           </button>
        </div>
      </div>
    </section>
  );

const TestimonialsSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-serif mb-16 text-gray-900">Client Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 p-8 rounded-3xl relative shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
               <div className="absolute -top-4 left-8 bg-gradient-to-r from-pink-500 to-rose-600 text-white p-3 rounded-xl shadow-lg">
                 <Heart size={20} fill="white" />
               </div>
               <div className="flex text-yellow-400 mb-6 mt-4">
                 {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="mr-1" />)}
               </div>
               <p className="text-gray-600 italic mb-8 text-lg leading-relaxed">"{t.text}"</p>
               <h4 className="font-bold text-gray-900 border-l-4 border-pink-500 pl-4">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
);

const HomePage = ({ navigate, setIsAIModalOpen, handleStyleAI, styleQuery, setStyleQuery, isStyleLoading, styleResponse }) => {
  return (
    <>
      <Hero navigate={navigate} setIsAIModalOpen={setIsAIModalOpen} />
      <StyleHarmonySection 
        navigate={navigate} 
        handleStyleAI={handleStyleAI}
        styleQuery={styleQuery}
        setStyleQuery={setStyleQuery}
        isStyleLoading={isStyleLoading}
        styleResponse={styleResponse}
      />
      <InstagramSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;