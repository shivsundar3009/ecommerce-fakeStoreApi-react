import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/features/productsSlice'; // Make sure the path is correct
import useCart from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Loading component
function Loading() {
  return <div className="text-center text-lg font-semibold text-blue-600">Loading products...</div>;
}

// Error component
function Error({ message }) {
  return <div className="text-center text-lg font-semibold text-red-600">Error: {message}</div>;
}

function Products() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const handleProductClick = (productId) => {

    navigate(`/product/${productId}`); // Navigate to product detail page with productId

  }
  
  // Get state from Redux store
  const { allProducts, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Dispatch the fetchProducts action to get products
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    ); // Show loading while fetching data
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Error message={error} />
      </div>
    ); // Show error message if request fails
  }

  console.log(allProducts);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {allProducts.map((product) => (
          <div
            onClick={() => handleProductClick(product.id)} // Navigate to product detail page when clicked on a product card
            key={product?.id}
            className="card card-compact bg-white w-full shadow-lg hover:shadow-2xl transition-shadow duration-200"
          >
            <figure className="bg-gray-200 p-3">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title truncate">{product?.title}</h2>
              <p className="text-gray-600 text-sm truncate">{product?.description || "No description available"}</p>
              <p className="text-lg font-semibold text-green-600">${product?.price || "N/A"}</p>
              <div className="card-actions justify-end">
                <button onClick={() => handleAddToCart(product?.id)} className="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
