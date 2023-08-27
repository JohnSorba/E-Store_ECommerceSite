import SearchBar from "../components/SearchBar";
import Products from "../components/Products";
import Header from "../components/Header";
import Loader from "../components/Loader";

function HomePage({
  products,
  searchQuery,
  setSearchQuery,
  onProductClick,
  loading,
}) {
  return (
    <div>
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {loading ? (
        <Loader />
      ) : products ? (
        <Products
          products={products}
          searchQuery={searchQuery}
          onProductClick={onProductClick}
          loading={loading}
        />
      ) : (
        <p>Products Not Found! ❌</p>
      )}
    </div>
  );
}

export default HomePage;
