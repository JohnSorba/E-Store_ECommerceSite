import { Link, useParams } from "react-router-dom";
import ProductItem from "./ProductItem";

function CartProduct({
  item,
  removeItem,
  updatedQuantity,
  toggleItemSelection,
  product,
  onProductClick,
}) {
  const { id } = useParams();
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
      <td>
        <Link to={`/product/${item.id}`} colSpan="2" className="productImg">
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
        </Link>
      </td>
      <td>
        <p>$ {item.price}</p>
      </td>
      <td>
        <div className="quantity">
          <button onClick={dec} className="bg-slate-500">
            &#8722;
          </button>
          <span>{item.quantity}</span>
          <button onClick={inc} className="bg-slate-500">
            &#43;
          </button>
        </div>
      </td>
      <td>
        <p>$ {Number(item.subtotal).toFixed(2)}</p>
      </td>
      <td>
        <button
          className="bg-transparent rounded-lg text-black text-4xl py-0 px-1 hover:text-slate-500"
          onClick={() => removeItem(item)}
        >
          &times;
        </button>
      </td>
    </tr>
  );
}

export default CartProduct;
