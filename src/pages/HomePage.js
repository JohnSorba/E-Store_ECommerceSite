import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import Header from "../components/Header";

function HomePage({ products, searchQuery, setSearchQuery, onProductClick }) {
  return (
    <div>
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {products ? (
        <Products
          products={products}
          searchQuery={searchQuery}
          onProductClick={onProductClick}
        />
      ) : (
        <p>Products Not Found! ❌</p>
      )}
    </div>
  );
}

export default HomePage;
