import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductCheckout({ products }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { id, quantity } = useParams();
  // Convert quantity to a number
  const quantityValue = parseInt(quantity, 10);

  // Fetch the specific product using the id
  // Example: Fetch the product from the products array based on the id
  const product = products.find((item) => item.id === parseInt(id));

  const shippingFee = 10;
  const totalAmount = product.price * quantityValue;
  const grandTotal = totalAmount + shippingFee;
  console.log(id);
  console.log(quantityValue);
  console.log(product);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="checkout-section">
      <h1>Welcome to the Checkout Page!</h1>
      <Link to="/">&larr; Back to products</Link>
      <div className="grid grid-cols-2 gap-8 text-left border-2 border-orange-500 rounded-lg px-4 py-4">
        <div>
          <h1 className="text-2xl mb-8">User Information</h1>
          <form className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full mb-4 py-2 px-2 border-2 "
              />
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full mb-4 py-2 px-2 border-2 "
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full mb-4 py-2 px-2 border-2"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full mb-4 py-2 px-2 border-2 "
              />
            </div>
            <button className="mt-8">Place Order</button>
          </form>
          <div>
            <h1 className="text-2xl">Payment Options</h1>
            <div className="flex gap-8">
              <div className="border-2 py-2 px-2 rounded-lg text-center">
                <h1>Card</h1>
                <div>
                  <p>credit card</p>
                  <p>debit card</p>
                </div>
              </div>
              <div className="border-2 py-2 px-2 rounded-lg text-center">
                <h1>Paypal</h1>
                <h1>Paypal Logo</h1>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl mb-8">Order Summary</h1>
          <div>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>Price: $ {product.price}</p>
            <p>Quantity: {quantityValue}</p>
            <p>Subtotal: $ {totalAmount.toFixed(2)}</p>
            <p>Shipping: $ {shippingFee.toFixed(2)}</p>
          </div>
          <div>Total: ${grandTotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCheckout;
