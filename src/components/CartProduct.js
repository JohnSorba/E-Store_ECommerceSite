function CartProduct({
  item,
  removeItem,
  updatedQuantity,
  toggleItemSelection,
}) {
  const dec = () => {
    if (item.quantity < 2) return;
    updatedQuantity(item.id, item.quantity - 1);
  };

  const inc = () => {
    updatedQuantity(item.id, item.quantity + 1);
  };

  return (
    <tr className="cart-item">
      <td>
        <input
          type="checkbox"
          checked={item.isChecked}
          onChange={() => toggleItemSelection(item.id)}
        />
      </td>
      <td colSpan="2" className="productImg">
        <img src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
      </td>
      <td>
        <p>$ {item.price}</p>
      </td>
      <td>
        <div className="quantity">
          <button onClick={dec}>-</button>
          <span>{item.quantity}</span>
          <button onClick={inc}>+</button>
        </div>
      </td>
      <td>
        <p>$ {item.subtotal}</p>
      </td>
      <td>
        <button onClick={() => removeItem(item)}>Delete</button>
      </td>
    </tr>
  );
}

export default CartProduct;
