import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function PaymentForm({
  onPlaceOrder,
  selectedItems,
  selectedProduct,
  totalSubtotals,
  grandTotal,
  productTotal,
  productSubtotal,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [dateExpired, setDateExpired] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentOption, setPaymentOption] = useState("credit");
  const { id, quantity } = useParams();

  const date = Date.now();
  const newDate = new Date(date);
  const currentDate = newDate.toLocaleDateString();
  const currentTime = newDate.toLocaleTimeString();
  const currentDateTime = `${currentDate} - ${currentTime}`;
  const deliveryDate = date + 700000000;
  const newDeliveryDate = new Date(deliveryDate).toLocaleDateString();
  const newDeliveryTime = new Date(deliveryDate).toLocaleTimeString();

  console.log(date);
  console.log("now", currentDate);

  console.log(deliveryDate);
  console.log(newDeliveryDate);

  // generate random number
  function generateOrderId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(2, 10); // Generate random alphanumeric string
    return `${timestamp}-${randomString}`;
  }
  const orderId = generateOrderId();

  console.log("selected product in payment form: ", selectedProduct);

  const newSubtotaltotal = () => {
    let number = 0;

    if (selectedProduct) {
      number = productSubtotal.toFixed(2);
      return number;
    } else {
      number = totalSubtotals.toFixed(2);
      return number;
    }
  };
  const subtotal = newSubtotaltotal();

  const newtotal = () => {
    let number = 0;

    if (selectedProduct) {
      // toLocaleString() adds a comma to rep a 1,000
      number = Number(productTotal.toLocaleString()).toFixed(2);
      return number;
    } else {
      number = Number(grandTotal.toLocaleString()).toFixed(2);
      return number;
    }
  };
  const total = newtotal();

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetails = {
      orderId: orderId,
      name,
      email,
      phone,
      address,
      paymentOption,
      items: selectedItems ? selectedItems : selectedProduct,
      subtotal: subtotal,
      total: total,
      orderDate: currentDateTime,
      deliveryDate: newDeliveryDate,
      time: newDeliveryTime,
    };

    onPlaceOrder(orderDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-16">
        <h1 className="text-2xl mb-8 font-semibold">Contact Information</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mb-4 py-2 px-2  border-2 rounded-lg "
          />
        </div>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-4 py-2 px-2  border-2 rounded-lg "
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full mb-4 py-2 px-2  border-2 rounded-lg"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full mb-4 py-2 px-2  border-2 rounded-lg "
          />
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4 font-semibold">Payment Options</h1>
        <div className="flex gap-8 mb-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="card"
              name="paymentOption"
              value="credit"
              checked={paymentOption === "credit"}
              onChange={() => setPaymentOption("credit")}
              required
              className="cursor-pointer"
            />
            <label htmlFor="card" className="flex gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              Credit / Debit Card
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="paypal"
              name="paymentOption"
              value="paypal"
              checked={paymentOption === "paypal"}
              onChange={() => setPaymentOption("paypal")}
              className="cursor-pointer"
            />
            <label
              htmlFor="paypal"
              className="flex gap-1 items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 26 26"
                className="h-4 w-4"
              >
                <path d="M 4.71875 0.0625 L 0.1875 20.8125 L 6.1875 20.8125 L 7.65625 13.9375 L 11.9375 13.9375 C 16.03125 13.9375 19.429688 11.414063 20.34375 7.125 C 21.382813 2.269531 17.898438 0.0625 14.90625 0.0625 Z M 9.78125 4.28125 L 12.71875 4.28125 C 14.183594 4.28125 15.179688 5.550781 14.75 7.125 C 14.382813 8.703125 12.839844 9.96875 11.3125 9.96875 L 8.5 9.96875 Z M 22.53125 5.5 C 22.527344 6.125 22.46875 6.796875 22.3125 7.53125 C 21.90625 9.441406 21.085938 11.113281 19.9375 12.4375 C 19.453125 13.863281 18.015625 14.96875 16.59375 14.96875 L 16.53125 14.96875 C 15.152344 15.597656 13.613281 15.9375 11.9375 15.9375 L 9.28125 15.9375 L 8.15625 21.21875 L 7.8125 22.8125 L 6.15625 22.8125 L 5.5 25.8125 L 11.46875 25.8125 L 12.9375 18.9375 L 17.21875 18.9375 C 21.3125 18.9375 24.738281 16.414063 25.65625 12.125 C 26.425781 8.519531 24.691406 6.367188 22.53125 5.5 Z"></path>
              </svg>{" "}
              Paypal
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="other"
              name="paymentOption"
              value="other"
              checked={paymentOption === "other"}
              onChange={() => setPaymentOption("other")}
              className="cursor-pointer"
            />
            <label htmlFor="other" className="cursor-pointer">
              Other
            </label>
          </div>
        </div>

        {paymentOption === "credit" && (
          <>
            <div>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="block w-full mb-4 py-2 px-2  border-2 rounded-lg "
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Card Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="block w-full mb-4 py-2 px-2  border-2 rounded-lg "
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Expration date (MM/YY)"
                value={dateExpired}
                onChange={(e) => setDateExpired(e.target.value)}
                className="w-2/3 mb-4 py-2 px-2  border-2 rounded-lg "
              />
              <input
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-1/3 mb-4 py-2 px-2 border-2 rounded-lg"
              />
            </div>
          </>
        )}
        {paymentOption === "paypal" && (
          <div className="flex justify-center items-center text-white cursor-pointer">
            <div className="flex gap-2 justify-center items-center w-2/3 bg-blue-600 rounded-full my-8 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 26 26"
                className="h-4 w-4"
              >
                <path d="M 4.71875 0.0625 L 0.1875 20.8125 L 6.1875 20.8125 L 7.65625 13.9375 L 11.9375 13.9375 C 16.03125 13.9375 19.429688 11.414063 20.34375 7.125 C 21.382813 2.269531 17.898438 0.0625 14.90625 0.0625 Z M 9.78125 4.28125 L 12.71875 4.28125 C 14.183594 4.28125 15.179688 5.550781 14.75 7.125 C 14.382813 8.703125 12.839844 9.96875 11.3125 9.96875 L 8.5 9.96875 Z M 22.53125 5.5 C 22.527344 6.125 22.46875 6.796875 22.3125 7.53125 C 21.90625 9.441406 21.085938 11.113281 19.9375 12.4375 C 19.453125 13.863281 18.015625 14.96875 16.59375 14.96875 L 16.53125 14.96875 C 15.152344 15.597656 13.613281 15.9375 11.9375 15.9375 L 9.28125 15.9375 L 8.15625 21.21875 L 7.8125 22.8125 L 6.15625 22.8125 L 5.5 25.8125 L 11.46875 25.8125 L 12.9375 18.9375 L 17.21875 18.9375 C 21.3125 18.9375 24.738281 16.414063 25.65625 12.125 C 26.425781 8.519531 24.691406 6.367188 22.53125 5.5 Z"></path>
              </svg>{" "}
              Paypal
            </div>
          </div>
        )}
        {paymentOption === "other" && <div>Use Other</div>}
      </div>{" "}
      <button
        onClick={handleSubmit}
        className="mt-8 hover:bg-transparent 
        outline-2 outline-slate-500
        hover:text-slate-600 hover:outline hover:outline-slate-600 "
      >
        {selectedProduct ? (
          <Link to={`/order-confirm/${id}/${quantity}`}>Place Order</Link>
        ) : (
          <Link to={`/orderConfirm`}>Place Order</Link>
        )}{" "}
      </button>
    </form>
  );
}

export default PaymentForm;
