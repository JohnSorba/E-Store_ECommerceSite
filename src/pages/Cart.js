import CartProduct from "../components/CartProduct";

function Cart({
  cartItems,
  removeItem,
  setCartItems,
  removeAll,
  updatedQuantity,
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
                <h3>Cart Total</h3>
                <div className="details">
                  <div className="flex detail">
                    <span>Subtotal</span>
                    <span>{totalSubtotals}</span>
                  </div>

                  <div className="flex detail">
                    <span>Shipping Fee</span>
                    <span>{shippingFee > 0 ? shippingFee : "Free"}</span>
                  </div>
                  <div className="flex detail total">
                    <span>Total Amount</span>
                    <span>$ {grandTotal}</span>
                  </div>
                </div>

                <div className="btn-checkout">
                  <button onClick={() => removeAll}>Proceed to checkout</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>🛒 Your EStore Cart is empty</h1>
        )}
        <div>
          <p>
            The price and availability of items at EStore.com are subject to
            change. The Cart is a temporary place to store a list of your items
            and reflects each item's most recent price. <br />
            Do you have a gift card or promotional code? We'll ask you to enter
            your claim code when it's time to pay.
          </p>
        </div>
      </>
    </div>
  );
}

export default Cart;
