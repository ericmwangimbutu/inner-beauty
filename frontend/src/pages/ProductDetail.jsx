import React from 'react';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = ({ selectedProduct, addToCart }) => {
    const navigate = useNavigate();
    return(
    <div className="py-32 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button aria-label="Back to Products"
          onClick={() => navigate('/products')} className="mb-8 flex items-center text-gray-500 hover:text-pink-600 font-bold transition-colors">
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
              <button aria-label="Add to Cart"
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
)};

export default ProductDetailPage;