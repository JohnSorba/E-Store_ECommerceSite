import { Link } from "react-router-dom";
import CartProduct from "../components/CartProduct";

function Cart({
  cartItems,
  removeItem,
  setCartItems,
  removeAll,
  updatedQuantity,
  product,
}) {
  // TOGGLE SELECTED CART ITEM
  const toggleItemSelection = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // TOTAL-SUBTOTAL
  const calculateSelectedSubtotals = () => {
    const selectedItems = cartItems.filter((item) => item.isChecked);
    const selectedSubtotal = selectedItems.reduce(
      (total, item) => total + Number(item.subtotal),
      0
    );
    return selectedSubtotal;
  };
  const totalSubtotals = Number(calculateSelectedSubtotals().toFixed(2));

  // GRAND TOTAL
  const shippingFee = 10;
  const grandTotal = Number(totalSubtotals + shippingFee).toFixed(2);

  return (
    <div className="cart-section">
      <>
        <div className="cart">
          <h1 className="text-5xl mb-2 font-bold">Welcome to the Cart!</h1>
          {cartItems.length < 1 ? (
            <p className="text-xl ">Make sure you add items soon! 😉</p>
          ) : (
            <p className="text-xl">{cartItems.length} items added to Cart!</p>
          )}
        </div>
        <p>
          <Link to="/">&larr; Back to products</Link>
        </p>
        {cartItems.length > 0 ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Selected</th>
                  <th className="product-column">Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartProduct
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    updatedQuantity={updatedQuantity}
                    toggleItemSelection={toggleItemSelection}
                    product={product}
                  />
                ))}
              </tbody>
            </table>
            <div className="cart-checkout">
              <div className="coupon">
                <input type="text" placeholder="Enter Coupon Code" />
                <button>Apply Coupon</button>
              </div>
              <div></div>
              <div className="cart-total">
                <h3 className="text-xl">Cart Total</h3>
                <div className="details">
                  <div className="flex justify-between detail">
                    <span>Subtotal</span>
                    <span>$ {totalSubtotals.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between detail">
                    <span>Shipping Fee</span>
                    <span>{shippingFee > 0 ? shippingFee : "Free"}</span>
                  </div>
                  <div className="flex justify-between detail total">
                    <span>Total Amount</span>
                    <span>$ {grandTotal}</span>
                  </div>
                </div>

                <div className="btn-checkout ">
                  <Link
                    to="/checkout"
                    className="border-2 border-orange-700 rounded-lg text-black py-2 px-4"
                  >
                    Proceed to checkout
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>🛒 Your EStore Cart is empty</h1>
        )}
        <div className="flex justify-center">
          <p className="text-center w-8/12">
            The price and availability of items at EStore.com are subject to
            change. The Cart is a temporary place to store a list of your items
            and reflects each item's most recent price. Do you have a gift card
            or promotional code? We'll ask you to enter your claim code when
            it's time to pay.
          </p>
        </div>
      </>
    </div>
  );
}

export default Cart;
