function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search">
      <input
        className="border-b border-gray-400 py-4 px-4 w-3/5 my-0 mx-auto block text-xl"
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
