import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function ProductOrderConfirm({ orderDetails }) {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const { id, quantity } = useParams();
  console.log("order details in confirm: ", orderDetails);

  const quantityValue = parseInt(quantity, 10);

  // GRAND TOTAL
  const subtotal = quantityValue * selectedProduct.price;
  const taxInterest = 0.05;
  const taxes = Number(taxInterest * subtotal);
  const shippingFee = 10;
  const grandTotal = Number(subtotal + shippingFee + taxes);

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
      <h1 className="text-3xl font-bold my-2">It's on the way!</h1>
      <p className="text-gray-400 text-xl">
        Your order #2382038434 has shipped and will be with you soon.
      </p>

      <div className="grid grid-cols-8 gap-x-8 my-16 border-t-2 py-4">
        <ul className="col-span-5 border-b-2 border-gray-400">
          {isloading ? (
            <Loader />
          ) : (
            <div>
              <li className="grid grid-cols-8 gap-8 py-4 border-b-1 border-gray-200">
                <img
                  src={selectedProduct?.image}
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
          <span>$ {subtotal.toFixed(2)}</span>
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
