import { Link } from "react-router-dom";
import Loader from "./Loader";

function ProductItem({ product, onProductClick, loading }) {
  return (
    <li onClick={() => onProductClick(product.id)}>
      <Link
        to={`/product/${product.id}`}
        className="flex flex-col gap-4 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-60 rounded-lg p-4 shadow-md shadow-slate-300"
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold mb-2 text-gray-600">{product.title}</h2>
          <div className="flex justify-between items-center mt-auto">
            <p className="">
              $ <span className="text-xl font-semibold">{product.price}</span>
            </p>
            <p className="rating">Rating: ⭐{product.rating.rate}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;
