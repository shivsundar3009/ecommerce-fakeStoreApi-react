import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/features/productsSlice';
import useCart from '../context/CartContext';

function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { productId } = useParams();
  const { addToCart } = useCart();

  const { allProducts, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const product = allProducts.find((prod) => prod.id === Number(productId));

  const relatedProducts = allProducts.filter((prod) => prod.id !== Number(productId)).slice(0, 4);

  if (status === 'loading') {
    return <div className="text-center text-lg font-semibold text-blue-600">Loading product details...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-lg font-semibold text-red-600">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center text-lg font-semibold text-red-600">Product not found!</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Main content area */}
      <div className="flex flex-col md:flex-row flex-grow bg-gray-100 p-10">
        {/* Left side: Product Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 rounded-lg shadow-md"
          />
        </div>

        {/* Right side: Product Details */}
        <div className="flex-1 p-8 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg">{product.description}</p>
          <p className="text-2xl font-semibold mt-4">${product.price}</p>

          <button onClick={() => handleAddToCart(product?.id)} className="btn btn-primary mt-6">
            Add To Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-white py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center justify-between cursor-pointer"
              onClick={() => navigate(`/product/${relatedProduct.id}`)} // Navigate to related product
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.title}
                className="h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{relatedProduct.title}</h3>
              <p className="text-xl font-bold mt-2">${relatedProduct.price}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent component's click event from firing
                  handleAddToCart(relatedProduct.id);
                }}
                className="btn btn-secondary mt-4"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
