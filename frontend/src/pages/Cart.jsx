import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cartItems, setCartItems, navigate }) => {
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
        navigate('/');
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
                    <button aria-label="View Products"
                       onClick={() => navigate('/products')} className="mt-6 px-8 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200">
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
                                        <button aria-label="Decrease Quantity" onClick={() => handleQuantityChange(item, -1)} className="text-gray-500 hover:text-pink-600 font-bold text-lg">-</button>
                                        <span className="font-bold text-lg">{item.quantity}</span>
                                        <button aria-label="Increase Quantity"  onClick={() => handleQuantityChange(item, 1)} className="text-gray-500 hover:text-pink-600 font-bold text-lg">+</button>
                                    </div>
                                    <p className="font-bold text-xl w-32 text-right">
                                        Ksh {(parseFloat(item.price.replace('Ksh ', '')) * item.quantity).toFixed(2)}
                                    </p>
                                    <button aria-label="Remove Item" onClick={() => handleRemoveItem(item)} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                                        <X size={20}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200 text-right">
                        <p className="text-3xl font-bold">Total: <span className="text-pink-600">Ksh {totalPrice.toFixed(2)}</span></p>
                        <button aria-label="Proceed to Checkout"
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

export default CartPage;