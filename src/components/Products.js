import ProductItem from "./ProductItem";

function Products({ products, searchQuery, onProductClick, addToCart }) {
  return (
    <>
      <div id="products-section">
        <h2>Listed Products</h2>

        <ul className="products">
          {products
            .filter((product) =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default Products;
