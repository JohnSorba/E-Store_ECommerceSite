import { Link } from "react-router-dom";

function ProductItem({ item, onProductClick }) {
  return (
    <li onClick={() => onProductClick(item.id)}>
      <Link
        to={`/product/${item.id}`}
        className="flex flex-col gap-4 cursor-pointer"
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-60 rounded-lg p-4 shadow-md shadow-slate-300"
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold mb-2 text-gray-600">{item.title}</h2>
          <div className="flex justify-between items-center mt-auto">
            <p className="">
              $ <span className="text-xl font-semibold">{item.price}</span>
            </p>
            <p className="rating">Rating: ⭐{item.rating.rate}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;
