import "./SearchMessage.css";

function SearchMessage({ children }) {
  return (
    <div className="movies__search-container">
      <h2 className="movies__search-text">{children}</h2>
    </div>
  );
}

export default SearchMessage;
