import React, { useState, useEffect, useContext } from "react";

import { GridListCard } from "./ProfileCard/GridListCard"; // Named import
import { fetchProfiles } from "../../../commonapicall"; // Import the API function
import { Profile, ProfileContext } from "../../../ProfileContext";
import Spinner from "../../Spinner";

// Define the Profile type if not defined
// interface Profile {
//   profile_id: string;
//   profile_name?: string;
//   profile_image?: string;
//   age?: number;
//   height?: string;
//   degree?: string;
//   profession?: string;
//   location?: string;
//   // Add other profile fields as necessary
// }

export interface SearchResultProps {
  profile_name: string;
  profile_id: any;
  profile_age: any;
  height: any;
  profile_img?: string;
  searchResult: any; // Replace 'any' with the appropriate type if you know the structure
}



export const GridListView: React.FC<SearchResultProps> = () => {
  const context = useContext(ProfileContext);
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    MatchingProfilepageNumber,
    MatchingProfileperPage,
    sortOrder,
    advanceSearchData,
    setGridListCardData,
  } = context;

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const advanceSearchData = sessionStorage.getItem("advance_search_data")
  //   ? JSON.parse(sessionStorage.getItem("advance_search_data")!)
  //   : null;

  // useEffect(()=>{
  //   if(advanceSearchData){
  //    setProfiles(advanceSearchData)
  //   }

  //  },[advanceSearchData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loginuser_profileId) {
          throw new Error("Profile ID is missing.");
        }

        const data = await fetchProfiles(
          loginuser_profileId,
          MatchingProfilepageNumber,
          MatchingProfileperPage,
          sortOrder
        );
        setGridListCardData(data.profiles)
        setProfiles(data.profiles); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Failed to fetch profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    loginuser_profileId,
    MatchingProfilepageNumber,
    MatchingProfileperPage,
    sortOrder,
  ]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  const searchvalue = sessionStorage.getItem("searchvalue") || " ";
  console.log(advanceSearchData, "v");

  return (
    <div>
      <div className="grid grid-rows-1 grid-cols-3 gap-5 my-5">
        {/* <div className="grid grid-rows-1 md:grid-cols-3 gap-5 my-5"> */}
        {advanceSearchData && advanceSearchData.length > 0 ? (
          advanceSearchData.map((profile: Profile) => (
            <GridListCard
              key={profile.profile_id}
              profileId={profile.profile_id}
            />
          ))
        ) : profiles.length > 0 && searchvalue !== "1" ? (
          profiles.map((profile: Profile) => (
            <GridListCard
              key={profile.profile_id}
              profileId={profile.profile_id}
            />
          ))
        )  : (
          <p>No profiles available</p>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default GridListView;
