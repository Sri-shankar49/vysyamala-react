// commonapicall.ts
import apiClient from './API'; // Ensure correct import

export const fetchProfiles = async (profileId: string): Promise<any> => {
  try {
    const response = await apiClient.post('/auth/Get_prof_list_match/', { profile_id: profileId });
    if (response.data.Status !== 1) {
      throw new Error('Failed to fetch profiles');
    }
    return response.data; // Adjust based on the actual response structure
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};


export const fetchProfilesDetails = async (profileId: string): Promise<any> => {
  try {
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

    const response = await apiClient.post('/auth/Get_profile_det_match/', {
      profile_id: loginuser_profileId,
      user_profile_id: profileId // Adjust as needed based on your API requirements
    });
    
    // if (response.data.Status !== 1) {
    //   throw new Error(`Failed to fetch profiles: ${response.data.message || 'Unknown error'}`);
    // }
    
    return response.data; // Adjust based on actual response structure
  } catch (error: any) {
    console.error('Error fetching profiles:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const Update_photo_request="http://103.214.132.20:8000/auth/Update_photo_request/"