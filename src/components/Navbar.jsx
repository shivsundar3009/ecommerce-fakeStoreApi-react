import React, { useEffect, useState } from "react";
import useCart from "../context/CartContext";
import { useSelector } from "react-redux";

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { cartItems } = useCart();
    const allProducts = useSelector((state) => state.products.allProducts);

    const [cartProductsData, setCartProductsData] = useState([]);

    // Synchronize cart product details when `cartItems` or `allProducts` changes
    useEffect(() => {
        if (allProducts.length && cartItems.length) {
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
                    <h1>FakeStore</h1>
                </div>
                <div className="flex gap-5">
                    <div>
                        <h2>Home</h2>
                    </div>
                    <div>
                        <p onClick={handleClick} className="cursor-pointer">
                            Cart ({cartItems.length})
                        </p>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed top-0 right-0 w-1/3 h-full bg-gray-800 text-white shadow-lg z-50">
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <button
                            onClick={closeSidebar}
                            className="text-red-500 font-bold"
                        >
                            X
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        {cartProductsData.length > 0 ? (
                            cartProductsData.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between bg-gray-700 p-3 rounded-md"
                                >
                                    <div>
                                        <h3 className="font-semibold">{product.title}</h3>
                                        <p className="text-sm text-gray-300">
                                            {product.description?.substring(0, 50)}...
                                        </p>
                                        <p className="text-sm">
                                            Price: ${product.price} × {product.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed top-0 left-0 w-2/3 h-full bg-black bg-opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}
        </>
    );
}

export default Navbar;
