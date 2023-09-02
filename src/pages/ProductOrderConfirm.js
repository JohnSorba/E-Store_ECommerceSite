import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function ProductOrderConfirm({ orderDetails }) {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const { id, quantity } = useParams();
  console.log("order details in ProductConfirm: ", orderDetails);

  const quantityValue = parseInt(quantity, 10);

  // GRAND TOTAL
  const subtotal = quantityValue * selectedProduct.price;
  const taxInterest = 0.05;
  const taxes = Number(taxInterest * orderDetails?.subtotal);
  const shippingFee = 10;
  const grandTotal = Number(orderDetails?.subtotal + shippingFee + taxes);

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
    <div className="orderConfirm-section">
      <p className="text-lg">Thank you!</p>
      <h1 className="text-7xl text-gray-500 font-bold my-8">
        Order Confirmed!
      </h1>
      <h1 className="text-3xl font-bold my-2 flex items-end gap-4">
        It's on the way!{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
      </h1>
      <p className="text-gray-400 text-xl">
        Your order #2382038434 has shipped and will be with you soon,{" "}
        {orderDetails?.name}
      </p>

      <div className="grid grid-cols-8 gap-x-8 my-16 border-t-2 py-4">
        <ul className="col-span-5 border-b-2 border-gray-400">
          {isloading ? (
            <Loader />
          ) : (
            <div>
              <li className="grid grid-cols-8 gap-8 py-4 border-b-1 border-gray-200">
                <img
                  src={orderDetails?.items}
                  alt="An image"
                  className="col-span-2"
                />
                <div className="flex flex-col gap-4 col-span-5">
                  <span className="text-lg font-semibold">
                    {selectedProduct?.title}
                  </span>
                  <span className="text-gray-500">
                    {selectedProduct?.description}
                  </span>
                  <span className="font-semibold">
                    Qty: <span className="text-lg">{quantityValue}</span>
                  </span>
                </div>
                <span className=" col-span-1 justify-self-end self-end">
                  $
                  <span className="text-3xl font-semibold">
                    {selectedProduct?.price}
                  </span>
                </span>
              </li>
            </div>
          )}
        </ul>

        <div className="text-left col-span-3 pl-4 flex flex-col gap-1">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          {/* OPTIONAL CHAINING ENSURES ITEMS ARE ONLY LOADED WHEN STATE IS NOT NULL*/}
          <p>Name: {orderDetails?.name}</p>
          <p>Email: {orderDetails?.email}</p>
          <p>Address: {orderDetails?.address}</p>
          <p>Payment Method: {orderDetails?.paymentOption}</p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold my-0">Summary</h2>
      <div className="flex flex-col gap-8 w-1/2 border-t-2 py-4 my-8">
        <div className="flex justify-between border-b border-gray-400 pb-2">
          <span>Subtotal</span>
          <span>$ {orderDetails?.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b border-gray-400 pb-2">
          <span>Shipping</span>
          <span>$ {shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b pb-2 text-xl text-orange-600">
          <span>Total</span>
          <span>$ {grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/" className="text-orange-700 font-semibold text-lg">
        &larr; Continue shopping
      </Link>
    </div>
  );
}

export default ProductOrderConfirm;
//Limkokwing University, Inovasi 1-1, Jalan Teknokrat 1/1, Off Jalan Apec, Cyberjaya, Selangor, Malaysia
