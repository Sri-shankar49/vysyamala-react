import React, { useState, useEffect, useContext } from 'react';
import { fetchProfiles } from '../../../commonapicall'; // Adjust the path as needed
import { ListCard } from './ProfileCard/ListCard'; // Adjust the path as needed
import { Profile, ProfileContext } from '../../../ProfileContext'; // Adjust the path as needed

export const ListView: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const { MatchingProfilepageNumber, MatchingProfileperPage, sortOrder } = context;
  const advanceSearchData = sessionStorage.getItem("advance_search_data")
    ? JSON.parse(sessionStorage.getItem("advance_search_data")!)
    : null;


  // useEffect(()=>{
  //   if(advanceSearchData){
  //    setProfiles(advanceSearchData)
  //   }
  //  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

        if (!loginuser_profileId) {
          throw new Error('Profile ID is missing.');
        }

        const data = await fetchProfiles(loginuser_profileId, MatchingProfilepageNumber, MatchingProfileperPage, sortOrder);
        setProfiles(data.profiles); // Adjust based on the actual response structure
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError('Failed to fetch profiles.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [MatchingProfilepageNumber, MatchingProfileperPage, sortOrder]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="list-view">
      {advanceSearchData && advanceSearchData.length > 0 ? (
        advanceSearchData.map((profile: Profile) => (
          <ListCard key={profile.profile_id} profile={profile} />
        ))
      ) : profiles.length > 0 ? (
        profiles.map((profile: Profile) => (
          <ListCard key={profile.profile_id} profile={profile} />
        ))
      ) : (
        <div>No profiles found.</div>
      )}
    </div>
  );
};

export default ListView;