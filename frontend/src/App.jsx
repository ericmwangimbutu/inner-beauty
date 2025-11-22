import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Weddings from './pages/Weddings';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import MainLayout from './layouts/MainLayout';

// Backend API endpoint (also used for Gemini proxying)
const apiBase =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost/backend/api/index.php';
const defaultModel =
  import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash-preview-09-2025';

import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- Data Fetching ---
  const { services: flatServices, products, status } = usePortfolioData();
  const [categorizedServices, setCategorizedServices] = useState({});

  useEffect(() => {
    if (flatServices && flatServices.length > 0) {
      const groupedServices = flatServices.reduce((acc, service) => {
        const category = service.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(service);
        return acc;
      }, {});
      setCategorizedServices(groupedServices);
    }
  }, [flatServices]);

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
  const [bridalQuery, setBridalQuery] = useState('');
  const [bridalResponse, setBridalResponse] = useState('');
  const [isBridalLoading, setIsBridalLoading] = useState(false);

  const [productQuery, setProductQuery] = useState('');
  const [productResponse, setProductResponse] = useState('');
  const [isProductLoading, setIsProductLoading] = useState(false);

  const [careQuery, setCareQuery] = useState('');
  const [careResponse, setCareResponse] = useState('');
  const [isCareLoading, setIsCareLoading] = useState(false);

  const [styleQuery, setStyleQuery] = useState('');
  const [styleResponse, setStyleResponse] = useState('');
  const [isStyleLoading, setIsStyleLoading] = useState(false);

  const [plannerQuery, setPlannerQuery] = useState('');
  const [plannerResponse, setPlannerResponse] = useState('');
  const [isPlannerLoading, setIsPlannerLoading] = useState(false);

  const [giftQuery, setGiftQuery] = useState('');
  const [giftResponse, setGiftResponse] = useState('');
  const [isGiftLoading, setIsGiftLoading] = useState(false);

  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Product Detail & Cart
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

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
    alert(`${product.name} added to cart!`);
  };

  // Handle Booking Submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setBookingData({ name: '', email: '', service: '', location: 'salon', date: '', time: '' });
      navigate('/');
    }, 3000);
  };

  // --- AI Handlers ---
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

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen bg-pink-50"><div>Loading...</div></div>;
  }
  
  return (
    <Routes>
      <Route path="/" element={<MainLayout cartItems={cartItems} navigate={navigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} callGemini={callGemini} servicesData={categorizedServices} products={products} />}>
        <Route index element={<Home navigate={navigate} handleStyleAI={handleStyleAI} styleQuery={styleQuery} setStyleQuery={setStyleQuery} isStyleLoading={isStyleLoading} styleResponse={styleResponse} />} />
        <Route path="services" element={<Services servicesData={categorizedServices} serviceSearchQuery={serviceSearchQuery} setServiceSearchQuery={setServiceSearchQuery} careQuery={careQuery} setCareQuery={setCareQuery} handleCareAI={handleCareAI} isCareLoading={isCareLoading} careResponse={careResponse} plannerQuery={plannerQuery} setPlannerQuery={setPlannerQuery} handlePlannerAI={handlePlannerAI} isPlannerLoading={isPlannerLoading} plannerResponse={plannerResponse} />} />
        <Route path="products" element={<Products products={products} productSearchQuery={productSearchQuery} setProductSearchQuery={setProductSearchQuery} navigate={navigate} addToCart={addToCart} productQuery={productQuery} setProductQuery={setProductQuery} handleProductAI={handleProductAI} isProductLoading={isProductLoading} productResponse={productResponse} giftQuery={giftQuery} setGiftQuery={setGiftQuery} handleGiftAI={handleGiftAI} isGiftLoading={isGiftLoading} giftResponse={giftResponse} setSelectedProduct={setSelectedProduct} />} />
        <Route path="productdetail" element={<ProductDetail selectedProduct={selectedProduct} addToCart={addToCart} />} />
        <Route path="cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} navigate={navigate} />} />
        <Route path="weddings" element={<Weddings bridalQuery={bridalQuery} setBridalQuery={setBridalQuery} handleBridalAI={handleBridalAI} isBridalLoading={isBridalLoading} bridalResponse={bridalResponse} />} />
        <Route path="booking" element={<Booking servicesData={categorizedServices} bookingData={bookingData} setBookingData={setBookingData} handleBookingSubmit={handleBookingSubmit} showConfirmation={showConfirmation} />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
