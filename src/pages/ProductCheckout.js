import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import PaymentForm from "../components/PaymentForm";

function ProductCheckout({ orderDetails, setOrderDetails }) {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { id, quantity } = useParams();

  console.log(selectedProduct);

  const handlePlaceOrder = (orderDetails) => {
    setOrderPlaced(true);
    setOrderDetails(orderDetails);
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  };

  // Convert quantity to a number
  const quantityValue = parseInt(quantity, 10);
  const taxInterest = 0.05;

  // Fetch the specific product using the id
  // Example: Fetch the product from the products array based on the id
  // const product = products.find((item) => item.id === parseInt(id));

  const shippingFee = 10;
  const totalAmount = selectedProduct.price * quantityValue;
  const taxes = taxInterest * totalAmount;
  const grandTotal = totalAmount + shippingFee + taxes;

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
    [id]
  );

  return (
    <div className="checkout-section">
      <h1 className="text-5xl mb-24">Welcome to the Checkout Page!</h1>
      <div className="text-left mb-4">
        <Link to="/">&larr; Back to products</Link>
      </div>

      <div className="grid grid-cols-2 text-left border-2 border-orange-500 rounded-lg px-4 py-4">
        {orderPlaced === true ? (
          <div className="col-span-8 text-center py-32">
            <h1 className="text-5xl mb-16">
              Your order has been placed!
              <br />
              Thank you for shopping with us,{" "}
              {orderDetails ? (
                <>
                  <span>{orderDetails?.name}</span>
                </>
              ) : (
                <span>No_Name</span>
              )}
            </h1>
            <p>
              Go the the{" "}
              <Link
                to={`/order-confirm/${id}/${quantity}`}
                className="text-orange-400 hover:underline"
              >
                Order Confirmation
              </Link>{" "}
              page
            </p>
          </div>
        ) : (
          <>
            <div className="pr-4 border-r-2 border-r-orange-200">
              <PaymentForm
                onPlaceOrder={handlePlaceOrder}
                selectedProduct={selectedProduct}
              />
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="px-8 flex flex-col gap-8">
                <h1 className="text-2xl font-semibold">
                  {quantityValue > 1 ? (
                    <span>Order Summary ({quantityValue} Items) </span>
                  ) : (
                    <span>Order Summary ({quantityValue} Item) </span>
                  )}
                </h1>
                {selectedProduct && (
                  <div className="flex flex-col h-full justify-between gap-16">
                    <div className="grid grid-cols-2 gap-8">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="border border-orange-200 rounded-xl p-2"
                      />
                      <div>
                        <h2 className="text-xl mb-4">
                          {selectedProduct.title}
                        </h2>
                        <h2>
                          Rating: &#9733;{" "}
                          <span className="text-lg font-semibold">
                            {selectedProduct.rating?.rate} /
                          </span>
                          5
                        </h2>
                        <p>Qty: {quantityValue}</p>
                        <p className="mt-8">
                          ${" "}
                          <span className="text-2xl">
                            {selectedProduct.price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="flex justify-between py-2 border-y">
                        Subtotal ({quantityValue} items):{" "}
                        <span className="text-lg">
                          $ {totalAmount.toFixed(2)}
                        </span>
                      </p>
                      <p className="flex justify-between py-2 border-b">
                        Shipping: <span>$ {shippingFee.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between py-2 border-b">
                        Taxes (5%): <span>$ {taxes.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between py-4 text-2xl text-orange-500 font-semibold">
                        Order Total:<span>${grandTotal.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCheckout;
