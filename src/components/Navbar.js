import { Link } from "react-router-dom";

function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <Link to="/">E-STORE</Link>
      <ul className="nav">
        <li>
          <a href="#products-section">Products</a>
        </li>
        <li>
          <Link to="/cart">🛒({cartItemCount})</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist 💚(2)</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
