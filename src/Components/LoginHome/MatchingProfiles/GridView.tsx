import { useEffect, useState } from "react";
import { fetchProfiles } from "../../../commonapicall";
import { GridCard } from "./ProfileCard/GridCard";
import { Profile } from "../../../ProfileContext";


export const GridView = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

  const advanceSearchData = sessionStorage.getItem("advance_search_data")
    ? JSON.parse(sessionStorage.getItem("advance_search_data")!)
    : null;

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
        const data = await fetchProfiles(loginuser_profileId);
        setProfiles(data.profiles || []);
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [loginuser_profileId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
        {advanceSearchData && advanceSearchData.length > 0 ? (
          advanceSearchData.map((profile: Profile) => (
            <GridCard key={profile.profile_id} profile={profile} />
          ))
        ) : (
          profiles.length > 0 ? (
            profiles.map(profile => (
              <GridCard key={profile.profile_id} profile={profile} />
            ))
          ) : (
            <p>No profiles available</p>
          )
        )}
      </div>
    </div>
  );
};

export default GridView;