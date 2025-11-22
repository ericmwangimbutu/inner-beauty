import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Loader2, Send, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chatbot = ({ callGemini, servicesData, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Welcome to Inner Beauty! How can I help you today? You can ask me about our services, products, or get beauty advice.',
        },
      ]);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const servicesList = JSON.stringify(Object.keys(servicesData));
      const productsList = JSON.stringify(products.map((p) => p.name));
      const conversationHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');

      const prompt = `
        You are "Inner Beauty AI", a helpful and friendly chatbot for the Inner Beauty Salon.
        Your persona is professional, warm, and knowledgeable.
        You have access to the salon's data:
        - Service Categories: ${servicesList}
        - Products: ${productsList}

        Current conversation:
        ${conversationHistory}
        user: ${inputValue}

        Your task:
        1.  Analyze the user's latest message in the context of the conversation.
        2.  Provide a helpful, concise, and relevant response.
        3.  If they ask for a recommendation, suggest a *specific* service or product by name from the lists.
        4.  If the conversation seems to be about booking, suggest they visit the booking page.
        5.  Keep responses under 150 words.
        
        Assistant response:
      `;

      const aiResponseText = await callGemini(prompt);
      const assistantMessage = {
        role: 'assistant',
        content: aiResponseText || "I'm reflecting on that. Could you please rephrase?",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini call failed:', error);
      const errorMessage = {
        role: 'assistant',
        content: "Sorry, I'm having a little trouble connecting right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        aria-label="Open Chat"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-600 to-rose-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all z-40 animate-bounce-slow group"
      >
         <span className="absolute right-16 top-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-lg translate-x-2 group-hover:translate-x-0 font-bold">
            Chat With Us
        </span>
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end sm:items-center sm:justify-end p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] sm:max-w-sm transform transition-all scale-95 opacity-0 animate-fade-in-up border border-white/40">

            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-5 flex justify-between items-center">
              <div className="flex items-center text-white">
                <div className="bg-white/20 p-2 rounded-xl mr-3 backdrop-blur-sm">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Inner Beauty Assistant</h3>
                  <p className="text-pink-100 text-xs flex items-center">
                    <Sparkles size={10} className="mr-1" /> Powered by Gemini
                  </p>
                </div>
              </div>
              <button
                aria-label="Close Chat"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white/50">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs md:max-w-sm rounded-2xl p-3 md:p-4 shadow-md text-sm ${ 
                        msg.role === 'user'
                          ? 'bg-pink-600 text-white rounded-br-lg'
                          : 'bg-white text-gray-800 rounded-bl-lg border border-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 rounded-2xl p-4 shadow-md rounded-bl-lg border border-gray-100">
                        <Loader2 className="h-5 w-5 text-pink-500 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  aria-label="Ask Inner Beauty Assistant"
                  type="text"
                  placeholder="Ask a question..."
                  className="w-full pl-5 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none transition-all text-sm shadow-inner"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  aria-label="Send Message"
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className={`absolute right-3 top-3 p-2 rounded-xl transition-all ${ 
                    !isLoading && inputValue.trim()
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
    </>
  );
};

export default Chatbot;
