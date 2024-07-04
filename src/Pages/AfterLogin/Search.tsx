import { useState } from "react";
import { AdvancedSearch } from "../../Components/LoginSearch/AdvancedSearch";
import { SearchResults } from "../../Components/LoginSearch/SearchResults";

const Search = () => {
  // Toggle the showResults state when the user finds a match
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="bg-grayBg">
      {showResults ? (
        <SearchResults onSearchAgain={() => setShowResults(false)} />
      ) : (
        <AdvancedSearch onFindMatch={() => setShowResults(true)} />
      )}
    </div>
  );
};

export default Search;