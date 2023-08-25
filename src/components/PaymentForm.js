import { useState } from "react";

function PaymentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [dateExpired, setDateExpired] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentOption, setPaymentOption] = useState("credit");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted");
  };

  return (
    <div className="pr-4 border-r-2 border-r-orange-200">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-16">
          <h1 className="text-2xl mb-4">Contact Information</h1>
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
          <h1 className="text-2xl mb-4">Payment Options</h1>
          <div className="flex gap-8 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="card"
                name="paymentOption"
                value="credit"
                checked={paymentOption === "credit"}
                onChange={() => setPaymentOption("credit")}
                required
                className="mr-2"
              />
              <label htmlFor="card">Credit / Debit Card</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="paymentOption"
                value="paypal"
                checked={paymentOption === "paypal"}
                onChange={() => setPaymentOption("paypal")}
                className="mr-2"
              />
              <label htmlFor="paypal">Paypal</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="other"
                name="paymentOption"
                value="other"
                checked={paymentOption === "other"}
                onChange={() => setPaymentOption("other")}
                className="mr-2"
              />
              <label htmlFor="other">Other</label>
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
                  className="flex-1 mb-4 py-2 px-2  border-2 rounded-lg "
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="flex-2 mb-4 py-2 px-2  border-2 rounded-lg hover:text"
                />
              </div>
            </>
          )}
          {paymentOption === "paypal" && <div>Use Paypal</div>}
          {paymentOption === "other" && <div>Use Other</div>}
        </div>

        <button className="mt-8">Place Order</button>
      </form>
    </div>
  );
}

export default PaymentForm;
