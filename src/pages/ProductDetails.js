import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";

function ProductDetails({ setIsLoading, isLoading, addToCart, product }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const dec = () => {
    if (quantity < 2) return;
    setQuantity(quantity - 1);
  };

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
    }
  };

  const handleBuyNow = () => {
    const quantity = 1;
    const checkoutURL = `/product/${product.id}/checkout/${quantity}`;
    console.log("Navigating to:", checkoutURL);
    navigate(checkoutURL);
  };

  useEffect(
    function () {
      async function fetchProduct() {
        try {
          setIsLoading(true);
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await res.json();
          setSelectedProduct(data);
          console.log(data);
        } catch (error) {
          console.error("There was an issue fetching the data");
        } finally {
          setIsLoading(false);
        }
      }
      fetchProduct();
    },
    [id, setIsLoading]
  );

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="select-products-section">
          <p>
            <Link to="/">&larr; Back to products</Link>
          </p>
          <div className="grid grid-cols-2 gap-x-16 mt-16">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div className="selected-info">
              <h2 className="text-3xl font-bold">{selectedProduct.title}</h2>
              <p>
                Price:{" "}
                <span className="text-xl font-bold">
                  ${selectedProduct.price}
                </span>
              </p>
              <p>Category: {selectedProduct.category}</p>
              <p className="border border-gray-400 px-2 py-2 rounded-xl">
                <span>
                  Description: <br />
                  {selectedProduct.description}
                </span>
              </p>
              <span>
                Rating: ⭐ {selectedProduct.rating?.rate} (
                {selectedProduct.rating?.count || 0})
              </span>
              <div className="flex items-center justify-end">
                <span className="mr-3">Qty: </span>
                <div className="border-2 border-orange-700 rounded-lg">
                  <button
                    onClick={dec}
                    className="py-1 mr-4 bg-transparent text-black text-xl border-r-2 border-orange-700 rounded-none"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={inc}
                    className="py-1 ml-4 bg-transparent text-black text-xl border-l-2 border-orange-700 rounded-none"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-end items-center gap-4">
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button className="bg-transparent  border-2 border-orange-600 rounded-lg text-black">
                  🧡
                </button>
                <Link
                  // to={`/product/${id}/checkout?quantity=${quantity}`}
                  to={`/product/${id}/checkout/${quantity}`}
                  // to={`/product/${id}/checkout`}
                  // onClick={handleBuyNow}
                  className="py-2 px-4 w-28 bg-transparent border-2 border-orange-700 rounded-lg text-black text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
