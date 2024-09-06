import { useState, useEffect, useContext } from "react";
import { AdvancedSearch } from "../../Components/LoginSearch/AdvancedSearch";
import { SearchResults } from "../../Components/LoginSearch/SearchResults";
import { Get_advance_search } from "../../commonapicall";
import { ProfileContext } from "../../ProfileContext";
import AdvanceSearchCard from "../../Components/AdvanceSearchCard";
import axios from "axios";
import { Console } from "console";
import React from "react";
const Search = () => {
  // Toggle the showResults state when the user finds a match
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Clear session storage when navigating away from the page
    return () => {
      setNoRecordsFound(false)
      sessionStorage.removeItem("advance_search_data");
    };
  }, []);

  useEffect(() => {
    sessionStorage.removeItem('searchvalue');
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
    searchProfileData,
    setSearchProfileData,
    setAdvanceSelectedProfessions,
    AdvanceselectedProfessions,
    selectedAdvanceEducation,
    selectedIncomes,
    chevvai_dhosam,
    rehuDhosam,
    advanceSelectedBirthStar,
    nativeState,
    workLocation,
    peopleOnlyWithPhoto,
    maritial_Status,
    setAdvanceSearchData,
    advanceSearchData
  } = context;
  const [responseRecord, setNoRecordsFound] = useState(false);
  console.log()
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
        search_marital_status: maritial_Status.join(","),
        search_profession: AdvanceselectedProfessions.join(","),
        search_education: selectedAdvanceEducation,
        search_income: selectedIncomes,
        chevvai_dhosam: chevvai_dhosam,
        ragukethu_dhosam: rehuDhosam,
        search_star: advanceSelectedBirthStar,
        search_nativestate: nativeState.join(","),
        search_worklocation: workLocation,
        people_withphoto: peopleOnlyWithPhoto,
      });
     
      if (response.status === 200) {
        sessionStorage.setItem(
          "advance_search_data",
          JSON.stringify(response.data.data)
        );
        setAdvanceSearchData(response.data.data);
        setTotalCount(response.data.total_count);
      }else{
        setNoRecordsFound(true);
        
      }
    } catch (error) {
      console.log(error);
     
    }
  };
  useEffect(() => {
  if(pageNumber){
    handle_Get_advance_search();
  }
  }, [pageNumber]);

  useEffect(() => {
    setSearchProfileData("");
  }, []);

  return (
    <div className="bg-grayBg">
      {searchProfileData ? (
        <>
          <AdvanceSearchCard />
        </>
      ) : (
        <>
          {" "}
          {showResults  ? (
            <SearchResults   onSearchAgain={() => setShowResults(false)} />
          ) : (
            <AdvancedSearch
              handle_Get_advance_search={handle_Get_advance_search}
              onFindMatch={() => setShowResults(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Search;
