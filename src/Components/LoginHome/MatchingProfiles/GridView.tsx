import { useContext, useEffect, useState } from "react";
import { fetchProfiles } from "../../../commonapicall";
import { GridCard } from "./ProfileCard/GridCard";
import { Profile, ProfileContext } from "../../../ProfileContext";
import Spinner from "../../Spinner";
import { ProfileNotFound } from "./ProfileNotFound";

export interface SearchResultProps {
  profile_name: string;
  profile_id: any;
  profile_age: any;
  height: any;
  profile_img?: string;
  searchResult: any; // Replace 'any' with the appropriate type if you know the structure
  searchvalues: any;
}



export const GridView: React.FC<SearchResultProps> = ({ searchvalues }) => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  // const advanceSearchData = sessionStorage.getItem("advance_search_data")
  //   ? JSON.parse(sessionStorage.getItem("advance_search_data")!)
  //   : null;

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const { MatchingProfilepageNumber, MatchingProfileperPage, sortOrder, advanceSearchData } =
    context;

  // useEffect(()=>{
  //   if(advanceSearchData){
  //    setProfiles(advanceSearchData)
  //   }
  //  },[advanceSearchData])

  useEffect(() => {
    const loadProfiles = async () => {
      if (!loginuser_profileId) {
        console.error("No profile ID found in session storage.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProfiles(
          loginuser_profileId,
          MatchingProfilepageNumber,
          MatchingProfileperPage,
          sortOrder
        );
        console.log(data.profiles, "dddd");
        setProfiles(data.profiles || []);
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [
    loginuser_profileId,
    MatchingProfilepageNumber,
    MatchingProfileperPage,
    sortOrder,
  ]);

  // if (loading) {
  //   return <Spinner />;
  // }
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    ); 
  const searchvalue = sessionStorage.getItem("searchvalue") || " ";

  return (
    <div>
      <div className={`grid grid-rows-1 gap-5 my-5 ${(!advanceSearchData || advanceSearchData.length === 0) && (!profiles || profiles.length === 0) ? "grid-cols-1" : "grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1"}`}>
        {(advanceSearchData && advanceSearchData.length > 0) ? (
          advanceSearchData.map((profile: Profile) => (
            <GridCard
              key={profile.profile_id}
              profile={profile}
              searchvalues={searchvalues}
            />
          ))
        ) : (profiles && profiles.length > 0 && searchvalue !== "1") ? (
          profiles.map((profile: Profile) => (
            <GridCard
              key={profile.profile_id}
              profile={profile}
              searchvalues={searchvalues}
            />
          ))
        ) : (searchvalue === "1" && searchvalues && searchvalues.length > 0) ? (
          searchvalues.map((profile: Profile) => (
            <GridCard
              key={profile.profile_id}
              profile={profile}
              searchvalues={searchvalues}
            />
          ))
        ) : (
          <div className="py-20">
          <ProfileNotFound />
        </div>
        )}

      </div>
    </div>
  );
};

export default GridView;
