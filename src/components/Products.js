import ProductItem from "./ProductItem";

function Products({
  products,
  searchQuery,
  onProductClick,
  loading,
  cartItems,
}) {
  return (
    <>
      <div className="text-center pt-16 pb-32">
        <h2 className="text-2xl mb-8 font-semibold">Product Catalogue</h2>
        <div className="grid grid-cols-8">
          <ul
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
              cartItems.length > 0 ? "col-span-7" : "col-span-8"
            } gap-x-12 gap-y-12 px-24 text-left`}
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
          {cartItems.length > 0 && (
            <article className="col-span-1 border-l">
              <h1 className="text-lg font-semibold mb-8 border-y py-2">
                In Cart ({cartItems.length})
              </h1>
              <ul className="flex flex-col gap-8 items-center">
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
      </div>
    </>
  );
}

export default Products;
