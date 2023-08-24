function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search">
      <input
        className="border-b border-gray-400 "
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
