import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";

function ProductDetails({ setIsLoading, isLoading, addToCart }) {
  const { id } = useParams();
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
          <div className="grid grid-cols-2 gap-x-16">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div className="selected-info">
              <h2 className="text-3xl font bold under">
                {selectedProduct.title}
              </h2>
              <p>
                Price:{" "}
                <span className="text-lg font-bold">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-3">Qty: </span>
                  <button
                    onClick={dec}
                    className="py-0 px-2 mr-2 bg-transparent text-black font-bold text-2xl border border-orange-700 rounded-lg"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={inc}
                    className="py-0 px-2 ml-2 bg-transparent text-black font-bold text-2xl border border-orange-700 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <Link
                  to="/order-summary"
                  className="py-2 px-4 bg-transparent border-2 border-orange-700 rounded-lg text-black"
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
