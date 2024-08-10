import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';


export interface Profile {
  profile_id: string;
  profile_name: string;
  profile_img: string;
  profile_age: number;
  profile_gender: string;
  height: string;
  weight: string;
  degree: string;
  profession: string;
  location: string;
  profile_image: string;
  wish_list: string;
}

export interface Profile {
  int_profileid: string;
  int_profile_name: string;
  int_Profile_img: string;
  int_profile_age: number;
  int_profile_notes: string;
  int_status: number;
}


export interface DashboardDetails {
  mutual_int_count: number;
  wishlist_count: number;
  personal_notes_count: number;
  received_int_count: number;
  sent_int_count: number;
  myvisitor_count: number;
  viewed_profile_count: number;
  profile_details: {
    profile_id: string;
    profile_name: string;
    package_name: string | null;
    package_validity: string | null;
    completion_per: string;
    profile_image: string;
  };
}


interface ProfileContextType {
  profiles: Profile[];
  additionalProfiles: Profile[];
  userImages: Record<string, string>;
  loading: boolean;
  loadingAdditional: boolean;
  error: string | null;
  errorAdditional: string | null;
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile | null) => void;
  bookmarkedProfiles: Profile[];
  addBookmark: (profile: Profile) => void;
  removeBookmark: (profileId: string) => void;
  setSelectedProfiles: (profiles: Profile[]) => void;
  selectedProfiles: Profile[];
  dashboardDetails: DashboardDetails | null;
  fetchDashboardDetails: () => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
const queryParams = new URLSearchParams(location.search);

const id = queryParams.get('id');


export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [additionalProfiles, setAdditionalProfiles] = useState<Profile[]>([]);
  const [userImages, setUserImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAdditional, setLoadingAdditional] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorAdditional, setErrorAdditional] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<Profile[]>(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedProfiles');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>(() => {
    const savedSelectedProfiles = localStorage.getItem('selectedProfiles');
    return savedSelectedProfiles ? JSON.parse(savedSelectedProfiles) : [];
  });
  const [dashboardDetails, setDashboardDetails] = useState<DashboardDetails | null>(null);
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');


  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     try {
  //       const response = await axios.post('http://103.214.132.20:8000/auth/Get_prof_list_match/', {
  //         profile_id: loginuser_profileId // Adjust the payload as necessary
  //       });

  //       if (response.data.Status === 1) {
  //         const profilesData: Profile[] = response.data.profiles;
  //         setProfiles(profilesData);
  //       } else {
  //         setError('No matching records found');
  //       }
  //     } catch (error) {
  //       setError('Error fetching profiles');
  //       console.error('Error fetching profiles:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfiles();
  // }, []);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const response = await axios.post('http://103.214.132.20:8000/auth/Get_profile_det_match/', {
  //         profile_id: loginuser_profileId,
  //         user_profile_id: id
  //       });
  //       const { user_images, basic_details } = response.data;
  //       const additionalProfilesData: Profile[] = Object.values(basic_details);
  //       setAdditionalProfiles(additionalProfilesData);
  //       setUserImages(user_images);
  //     } catch (error) {
  //       setErrorAdditional('Error fetching additional profiles');
  //       console.error('Error fetching additional profiles:', error);
  //     } finally {
  //       setLoadingAdditional(false);
  //     }
  //   };
  
  //   fetchProfileData();
  // }, []);
  

  const fetchDashboardDetails = async () => {
    try {
      const response = await axios.post('http://103.214.132.20:8000/auth/Get_dashboard_details/', {
        profile_id: loginuser_profileId,
      });

      if (response.data.Status === 1) {
        setDashboardDetails(response.data.data);
      } else {
        setError('Error fetching dashboard details');
      }
    } catch (error) {
      setError('Error fetching dashboard details');
      console.error('Error fetching dashboard details:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('bookmarkedProfiles', JSON.stringify(bookmarkedProfiles));
  }, [bookmarkedProfiles]);

  useEffect(() => {
    localStorage.setItem('selectedProfiles', JSON.stringify(selectedProfiles));
  }, [selectedProfiles]);

  const addBookmark = async (profile: Profile) => {
    try {
      const response = await axios.post('http://103.214.132.20:8000/auth/Mark_profile_wishlist/', {
        profile_id:loginuser_profileId,
        profile_to: profile.profile_id,
        status: "1",
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.Status === 1) {
        setBookmarkedProfiles((prev) => [...prev, profile]);
        console.log(`Profile ${profile.profile_id} bookmarked successfully with status 1.`);
      } else {
        console.log('Failed to bookmark profile:', response.data.Message);
      }
    } catch (error) {
      console.error('Error bookmarking profile:', error);
    }
  };

  const removeBookmark = async (profile_id: string) => {
    try {
      const response = await axios.post('http://103.214.132.20:8000/auth/Mark_profile_wishlist/', {
        profile_id:loginuser_profileId,
        profile_to: profile_id,
        status: "0",
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.Status === 1) {
        setBookmarkedProfiles((prev) => prev.filter((profile) => profile.profile_id !== profile_id));
        setSelectedProfiles((prev) => prev.filter((profile) => profile.profile_id !== profile_id));
        console.log(`Profile ${profile_id} removed from bookmarks successfully with status 0.`);
      } else {
        console.log('Failed to remove bookmark:', response.data.Message);
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      additionalProfiles,
      userImages,
      loading,
      loadingAdditional,
      error,
      errorAdditional,
      selectedProfile,
      setSelectedProfile,
      bookmarkedProfiles,
      addBookmark,
      removeBookmark,
      setSelectedProfiles,
      selectedProfiles,
      dashboardDetails,
      fetchDashboardDetails
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
