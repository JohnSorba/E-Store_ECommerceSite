import { Link } from "react-router-dom";

function ProductItem({ product, onProductClick }) {
  return (
    <Link to={`/product/${product.id}`}>
      <li className="product" onClick={() => onProductClick(product.id)}>
        <img src={product.image} alt={product.title} />
        <div className="product-details">
          <h2 className="title">{product.title}</h2>
          <div className="price-rating">
            <p className="price">${product.price}</p>
            <p className="rating">rating: ⭐{product.rating.rate}</p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default ProductItem;
