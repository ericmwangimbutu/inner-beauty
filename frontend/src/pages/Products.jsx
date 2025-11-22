import React, { useState } from 'react';
import { 
  ShoppingBag,
  Wand2,
  Search,
  Loader2,
  Gift,
  PenTool
} from 'lucide-react';

const ProductsPage = ({ products, productSearchQuery, setProductSearchQuery, navigate, addToCart, productQuery, setProductQuery, handleProductAI, isProductLoading, productResponse, giftQuery, setGiftQuery, handleGiftAI, isGiftLoading, giftResponse, setSelectedProduct }) => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
    );

    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-gray-900 mb-4">Beauty & Cosmetics</h2>
          <p className="text-center text-gray-500 mb-8">Curated products for your daily glow.</p>

          <div className="relative w-full max-w-lg mx-auto mb-12">
            <input aria-label="Search Products"
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
                    <input aria-label="Product Needs Description"
                      type="text" 
                      placeholder="Describe needs..." 
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-pink-400 outline-none"
                      value={productQuery}
                      onChange={(e) => setProductQuery(e.target.value)}
                    />
                    <button aria-label="Find Products"
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
                  <input aria-label="Gift Recipient or Occasion"
                    type="text"
                    value={giftQuery}
                    onChange={(e) => setGiftQuery(e.target.value)}
                    placeholder="Who is it for?"
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-pink-200 text-sm focus:outline-none focus:bg-white/30"
                  />
                  <button aria-label="Write Gift Note"
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
                    <button aria-label="View Product Details"
                      onClick={() => {
                        setSelectedProduct(product);
                        navigate('/productdetail');
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
                      <button aria-label="Add to Cart" onClick={() => addToCart(product)}>
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

  export default ProductsPage;