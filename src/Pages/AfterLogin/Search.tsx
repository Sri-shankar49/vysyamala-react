import { useState, useEffect, useContext } from "react";
import { AdvancedSearch } from "../../Components/LoginSearch/AdvancedSearch";
import { SearchResults } from "../../Components/LoginSearch/SearchResults";
import { Get_advance_search } from "../../commonapicall";
import { ProfileContext } from "../../ProfileContext";
import axios from "axios";
const Search = () => {
  // Toggle the showResults state when the user finds a match
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    // Clear session storage when navigating away from the page
    return () => {
      sessionStorage.removeItem("advance_search_data");
    };
  }, []);

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    fromAge,
    ToAge,
    fromHeight,
    perPage,
    toHeight,
    setTotalCount,
    pageNumber,
  } = context;

  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const handle_Get_advance_search = async () => {
    try {
      const response = await axios.post(Get_advance_search, {
        profile_id: loginuser_profileId,
        from_age: fromAge,
        to_age: ToAge,
        from_height: fromHeight,
        to_height: toHeight,
        per_page: perPage,
        page_number: pageNumber,
      });

      if (response.status === 200) {
        sessionStorage.setItem(
          "advance_search_data",
          JSON.stringify(response.data.data)
        );
        setTotalCount(response.data.total_count);

      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handle_Get_advance_search();
  }, [pageNumber]);
  return (
    <div className="bg-grayBg">
      {showResults ? (
        <SearchResults onSearchAgain={() => setShowResults(false)} />
      ) : (
        <AdvancedSearch
          handle_Get_advance_search={handle_Get_advance_search}
          onFindMatch={() => setShowResults(true)}
        />
      )}
    </div>
  );
};

export default Search;