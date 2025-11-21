import React, { useState, useEffect, useRef } from 'react';
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

// Backend API endpoint (also used for Gemini proxying)
const apiBase =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost/backend/api/index.php';
const defaultModel =
  import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash-preview-09-2025';

// Updated Services Data for Inner Beauty Salon
const servicesData = {
  "Braids & Cornrows": [
    { name: "Knotless Braids", price: "Ksh 1500+", duration: "180 min" },
    { name: "Standard Hair Braids", price: "Ksh 3000+", duration: "120 min" },
    { name: "Ghanaian Braids", price: "Ksh 2000+", duration: "150 min" },
    { name: "Cornrows (All Styles)", price: "Ksh 2000+", duration: "60 min" },
    { name: "Box Braids", price: "Ksh 4000+", duration: "240 min" },
    { name: "Feed-in Braids", price: "Ksh 2500+", duration: "180 min" },
    { name: "Crochet Braids", price: "Ksh 3500+", duration: "180 min" },
    { name: "Faux Locs", price: "Ksh 5000+", duration: "300 min" },
    { name: "Braided Updos", price: "Ksh 3000+", duration: "90 min" },
    { name: "Braided Ponytails", price: "Ksh 2500+", duration: "60 min" },
    { name: "Braided Crowns", price: "Ksh 3500+", duration: "120 min" },
    { name: "Braided Wigs Installation", price: "Ksh 6000+", duration: "180 min" },
    { name: "Braided Extensions Removal", price: "Ksh 1000+", duration: "60 min" },
    { name: "Braided Hair Touch-Up", price: "Ksh 1500+", duration: "90 min" },
    { name: "Braided Hair Consultation", price: "Ksh 500", duration: "30 min" },
    { name: "Braided Hair Maintenance", price: "Ksh 2000+", duration: "60 min" },
    { name: "Braided Hair Styling", price: "Ksh 2500+", duration: "60 min" },
    { name: "Braided Hair Treatments", price: "Ksh 1500+", duration: "45 min" },
    { name: "Braided Hair Accessories", price: "Ksh 300+", duration: "15 min" },
    { name: "Braided Hair Color", price: "Ksh 4000+", duration: "120 min" },
    { name: "Braided Hair Highlights", price: "Ksh 4500+", duration: "150 min" },
    { name: "Braided Hair Extensions", price: "Ksh 5000+", duration: "180 min" },
    { name: "Braided Hair Removal", price: "Ksh 1200+", duration: "60 min" },
    { name: "Braided Hair Refresh", price: "Ksh 2000+", duration: "90 min" },
    { name: "Braided Hair Deep Conditioning", price: "Ksh 1800+", duration: "60 min" },
    { name: "Braided Hair Scalp Treatment", price: "Ksh 1500+", duration: "45 min" },
    { name: "Braided Hair Detangling", price: "Ksh 1000+", duration: "30 min" },
    { name: "Braided Hair Detox", price: "Ksh 2000+", duration: "60 min" },
    { name: "Braided Hair Protein Treatment", price: "Ksh 1800+", duration: "45 min" },
    { name: "Braided Hair Moisture Treatment", price: "Ksh 1600+", duration: "45 min" },
    { name: "Braided Hair Shine Treatment", price: "Ksh 1500+", duration: "30 min" },
    { name: "Braided Hair Frizz Control", price: "Ksh 1200+", duration: "30 min" },
    { name: "Braided Hair Edge Control", price: "Ksh 800+", duration: "15 min" },
  ],

  "Locs & Natural": [
    { name: "Sisterlocks Restoration & Retie", price: "Ksh 10000+", duration: "240 min" },
    { name: "Dreadlocks Retie", price: "Ksh 3000+", duration: "90 min" },
    { name: "Twistouts", price: "Ksh 4000+", duration: "60 min" },
    { name: "Natural Hair Styling", price: "Ksh 2500+", duration: "60 min" },
    { name: "Loc Installation", price: "Ksh 8000+", duration: "180 min" },
    { name: "Sisterlocks Installation", price: "Ksh 20000+", duration: "300 min" },
    { name: "Dreadlocks Installation", price: "Ksh 15000+", duration: "240 min" },
    ],
  
  "Hair Styling": [
    { name: "Wash & Blowout", price: "Ksh 1500", duration: "60 min" },
    { name: "Updo Styles", price: "Ksh 3000+", duration: "90 min" },
    { name: "Protective Styles", price: "Ksh 4000+", duration: "120 min" },
    { name: "Hair Treatments", price: "Ksh 2000+", duration: "60 min" },
    { name: "Edge Styling", price: "Ksh 800", duration: "15 min" },
    { name: "Scalp Massage", price: "Ksh 1000", duration: "30 min" },
    { name: "Hot Oil Treatment", price: "Ksh 1500", duration: "45 min" },
    { name: "Deep Conditioning", price: "Ksh 1200", duration: "30 min" },
    { name: "Detangling Session", price: "Ksh 1000", duration: "30 min" },
    { name: "Blow Dry & Style", price: "Ksh 1800", duration: "60 min" },
    { name: "Flat Ironing", price: "Ksh 2000", duration: "60 min" },
    { name: "Curling/Waving", price: "Ksh 2000", duration: "60 min" },
    { name: "Hair Trimming", price: "Ksh 800", duration: "20 min" },
    { name: "Scalp Treatment", price: "Ksh 1500", duration: "45 min" },
    { name: "Hair Detox", price: "Ksh 2000", duration: "60 min" },
    { name: "Protein Treatment", price: "Ksh 1800", duration: "45 min" },
    { name: "Moisture Treatment", price: "Ksh 1600", duration: "45 min" },
  ],


  "Makeup Services": [
    { name: "Daytime Makeup", price: "Ksh 1500", duration: "45 min" },
    { name: "Bridal Makeup", price: "Ksh 5000", duration: "120 min" },
    { name: "Special Occasion Makeup", price: "Ksh 3000", duration: "60 min" },
    { name: "Makeup Touch-Up", price: "Ksh 1000", duration: "30 min" },
    { name: "Makeup Lessons", price: "Ksh 4000", duration: "90 min" },
    { name: "Airbrush Makeup", price: "Ksh 3500", duration: "60 min" },
    { name: "Makeup Removal", price: "Ksh 800", duration: "15 min" },
    { name: "Eyebrow Shaping & Tinting", price: "Ksh 1200", duration: "30 min" },
    { name: "Eyelash Extensions", price: "Ksh 4000", duration: "90 min" },
    { name: "Eyelash Lift & Tint", price: "Ksh 2500", duration: "60 min" },
    { name: "Makeup for Photoshoots", price: "Ksh 4500", duration: "90 min" },
    { name: "Makeup for Events", price: "Ksh 3000", duration: "60 min" },
    { name: "Makeup for TV/Film", price: "Ksh 6000", duration: "120 min" },
    { name: "Makeup for Fashion Shows", price: "Ksh 5500", duration: "90 min" },
    { name: "Makeup for Graduations", price: "Ksh 2500", duration: "45 min" },
    { name: "Makeup for Parties", price: "Ksh 2000", duration: "45 min" },
    { name: "Makeup for Corporate Events", price: "Ksh 3000", duration: "60 min" },
  
  ],

  "Nails & Care": [
    { name: "Classic Manicure", price: "Ksh 500", duration: "45 min" },
    { name: "Luxury Pedicure", price: "Ksh 500", duration: "60 min" },
    { name: "Gel Application", price: "Ksh 1000", duration: "45 min" },
    { name: "Nail Polish Change", price: "Ksh 500", duration: "30 min" },
    { name: "Nail Art Design", price: "Ksh 1500", duration: "60 min" },
    { name: "Acrylic Nails", price: "Ksh 2000", duration: "90 min" },
    { name: "Dip Powder Nails", price: "Ksh 1800", duration: "75 min" },
    { name: "Nail Repair", price: "Ksh 300", duration: "15 min" },
    { name: "Paraffin Wax Treatment", price: "Ksh 800", duration: "30 min" },
    { name: "Cuticle Care", price: "Ksh 400", duration: "20 min" },
    { name: "Nail Strengthening Treatment", price: "Ksh 700", duration: "30 min" },
  ],

  "Waxing & Threading": [
    { name: "Eyebrow Threading", price: "Ksh 500", duration: "15 min" },
    { name: "Full Face Waxing", price: "Ksh 1500", duration: "30 min" },
    { name: "Leg Waxing", price: "Ksh 2000", duration: "45 min" },
    { name: "Arm Waxing", price: "Ksh 1200", duration: "30 min" },
    { name: "Underarm Waxing", price: "Ksh 800", duration: "20 min" },
    { name: "Bikini Waxing", price: "Ksh 1800", duration: "30 min" },
    { name: "Full Body Waxing", price: "Ksh 5000", duration: "120 min" },
    { name: "Lip & Chin Waxing", price: "Ksh 600", duration: "15 min" },
  ],

  "Face & Body": [
    { name: "Full Facial", price: "Ksh 1000", duration: "75 min" },
    { name: "Deep Scrubbing", price: "Ksh 1500", duration: "45 min" },
    { name: "Evening Makeup", price: "Ksh 2000", duration: "60 min" },
    { name: "Body Scrub", price: "Ksh 2500", duration: "60 min" },
    { name: "Body Wrap", price: "Ksh 3000", duration: "90 min" },
    { name: "Anti-Aging Facial", price: "Ksh 2000", duration: "60 min" },
    { name: "Acne Treatment Facial", price: "Ksh 1800", duration: "60 min" },
    { name: "Hydrating Facial", price: "Ksh 1500", duration: "45 min" },
    { name: "Brightening Facial", price: "Ksh 1700", duration: "45 min" },
    { name: "Microdermabrasion", price: "Ksh 2500", duration: "60 min" },
    { name: "Chemical Peel", price: "Ksh 3000", duration: "60 min" },
    { name: "Back Facial", price: "Ksh 2000", duration: "60 min" },
    { name: "Eye Treatment", price: "Ksh 1200", duration: "30 min" },
    { name: "Lip Treatment", price: "Ksh 800", duration: "15 min" },
    { name: "Neck & Décolleté Treatment", price: "Ksh 1500", duration: "30 min" },
    { name: "Hand & Foot Treatment", price: "Ksh 1000", duration: "30 min" },
  ],

  "Weddings & Remote": [
    { name: "Bridal Package (Hair+Makeup)", price: "Ksh 15000", duration: "240 min" },
    { name: "Wedding Party Group", price: "Consult", duration: "Var" },
    { name: "Remote Home Service", price: "+Ksh 1000 Fee", duration: "Travel" },
    { name: "Destination Wedding", price: "Consult", duration: "Var" },
    { name: "Bridal Hair Trial", price: "Ksh 5000", duration: "120 min" },
    { name: "Bridal Makeup Trial", price: "Ksh 3000", duration: "60 min" },
    { name: "Groom's Grooming Package", price: "Ksh 8000", duration: "120 min" },
    { name: "Bridesmaid Package", price: "Ksh 6000", duration: "90 min" },
    {name: "Mother of the Bride/Groom Package", price: "Ksh 7000", duration: "90 min" },
  ]
};

const products = [
  { name: "Inner Beauty Velvet Lipstick", price: "Ksh 3000", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80", description: "A luxurious, long-lasting velvet lipstick that provides a bold, matte finish." },
  { name: "Hydrating Facial Mist", price: "Ksh 2350", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80", description: "A refreshing facial mist that hydrates and revitalizes your skin throughout the day." },
  { name: "Loc Maintenance Oil", price: "Ksh 1000", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=400&q=80", description: "A nourishing oil blend that keeps your locs healthy, shiny, and moisturized without buildup." },
  { name: "Nourishing Hair Butter", price: "Ksh 1500", img: "https://images.unsplash.com/photo-1590080877777-4b2f3f3b8e2d?auto=format&fit=crop&w=400&q=80", description: "A rich, creamy hair butter that deeply conditions, strengthens, and promotes healthy hair growth." },
  { name: "Smoothing Edge Control", price: "Ksh 1200", img: "https://images.unsplash.com/photo-1612832021044-5f4e1c3b6f3e?auto=format&fit=crop&w=400&q=80", description: "A non-flaky, long-lasting edge control that provides a smooth, sleek hold for all hair types." },
  { name: "Luxury Nail Kit", price: "Ksh 3500", img: "https://images.unsplash.com/photo-1587614382346-4ec2b3d3f1b4?auto=format&fit=crop&w=400&q=80", description: "A complete nail care kit for a perfect, salon-quality manicure and pedicure at home." },
  { name: "Makeup Brush Set", price: "Ksh 4000", img: "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=400&q=80", description: "A set of professional-grade makeup brushes for a flawless and seamless application every time." },
  { name: "Facial Cleansing Balm", price: "Ksh 1800", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80", description: "A gentle yet effective cleansing balm that melts away makeup, sunscreen, and impurities." },
  { name: "Inner Beauty Gift Card", price: "Ksh 5000", img: "https://images.unsplash.com/photo-1606813909353-1c4a3f4e5b6e?auto=format&fit=crop&w=400&q=80", description: "The perfect gift for any beauty lover. Can be redeemed for any of our services or products." },
  { name: "Sisterlocks Care Kit", price: "Ksh 2500", img: "https://images.unsplash.com/photo-1612831455543-8f4e1c3b6f3e?auto=format&fit=crop&w=400&q=80", description: "Everything you need to maintain your Sisterlocks and keep them looking their absolute best." },
  { name: "Hydrating Body Lotion", price: "Ksh 2200", img: "https://images.unsplash.com/photo-1590080877777-4b2f3f3b8e2d?auto=format&fit=crop&w=400&q=80", description: "A lightweight, fast-absorbing body lotion that provides long-lasting hydration for smooth skin." },
  { name: "Makeup Setting Spray", price: "Ksh 1500", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80", description: "A fine mist setting spray that locks in your makeup for a fresh, just-applied look that lasts all day." },
  { name: "Nail Strengthening Serum", price: "Ksh 1300", img: "https://images.unsplash.com/photo-1587614382346-4ec2b3d3f1b4?auto=format&fit=crop&w=400&q=80", description: "A powerful serum that strengthens and protects your nails from chipping, splitting, and breaking." },
];

const testimonials = [
  { id: 1, name: "Judy W. Macharia", text: "They saved my Sisterlocks! The restoration service was incredible.", rating: 5 },
  { id: 2, name: "Lucy W. Macharia", text: "Best Knotless braids in the city. So neat and painless.", rating: 5 },
  { id: 3, name: "Esther Macharia", text: "The remote service for my wedding was a lifesaver. Highly recommend.", rating: 5 },
];

// Instagram Mock Data
const instagramPosts = [
  { id: 1, img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=400&q=80", likes: 124, comments: 12 },
  { id: 2, img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=400&q=80", likes: 89, comments: 5 },
  { id: 3, img: "https://images.unsplash.com/photo-1522337360705-8b6b8f4f6249?auto=format&fit=crop&w=400&q=80", likes: 210, comments: 34 },
  { id: 4, img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80", likes: 156, comments: 18 },
];

// Hero Images for Slider
const heroImages = [
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop", // Braids/Styling
  "https://images.unsplash.com/photo-1560066984-12186d309bd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Salon Interior
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1350&q=80", // Makeup
  "https://images.unsplash.com/photo-1632345031435-8727f6897693?auto=format&fit=crop&w=800&q=80" // Nails
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Hero Slider State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  // Booking State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    service: '',
    location: 'salon', 
    date: '',
    time: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // --- AI Feature States ---
  // 1. General AI Consultant (Global)
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 2. Bridal Look Generator (Wedding Page)
  const [bridalQuery, setBridalQuery] = useState('');
  const [bridalResponse, setBridalResponse] = useState('');
  const [isBridalLoading, setIsBridalLoading] = useState(false);

  // 3. Product Matcher (Products Page)
  const [productQuery, setProductQuery] = useState('');
  const [productResponse, setProductResponse] = useState('');
  const [isProductLoading, setIsProductLoading] = useState(false);

  // 4. AI Aftercare Architect (Services Page)
  const [careQuery, setCareQuery] = useState('');
  const [careResponse, setCareResponse] = useState('');
  const [isCareLoading, setIsCareLoading] = useState(false);

  // 5. Style Harmony AI (Home Page)
  const [styleQuery, setStyleQuery] = useState('');
  const [styleResponse, setStyleResponse] = useState('');
  const [isStyleLoading, setIsStyleLoading] = useState(false);

  // 6. NEW: Smart Braid & Loc Planner (Services Page)
  const [plannerQuery, setPlannerQuery] = useState('');
  const [plannerResponse, setPlannerResponse] = useState('');
  const [isPlannerLoading, setIsPlannerLoading] = useState(false);

  // 7. NEW: Gift Note Composer (Products Page)
  const [giftQuery, setGiftQuery] = useState('');
  const [giftResponse, setGiftResponse] = useState('');
  const [isGiftLoading, setIsGiftLoading] = useState(false);

  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Product Detail & Cart
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Navigation Handler
  const navigate = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Add to Cart Handler
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.name === product.name);
      if (itemInCart) {
        return prevItems.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    // Optional: Give user feedback
    alert(`${product.name} added to cart!`);
  };

  // Handle Booking Submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setBookingData({ name: '', email: '', service: '', location: 'salon', date: '', time: '' });
      navigate('home');
    }, 3000);
  };

  // --- AI Handlers ---
  // 1. General Consultant Handler
  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    setAiResponse(''); 

    try {
      const servicesList = JSON.stringify(servicesData);
      const prompt = `
        You are an expert beauty consultant for "Inner Beauty Salon".
        Menu: ${servicesList}.
        We specialize in Braids (Knotless, Ghanaian, etc.), Locs (Sisterlocks, Dreadlocks), Nails, and Facials.
        User asks: "${aiQuery}"
        Respond with:
        1. Warm greeting.
        2. Specific service recommendation based on our specialized menu.
        3. Mention remote options if relevant.
        4. Keep it under 100 words.
      `;
      const text = await callGemini(prompt);
      setAiResponse(text || "I'm reflecting on the perfect advice. Please ask again.");
    } catch (error) {
      setAiResponse("Unable to connect to beauty intelligence.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // 2. Bridal Look Generator Handler
  const handleBridalAI = async (e) => {
    e.preventDefault();
    if (!bridalQuery.trim()) return;
    setIsBridalLoading(true);
    setBridalResponse('');

    try {
      const prompt = `
        You are a luxury wedding stylist for Inner Beauty Salon. 
        The bride describes her theme/style as: "${bridalQuery}".
        Suggest a specific, cohesive Hair (perhaps Braids or Natural styles we offer) and Makeup look.
        Be descriptive, elegant, and inspiring. Suggest "Inner Beauty Bridal Package".
        Keep it under 100 words.
      `;
      const text = await callGemini(prompt);
      setBridalResponse(text);
    } catch (error) {
      setBridalResponse("Sorry, our stylist is busy. Please try again.");
    } finally {
      setIsBridalLoading(false);
    }
  };

  // 3. Product Matcher Handler
  const handleProductAI = async (e) => {
    e.preventDefault();
    if (!productQuery.trim()) return;
    setIsProductLoading(true);
    setProductResponse('');

    try {
      const productList = JSON.stringify(products);
      const prompt = `
        You are a product expert at Inner Beauty Salon.
        Our products: ${productList}.
        User need: "${productQuery}".
        Recommend ONE specific product from our list.
      `;
      const text = await callGemini(prompt);
      setProductResponse(text);
    } catch (error) {
      setProductResponse("Unable to find a match right now.");
    } finally {
      setIsProductLoading(false);
    }
  };

  // 4. Aftercare Architect Handler
  const handleCareAI = async (e) => {
    e.preventDefault();
    if (!careQuery.trim()) return;
    setIsCareLoading(true);
    setCareResponse('');

    try {
      const prompt = `
        You are a specialist hair and beauty educator at Inner Beauty Salon.
        The user just got/wants to know about maintenance for: "${careQuery}".
        Create a concise 3-part maintenance guide:
        1. "Daily Routine": What to do every day.
        2. "Bedtime": How to protect it at night.
        3. "Avoid": One thing to absolutely avoid.
        Format with clear emojis. Keep it brief (under 100 words total).
      `;
      const text = await callGemini(prompt);
      setCareResponse(text);
    } catch (error) {
      setCareResponse("Unable to generate care routine.");
    } finally {
      setIsCareLoading(false);
    }
  };

  // 5. Style Harmony Handler
  const handleStyleAI = async (e) => {
    e.preventDefault();
    if (!styleQuery.trim()) return;
    setIsStyleLoading(true);
    setStyleResponse('');

    try {
      const prompt = `
        You are a high-end fashion and beauty stylist at Inner Beauty Salon.
        The user says: "${styleQuery}".
        Create a cohesive look recommendation including:
        1. **Hair**: A style that complements the outfit/occasion.
        2. **Makeup**: Color palette and vibe.
        3. **Nails**: Shape and color.
        Keep it chic, trendy, and concise. Use emojis.
      `;
      const text = await callGemini(prompt);
      setStyleResponse(text);
    } catch (error) {
      setStyleResponse("Our stylist is currently busy. Please try again.");
    } finally {
      setIsStyleLoading(false);
    }
  };

  // 6. NEW: Smart Braid Planner Handler
  const handlePlannerAI = async (e) => {
    e.preventDefault();
    if (!plannerQuery.trim()) return;
    setIsPlannerLoading(true);
    setPlannerResponse('');

    try {
      const prompt = `
        You are a Braid & Loc Specialist at Inner Beauty Salon.
        The user asks about a style/plan: "${plannerQuery}".
        Estimate the following based on professional standards:
        1. **Estimated Time**: How long the service takes (e.g. 4-6 hours).
        2. **Hair Packs**: Approx packs of braiding hair needed (if applicable).
        3. **Chair Comfort**: Low, Medium, or High endurance required.
        Keep it helpful and realistic.
      `;
      const text = await callGemini(prompt);
      setPlannerResponse(text);
    } catch (error) {
      setPlannerResponse("Unable to calculate estimate.");
    } finally {
      setIsPlannerLoading(false);
    }
  };

  // 7. NEW: Gift Note Handler
  const handleGiftAI = async (e) => {
    e.preventDefault();
    if (!giftQuery.trim()) return;
    setIsGiftLoading(true);
    setGiftResponse('');

    try {
      const prompt = `
        You are a creative writer at Inner Beauty Salon.
        Write a short, warm, 2-sentence gift card message.
        Recipient/Occasion: "${giftQuery}".
        Theme: Beauty, self-care, glowing.
      `;
      const text = await callGemini(prompt);
      setGiftResponse(text);
    } catch (error) {
      setGiftResponse("Unable to write note.");
    } finally {
      setIsGiftLoading(false);
    }
  };

  // Helper function for API calls
  const callGemini = async (prompt, model = defaultModel) => {
    try {
      const response = await fetch(`${apiBase}?resource=ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });
      if (!response.ok) {
        throw new Error(`AI proxy failed with status ${response.status}`);
      }
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Components
  const Header = () => (
    <header className="bg-white/80 backdrop-blur-lg border-b border-pink-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => navigate('home')}
          >
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white font-serif w-10 h-10 flex items-center justify-center rounded-xl mr-2 font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              IB
            </div>
            <span className="text-2xl font-serif text-gray-800 tracking-wide group-hover:text-pink-600 transition-colors">Inner Beauty</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Services', 'Products', 'Weddings', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(item.toLowerCase())}
                className={`text-sm uppercase tracking-wider font-medium transition-all duration-200 relative group ${
                  currentPage === item.toLowerCase() 
                    ? 'text-pink-600' 
                    : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full ${currentPage === item.toLowerCase() ? 'w-full' : ''}`}></span>
              </button>
            ))}
            <button 
              onClick={() => navigate('booking')}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-2 rounded-xl text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-pink-500/30 transition-all transform hover:-translate-y-0.5 font-bold"
            >
              Book Now
            </button>
            <button onClick={() => navigate('cart')} className="relative ml-4 text-gray-600 hover:text-pink-500 transition-colors">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </nav>
          <div className="md:hidden flex items-center">
             <button onClick={() => navigate('cart')} className="relative mr-4 text-gray-600 hover:text-pink-500">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
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
              <button
                key={item}
                onClick={() => navigate(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  const Hero = () => (
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

  const StyleHarmonySection = () => (
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
              <input 
                type="text" 
                placeholder="Describe outfit or occasion..."
                className="flex-1 px-4 py-3 rounded-xl outline-none text-gray-700 placeholder-gray-400"
                value={styleQuery}
                onChange={(e) => setStyleQuery(e.target.value)}
              />
              <button 
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

  const ServicesPage = () => {
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
                  <button 
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
                  <input 
                    type="text"
                    value={plannerQuery}
                    onChange={(e) => setPlannerQuery(e.target.value)}
                    placeholder="Style & Hair Details"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none text-sm"
                  />
                  <button 
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


  const ProductsPage = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
    );

    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-gray-900 mb-4">Beauty & Cosmetics</h2>
          <p className="text-center text-gray-500 mb-8">Curated products for your daily glow.</p>

          <div className="relative w-full max-w-lg mx-auto mb-12">
            <input
              type="text"
              placeholder="Search for products like 'Lipstick'..."
              className="w-full px-6 py-4 pr-12 text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent shadow-sm transition"
              value={productSearchQuery}
              onChange={(e) => setProductSearchQuery(e.target.value)}
            />
            <Search className="absolute w-6 h-6 text-gray-400 right-5 top-1/2 transform -translate-y-1/2" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Glassmorphism AI Matcher - Spans 2 cols */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 shadow-lg border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-white opacity-90"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-serif mb-2 flex items-center text-gray-900">
                    <Gift className="mr-2 text-pink-500" /> AI Product Matcher
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Tell us your skin type or hair texture (e.g., "Dry scalp with locs").
                  </p>
                  <form onSubmit={handleProductAI} className="relative">
                    <input 
                      type="text" 
                      placeholder="Describe needs..." 
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-pink-400 outline-none"
                      value={productQuery}
                      onChange={(e) => setProductQuery(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={isProductLoading || !productQuery.trim()}
                      className="absolute right-2 top-2 p-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
                    >
                      {isProductLoading ? <Loader2 className="animate-spin" size={18}/> : <Wand2 size={18}/>}
                    </button>
                  </form>
                  {productResponse && (
                    <div className="mt-4 bg-white p-4 rounded-xl border border-pink-100 text-sm text-gray-700 italic animate-fade-in shadow-sm">
                      "{productResponse}"
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* NEW: Gift Note Composer */}
            <div className="lg:col-span-1 bg-pink-600 text-white rounded-3xl p-8 shadow-lg flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
               <h3 className="text-xl font-bold mb-2 flex items-center relative z-10">
                 <PenTool className="mr-2" size={20}/> Gift Note Writer
               </h3>
               <p className="text-pink-100 text-xs mb-4 relative z-10">Sending a gift? Let AI write the card.</p>
               <div className="space-y-3 relative z-10">
                  <input 
                    type="text"
                    value={giftQuery}
                    onChange={(e) => setGiftQuery(e.target.value)}
                    placeholder="Who is it for?"
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-pink-200 text-sm focus:outline-none focus:bg-white/30"
                  />
                  <button 
                    onClick={handleGiftAI}
                    disabled={isGiftLoading || !giftQuery.trim()}
                    className="w-full bg-white text-pink-600 font-bold py-2 rounded-lg text-sm hover:bg-pink-50 transition-colors"
                  >
                    {isGiftLoading ? <Loader2 className="animate-spin mx-auto w-4 h-4"/> : "Write Note"}
                  </button>
               </div>
               {giftResponse && (
                 <div className="mt-4 bg-white/10 p-3 rounded-lg text-xs text-white italic border border-white/20 animate-fade-in relative z-10">
                   "{giftResponse}"
                 </div>
               )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <div key={idx} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-80 overflow-hidden">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button 
                      onClick={() => {
                        setSelectedProduct(product);
                        navigate('productdetail');
                      }}
                      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur text-pink-600 px-6 py-2 rounded-full font-bold shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-serif text-pink-500">{product.price}</span>
                      <button onClick={() => addToCart(product)}>
                        <ShoppingBag size={20} className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"/>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-3 text-center py-16 px-8 bg-white/50 rounded-3xl border-2 border-dashed border-pink-200">
                <h3 className="text-2xl font-serif text-gray-700">No Products Found</h3>
                <p className="text-gray-500 mt-2">Try a different search term or clear the search to see all products.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProductDetailPage = () => (
    <div className="py-32 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('products')} className="mb-8 flex items-center text-gray-500 hover:text-pink-600 font-bold transition-colors">
          <ChevronLeft size={20} className="mr-2"/>
          Back to Products
        </button>
        {selectedProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="bg-gray-50 rounded-3xl shadow-lg overflow-hidden border">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover aspect-square"/>
            </div>
            <div className="py-4">
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">{selectedProduct.name}</h2>
              <p className="text-3xl font-serif text-pink-500 mb-6">{selectedProduct.price}</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">{selectedProduct.description}</p>
              <button
                onClick={() => addToCart(selectedProduct)}
                className="w-full px-8 py-4 bg-pink-600 text-white rounded-xl font-bold shadow-lg shadow-pink-300/50 hover:bg-pink-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const CartPage = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('Ksh ', ''));
      return total + price * item.quantity;
    }, 0);

    const handleQuantityChange = (product, amount) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.name === product.name) {
                    const newQuantity = item.quantity + amount;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            });
            return updatedItems.filter(Boolean); // remove nulls from cart
        });
    };
    
    const handleCheckout = () => {
        alert('Thank you for your purchase! Your order has been confirmed.');
        setCartItems([]);
        navigate('home');
    }

    const handleRemoveItem = (product) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== product.name));
    };

    return (
    <div className="py-32 bg-pink-50/30 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif text-center text-gray-900 mb-12">Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center py-16 px-8 bg-white rounded-3xl shadow-md border">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-6"/>
                    <p className="text-gray-500 text-xl font-medium mb-6">Your cart is empty.</p>
                    <button onClick={() => navigate('products')} className="mt-6 px-8 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200">
                        Shop Our Products
                    </button>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-3xl shadow-xl border">
                    <div className="space-y-6">
                        {cartItems.map(item => (
                            <div key={item.name} className="flex items-center justify-between p-4 bg-white rounded-2xl border-b border-gray-100">
                                <div className="flex items-center gap-6">
                                    <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-xl"/>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                                        <p className="text-gray-500 font-bold">{item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-4 border border-gray-200 rounded-full px-4 py-2">
                                        <button onClick={() => handleQuantityChange(item, -1)} className="text-gray-500 hover:text-pink-600 font-bold text-lg">-</button>
                                        <span className="font-bold text-lg">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item, 1)} className="text-gray-500 hover:text-pink-600 font-bold text-lg">+</button>
                                    </div>
                                    <p className="font-bold text-xl w-32 text-right">
                                        Ksh {(parseFloat(item.price.replace('Ksh ', '')) * item.quantity).toFixed(2)}
                                    </p>
                                    <button onClick={() => handleRemoveItem(item)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                                        <X size={20}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200 text-right">
                        <p className="text-3xl font-bold">Total: <span className="text-pink-600">Ksh {totalPrice.toFixed(2)}</span></p>
                        <button 
                            onClick={handleCheckout}
                            className="mt-6 px-10 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
};

  const WeddingPage = () => (
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
                       <input 
                         type="text" 
                         className="flex-1 border border-gray-200 bg-white/50 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
                         placeholder="Describe your vibe..."
                         value={bridalQuery}
                         onChange={(e) => setBridalQuery(e.target.value)}
                       />
                       <button 
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

  const BookingPage = () => (
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
              <button 
                onClick={() => { setShowConfirmation(false); navigate('home'); }}
                className="text-pink-600 font-bold hover:text-pink-800 underline"
              >
                Return Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
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
                  <input 
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
                    <button 
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center transition-all duration-200 font-bold text-sm ${bookingData.location === 'salon' ? 'bg-white text-pink-600 shadow-md border-2 border-pink-500' : 'bg-transparent border border-gray-300 text-gray-500 hover:bg-gray-200'}`}
                      onClick={() => setBookingData({...bookingData, location: 'salon'})}
                    >
                      <Scissors size={16} className="mr-2" /> Salon
                    </button>
                    <button 
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
                  <button 
                    type="button"
                    onClick={() => setIsAIModalOpen(true)}
                    className="text-xs text-pink-500 flex items-center hover:text-pink-700 font-bold bg-pink-50 px-2 py-1 rounded-md transition-colors"
                  >
                    <Sparkles size={12} className="mr-1" /> Ask AI
                  </button>
                </div>
                <select 
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
                  <input 
                    required
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-gray-600"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Time</label>
                  <select 
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

              <button 
                type="submit" 
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
  );

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
                { icon: MapPin, title: "Salon Address", text: "123 Blossom Avenue, Beverly Hills, CA" },
                { icon: Phone, title: "Phone", text: "(555) 123-4567" },
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
              <li><button onClick={() => navigate('home')} className="hover:text-pink-400 transition-colors">Home</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-pink-400 transition-colors">Services</button></li>
              <li><button onClick={() => navigate('products')} className="hover:text-pink-400 transition-colors">Products</button></li>
              <li><button onClick={() => navigate('weddings')} className="hover:text-pink-400 transition-colors">Weddings</button></li>
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

  return (
    <div className="min-h-screen font-sans text-gray-900 relative selection:bg-pink-200 selection:text-pink-900 bg-gray-50">
      <Header />
      <main className="animate-fade-in">
        {currentPage === 'home' && (
          <>
            <Hero />
            <StyleHarmonySection />
            <InstagramSection />
            {/* Testimonials Section embedded in Home */}
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
          </>
        )}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'productdetail' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'weddings' && <WeddingPage />}
        {currentPage === 'booking' && <BookingPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />

      {/* Floating Action Button for AI Consultant */}
      <button 
        onClick={() => setIsAIModalOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-600 to-rose-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all z-40 animate-bounce-slow group"
      >
        <span className="absolute right-16 top-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-lg translate-x-2 group-hover:translate-x-0 font-bold">
          Ask Assistant
        </span>
        <Sparkles className="h-6 w-6" />
      </button>

      {/* AI Consultant Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] transform transition-all scale-100 border border-white/40">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-5 flex justify-between items-center">
              <div className="flex items-center text-white">
                <div className="bg-white/20 p-2 rounded-xl mr-3 backdrop-blur-sm">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Inner Beauty Assistant</h3>
                  <p className="text-pink-100 text-xs flex items-center"><Sparkles size={10} className="mr-1" /> Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAIModalOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-6 overflow-y-auto bg-white/50">
               {!aiResponse && !isAiLoading && (
                 <div className="text-center text-gray-500 mt-8">
                   <div className="bg-white p-5 rounded-full inline-block shadow-lg mb-4 animate-pulse-slow">
                      <Sparkles className="h-10 w-10 text-pink-500" />
                   </div>
                   <p className="mb-2 font-bold text-gray-800">How can I help you glow?</p>
                   <p className="text-sm max-w-xs mx-auto">Ask about Knotless braids, Sisterlocks, or our wedding packages!</p>
                 </div>
               )}
               
               {isAiLoading && (
                 <div className="flex flex-col items-center justify-center h-48 space-y-4">
                   <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
                   <p className="text-pink-600 font-bold animate-pulse">Consulting beauty experts...</p>
                 </div>
               )}

               {aiResponse && !isAiLoading && (
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100 animate-fade-in-up">
                   <h4 className="font-serif text-pink-600 mb-3 flex items-center font-bold border-b border-gray-100 pb-2">
                     <Sparkles size={16} className="mr-2" /> Recommendation
                   </h4>
                   <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                     {aiResponse}
                   </div>
                   <div className="mt-4 pt-3 flex justify-end">
                      <button 
                        onClick={() => {
                          setIsAIModalOpen(false);
                          navigate('booking');
                        }}
                        className="text-xs bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors shadow-md font-bold"
                      >
                        Book Now
                      </button>
                   </div>
                 </div>
               )}
               <div ref={chatEndRef} />
            </div>

            {/* Modal Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleAskAI} className="relative">
                <input 
                  type="text"
                  placeholder="Ask about braids, nails, etc..." 
                  className="w-full pl-5 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none transition-all text-sm shadow-inner"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={isAiLoading || !aiQuery.trim()}
                  className={`absolute right-3 top-3 p-2 rounded-xl transition-all ${
                    aiQuery.trim() && !isAiLoading 
                      ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-md transform hover:scale-105' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}