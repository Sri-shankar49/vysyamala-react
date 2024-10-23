import { ProfileContacts } from '../../Components/Messages/ProfileContacts';
import { ProfileChatArea } from '../../Components/Messages/ProfileChatArea';
import  { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../ProfileContext';

export const Messages = () => {


  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    setFromAge,
    setToAge,
    setFromHeight,
    setToHeight,
    setWorkLocation,
    setAdvanceSelectedProfessions,
    Set_Maritial_Status,
    setAdvanceSelectedEducation,

    setSelectedIncomes,
    setChevvai_dhosam,
    setRehuDhosam,
    setAdvanceSelectedBirthStar,
    setNativeState,
    setPeopleOnlyWithPhoto,
    setAdvanceSearchData
  } = context;

  useEffect(() => {
    setFromAge(0);
    setToAge(0);
    setFromHeight(0);
    setToHeight(0);
    setWorkLocation("");
    setAdvanceSelectedProfessions([]);
    Set_Maritial_Status([]);
    setAdvanceSelectedEducation("");
    setSelectedIncomes("");
    setChevvai_dhosam("no");
    setRehuDhosam("no");
    setAdvanceSelectedBirthStar("");
    setNativeState([]);
    setPeopleOnlyWithPhoto(0);
    setAdvanceSearchData([]);
  }, []);







  const [selectedProfile, setSelectedProfile] = useState<{
    room_name_id: string | null;
    profile_image: string;
    profile_user_name: string;
    profile_lastvist: string;
  } | null>(null);

  return (
    <div>
      <div className="bg-grayBg">
        <div className="container mx-auto py-10">
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5">Messages</h4>
          <div className="bg-white rounded-xl shadow">
            <div className="w-full flex items-start justify-start">
              <ProfileContacts setSelectedProfile={setSelectedProfile} />
              <ProfileChatArea selectedProfile={selectedProfile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};