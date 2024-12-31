import React, { useEffect, useState } from "react";
import useCart from "../context/CartContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {

    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { cartItems, updateQuantity, removeItemFromCart, clearCart } = useCart();
    const allProducts = useSelector((state) => state.products.allProducts);

    const [cartProductsData, setCartProductsData] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    // Synchronize cart product details when `cartItems` or `allProducts` changes
    useEffect(() => {
        if (allProducts?.length && cartItems?.length) {
            const updatedCartProductsData = cartItems.map((cartItem) => {
                const product = allProducts.find(
                    (product) => product.id === cartItem.productId
                );
                return {
                    ...product,
                    quantity: cartItem.quantity,
                };
            });

            setCartProductsData(updatedCartProductsData);

            // Calculate grand total
            const total = updatedCartProductsData.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            );
            setGrandTotal(total);
        } else {
            setCartProductsData([]);
            setGrandTotal(0);
        }
    }, [allProducts, cartItems]);

    const handleClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            {/* Navbar */}
            <div className="bg-blue-500 h-14 flex justify-around items-center text-white font-bold">
                <div>
                <Link to="/">FakeStore</Link>
                </div>
                <div className="flex gap-5">
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <p onClick={handleClick} className="cursor-pointer">
                            Cart ({cartItems?.length})
                        </p>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed top-0 right-0 sm:w-2/5 w-full h-full bg-gray-800 text-white shadow-lg z-50">
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button
                            onClick={closeSidebar}
                            className="text-red-500 font-bold"
                        >
                            X
                        </button>
                    </div>
                    <div className="p-4">
                        {/* Grand Total and Clear Cart Button */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">
                                Grand Total: ${grandTotal.toFixed(2)}
                            </h3>
                            <button
                                onClick={clearCart}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-theme(height.14)-80px)] pb-4">
                            {cartProductsData?.length > 0 ? (
                                cartProductsData.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex flex-col gap-4 bg-gray-700 p-3 rounded-md"
                                    >
                                        {/* Product Details */}
                                        <div className="flex gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-16 w-16 object-cover"
                                            />
                                            <div>
                                                <h3 className="font-semibold">{product.title}</h3>
                                                <p className="text-sm text-gray-300">
                                                    {product.description?.substring(0, 50)}...
                                                </p>
                                                <p className="text-sm">
                                                    Price: ${product.price.toFixed(2)} ×{" "}
                                                    {product.quantity} ={" "}
                                                    <span className="font-bold">
                                                        ${(
                                                            product.price *
                                                            product.quantity
                                                        ).toFixed(2)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between items-center mt-2">
                                            {/* Quantity Buttons */}
                                            <div className="flex gap-2 items-center">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(product.id, -1)
                                                    }
                                                    className="bg-gray-500 text-white px-2 py-1 rounded-md"
                                                >
                                                    -
                                                </button>
                                                <span>{product.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(product.id, 1)
                                                    }
                                                    className="bg-gray-500 text-white px-2 py-1 rounded-md"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItemFromCart(product.id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded-md"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Your cart is empty.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed top-0 left-0 w-3/5 h-full bg-black bg-opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}
        </>
    );
}

export default Navbar;
