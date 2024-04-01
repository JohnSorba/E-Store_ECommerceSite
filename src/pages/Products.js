import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import Loader from "../components/Loader";

function Products({
  products,
  searchQuery,
  setSearchQuery,
  onProductClick,
  loading,
  cartItems,
}) {
  return (
    <div className="grid grid-cols-8">
      <div
        className={`col-span-7 ${
          cartItems.length > 0 ? "col-span-7" : "col-span-8"
        }`}
      >
        <h1 className="text-left pl-24 pt-8 text-4xl font-semibold">For you</h1>
        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ul
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-24 mb-32 text-left`}
          >
            {products
              .filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <ProductItem
                  key={item.id}
                  item={item}
                  onProductClick={onProductClick}
                  loading={loading}
                />
              ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <article className="col-span-1 border-l text-center sticky top-4 right-0 h-screen shadow-sm overflow-y-auto ">
          <h1 className="text-lg font-semibold border-y py-2 bg-white sticky top-0 right-0 -z-3 shadow-sm">
            In Cart ({cartItems.length})
          </h1>
          <ul className="flex flex-col px-8 mt-8 mb-16 gap-8 items-center  -z-5">
            {cartItems.map((item) => (
              <li
                key={item.id}
                item={item}
                className="border-b-2 border-slate-400 pb-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-28 mb-2 rounded-lg p-4 shadow-md shadow-slate-300"
                />
                <p>${item.price}</p>
              </li>
            ))}
          </ul>
        </article>
      )}
    </div>
  );
}

export default Products;
