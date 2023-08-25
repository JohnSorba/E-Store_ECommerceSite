import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";

function ProductCheckout({ products }) {
  const { id, quantity } = useParams();
  // Convert quantity to a number
  const quantityValue = parseInt(quantity, 10);

  // Fetch the specific product using the id
  // Example: Fetch the product from the products array based on the id
  const product = products.find((item) => item.id === parseInt(id));

  const shippingFee = 10;
  const totalAmount = product.price * quantityValue;
  const taxes = 0.05 * totalAmount;
  const grandTotal = totalAmount + shippingFee + taxes;
  console.log(id);
  console.log(quantityValue);
  // console.log(product);

  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  return (
    <div className="checkout-section">
      <h1>Welcome to the Checkout Page!</h1>
      <Link to="/" className="text-left mb-4">
        &larr; Back to products
      </Link>
      <div className="grid grid-cols-2  text-left border-2 border-orange-500 rounded-lg px-4 py-4">
        <PaymentForm />

        <div className="px-8 flex flex-col">
          <h1 className="text-2xl mb-8">Order Summary</h1>
          <div className="grid grid-cols-2 gap-8 mb-4 pb-8">
            <img
              src={product.image}
              alt={product.title}
              className="border border-orange-200 rounded-xl  p-2"
            />
            <div>
              <h2 className="text-xl mb-4">{product.title}</h2>
              <h2>
                Rating: &#9733;{" "}
                <span className="text-lg font-semibold">
                  {product.rating.rate} /
                </span>
                5
              </h2>
              <p>Qty: {quantityValue}</p>
              <p className="mt-8">
                $ <span className="text-2xl">{product.price}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full mt-auto">
            <p className="flex justify-between py-2 border-y">
              Subtotal:{" "}
              <span className="text-lg">$ {totalAmount.toFixed(2)}</span>
            </p>
            <p className="flex justify-between py-2 border-b">
              Shipping: <span>$ {shippingFee.toFixed(2)}</span>
            </p>
            <p className="flex justify-between py-2 border-b">
              Taxes (5%): <span>$ {taxes.toFixed(2)}</span>
            </p>
          </div>
          <p className="flex justify-between py-4 text-2xl">
            Total:<span>${grandTotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCheckout;
