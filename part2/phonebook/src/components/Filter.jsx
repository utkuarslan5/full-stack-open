const Filter = ({ searchTerm, handleSearchTermChange }) => {
  return (
    <div>
      search term:{" "}
      <input value={searchTerm} onChange={handleSearchTermChange} />
    </div>
  );
};

export default Filter;