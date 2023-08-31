import ProductItem from "./ProductItem";

function Products({ products, searchQuery, onProductClick, loading }) {
  return (
    <>
      <div id="products-section">
        <h2 className="text-2xl mb-8 font-semibold">Product Catalogue</h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-12 gap-y-12 text-left">
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
      </div>
    </>
  );
}

export default Products;
