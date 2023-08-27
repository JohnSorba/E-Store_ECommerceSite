import { Link } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import CartOrderSummary from "../components/CartOrderSummary";
import { useState } from "react";

function CartCheckout({
  cartItems,
  orderDetails,
  setOrderDetails,
  totalSubtotals,
  selectedItems,
}) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (orderDetails) => {
    console.log("selected items in Form: ", orderDetails.items);

    console.log("checkout orderDetails: ", orderDetails);
    console.log("Form submitted");
    setOrderPlaced(true);
    setOrderDetails(orderDetails);
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  };

  const taxInterest = 0.05;

  // TOTAL SELECTED ITEMS
  const calculateSelectedQuanity = () => {
    const selectedItems = cartItems.filter((item) => item.isChecked);
    const selectedQuantity = selectedItems.reduce(
      (total, item) => total + Number(item.quantity),
      0
    );
    return selectedQuantity;
  };
  const totalQuantity = Number(calculateSelectedQuanity().toFixed(2));

  // GRAND TOTAL

  const taxes = Number(taxInterest * totalSubtotals);
  const shippingFee = 10;
  const grandTotal = Number(totalSubtotals + shippingFee + taxes);

  return (
    <div className="checkout-section">
      <h1 className="text-5xl mb-24">Welcome to the Checkout Page!</h1>
      <div className="text-left mb-4">
        <Link to="/cart">&larr; Back to cart</Link>
      </div>

      <div className="grid grid-cols-8  text-left border-2 border-orange-500 rounded-lg px-4 py-4">
        {orderPlaced === true ? (
          <div className="col-span-8 text-center py-32">
            <h1 className="text-5xl mb-16">
              Your order has been placed!
              <br />
              Thank you for shopping with us,{" "}
              {orderDetails ? (
                <>
                  <span>{orderDetails.name}</span>
                </>
              ) : (
                <span>No_Name</span>
              )}
            </h1>
            <p>
              Go the the{" "}
              <Link
                to="/orderConfirm"
                className="text-orange-400 hover:underline"
              >
                Order Confirmation
              </Link>{" "}
              page
            </p>
          </div>
        ) : (
          <>
            <div className="pr-4 border-r-2 border-r-orange-200 col-span-5">
              <PaymentForm
                onPlaceOrder={handlePlaceOrder}
                selectedItems={selectedItems}
              />
            </div>
            {/* {isLoading && <Loader />} */}

            <div className="px-8 flex flex-col gap-8 col-span-3">
              <CartOrderSummary
                selectedItems={selectedItems}
                totalQuantity={totalQuantity}
              />

              <div className="flex flex-col mt-16">
                <p className="flex justify-between py-2 border-y">
                  Subtotal: ({totalQuantity} items){" "}
                  <span className="text-lg">$ {totalSubtotals.toFixed(2)}</span>
                </p>
                <p className="flex justify-between py-2 border-b">
                  Shipping and Handling: <span>$ {shippingFee.toFixed(2)}</span>
                </p>
                <p className="flex justify-between py-2 border-b">
                  Estimated tax (5%): <span>$ {taxes.toFixed(2)}</span>
                </p>
                <p className="flex justify-between py-4 text-2xl text-orange-500 font-semibold">
                  Order Total:
                  <span>${grandTotal.toFixed(2).toLocaleString()}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartCheckout;
