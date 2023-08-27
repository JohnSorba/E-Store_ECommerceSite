import ProductItem from "./ProductItem";

function Products({ products, searchQuery, onProductClick, loading }) {
  return (
    <>
      <div id="products-section">
        <h2 className="text-2xl mb-8 font-semibold">Product Catalogue</h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-8 gap-y-12 text-left">
          {products
            .filter((product) =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <ProductItem
                key={product.id}
                product={product}
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
