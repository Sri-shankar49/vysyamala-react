import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridListCard } from './ProfileCard/GridListCard'; // Named import
import { fetchProfiles } from '../../../commonapicall'; // Import the API function

// Define the Profile type if not defined
interface Profile {
  profile_id: string;
  profile_name?: string;
  profile_image?: string;
  age?: number;
  height?: string;
  degree?: string;
  profession?: string;
  location?: string;
  // Add other profile fields as necessary
}

export const GridListView: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

  useEffect(() => {
    const loadProfiles = async () => {
      if (!loginuser_profileId) {
        setError('Login user profile ID is not available');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProfiles(loginuser_profileId);
        console.log('Fetched profile data:', data);
        if (data && data.profiles) {
          setProfiles(data.profiles);
        } else {
          setError('No profile data found');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response ? error.response.data.message : error.message);
        } else {
          setError('Unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [loginuser_profileId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-rows-1 md:grid-cols-3 gap-5 my-5">
      {profiles.length > 0 ? (
        profiles.map(profile => (
          <GridListCard key={profile.profile_id} profileId={profile.profile_id} />
        ))
      ) : (
        <p>No profiles available</p>
      )}
    </div>
  );
};

export default GridListView;
