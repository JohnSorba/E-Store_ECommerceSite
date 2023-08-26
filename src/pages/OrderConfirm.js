import { useState } from "react";
import { Link } from "react-router-dom";

function OrderConfirm({ orderDetails, selectedItems, totalSubtotals }) {
  const [loading, setLoading] = useState(false);
  console.log("order details in confirm: ", orderDetails);

  // GRAND TOTAL
  const taxInterest = 0.05;
  const taxes = Number(taxInterest * totalSubtotals);
  const shippingFee = 10;
  const grandTotal = Number(totalSubtotals + shippingFee + taxes);

  return (
    <div className="orderConfirm-section">
      <p className="text-lg">Thank you!</p>
      <h1 className="text-7xl text-gray-500 font-bold my-8">
        Order Confirmed!
      </h1>
      <h1 className="text-3xl font-bold my-2">It's on the way!</h1>
      <p className="text-gray-400 text-xl">
        Your order #2382038434 has shipped and will be with you soon,{" "}
        {orderDetails?.name}.
      </p>
      <p>This order contains {} total items</p>

      <div className="grid grid-cols-8 gap-x-8 my-16 border-t-2 py-4">
        <ul className="col-span-5 ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            selectedItems.map((item) => (
              <OrderConfirmItem key={item.id} item={item} />
            ))
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
      <h2 className="text-2xl font-semibold">Summary</h2>
      <div className="flex flex-col gap-4 w-1/2 border-t-2 py-4 my-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$ {totalSubtotals.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping + Tax (if applicable)</span>
          <span>
            ${shippingFee} (${taxes.toFixed(2)})
          </span>
        </div>
        <div className="flex justify-between text-xl mt-4 border-t pt-2 border-orange-500 text-orange-600">
          <span>Total</span>
          <span className="text-2xl font-semibold">
            $ {grandTotal.toFixed(2)}
          </span>
        </div>
      </div>
      <Link to="/" className="text-orange-700 font-semibold text-lg">
        &larr; Continue shopping
      </Link>
    </div>
  );
}

function OrderConfirmItem({ item }) {
  return (
    <div>
      {/* <li>{item.title}</li> */}
      <li className="grid grid-cols-8 gap-8 py-4 border-b-2 border-gray-300">
        <img src={item.image} alt="An image" className="col-span-2" />
        <div className="flex flex-col gap-4 col-span-5">
          <span className="text-lg font-semibold">{item.title}</span>
          <span className="text-gray-500">{item.description}</span>
          <span className="font-semibold">
            Qty: <span className="text-lg mt-auto">{item.quantity}</span>
          </span>
        </div>
        <span className=" col-span-1 justify-self-end self-end">
          $<span className="text-3xl font-semibold">{item.price}</span>
        </span>
      </li>
    </div>
  );
}

export default OrderConfirm;
//Limkokwing University, Inovasi 1-1, Jalan Teknokrat 1/1, Off Jalan Apec, Cyberjaya, Selangor, Malaysia
