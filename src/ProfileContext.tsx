import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

export interface Profile {
  matching_score: number | undefined;
  verified: number;
  profile: any;
  profile_id: string;
  profile_name: string;
  profile_img: string;
  profile_age: number;
  profile_gender?: string; // Optional properties
  height?: string;
  weight?: string;
  degree?: string;
  profession?: string;
  location?: string;
  profile_image?: string;
  wish_list?: string;
  user_profile_views?: string;
}

export interface DashboardDetails {
  mutual_int_count: number;
  wishlist_count: number;
  personal_notes_count: number;
  received_int_count: number;
  sent_int_count: number;
  myvisitor_count: number;
  gallery_count: number;
  photo_int_count: number;
  matching_profile_count?: number;
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
  bookmarkedProfiles: Profile[];
  selectedProfiles: Profile[];
  error: string | null;
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile | null) => void;
  addBookmark: (profile: Profile) => void;
  removeBookmark: (profileId: string) => void;
  setSelectedProfiles: (profiles: Profile[]) => void;
  dashboardDetails: DashboardDetails;
  fetchDashboardDetails: () => void;
  perPage: number;
  pageNumber: number;
  totalCount: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  fromAge: number;
  fromHeight: number;
  toHeight: number;
  ToAge: number;
  setFromAge: Dispatch<SetStateAction<number>>;
  setToAge: Dispatch<SetStateAction<number>>;
  setFromHeight: Dispatch<SetStateAction<number>>;
  setToHeight: Dispatch<SetStateAction<number>>;
  MatchingProfileperPage: number;
  MatchingProfilepageNumber: number;
  MatchingProfiletotalCount: number;
  setMatchingProfilePerPage: Dispatch<SetStateAction<number>>;
  setMatchingProfilePageNumber: Dispatch<SetStateAction<number>>;
  setMatchingProfileTotalCount: Dispatch<SetStateAction<number>>;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  setSearchProfileData: Dispatch<SetStateAction<string>>;
  searchProfileData: any;
  setMatchingProfileSearchId: Dispatch<SetStateAction<string>>;
  matchingProfileSearchId: string;
  matchingProfile_profession: string;
  matchingProfile_search_age: string;
  matichingSearch_location: string;
  set_MatchingProfile_profession: Dispatch<SetStateAction<string>>;
  set_MatchingProfile_search_age: Dispatch<SetStateAction<string>>;
  Set_Search_location: Dispatch<SetStateAction<string>>;
  userProfile: string;
  setUserProfile: Dispatch<SetStateAction<string>>;
  maritial_Status: number[];
  Set_Maritial_Status: Dispatch<SetStateAction<number[]>>;
  AdvanceselectedProfessions: number[];
  setAdvanceSelectedProfessions: Dispatch<SetStateAction<number[]>>;
  setAdvanceSelectedEducation: Dispatch<SetStateAction<string>>;
  selectedAdvanceEducation: string;
  setSelectedIncomes: Dispatch<SetStateAction<string>>;
  selectedIncomes: string;
  setChevvai_dhosam: Dispatch<SetStateAction<string>>;
  chevvai_dhosam: string;
  setRehuDhosam: Dispatch<SetStateAction<string>>;
  rehuDhosam: string;
  advanceSelectedBirthStar: string;
  setAdvanceSelectedBirthStar: Dispatch<SetStateAction<string>>;
  nativeState: string[];
  setNativeState: Dispatch<SetStateAction<string[]>>;
  workLocation: string;
  setWorkLocation: Dispatch<SetStateAction<string>>;
  setPeopleOnlyWithPhoto: Dispatch<SetStateAction<number>>;
  peopleOnlyWithPhoto: number;
  advanceSearchData: Profile[];
  setAdvanceSearchData: Dispatch<SetStateAction<Profile[]>>;
  gridListCardData: Profile[];
  setGridListCardData: Dispatch<SetStateAction<Profile[]>>;
  setTotalRecords: Dispatch<SetStateAction<number>>;
  TotalRecords: number;
  totalPage: number;
  setTotalPage: Dispatch<SetStateAction<number>>;
  perWhistListPage: number;
  setWhistListPerpage: Dispatch<SetStateAction<number>>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<Profile[]>(
    () => {
      const savedBookmarks = localStorage.getItem("bookmarkedProfiles");
      return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    }
  );

  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>(() => {
    const savedSelectedProfiles = localStorage.getItem("selectedProfiles");
    return savedSelectedProfiles ? JSON.parse(savedSelectedProfiles) : [];
  });


//viewedProfile

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Function to toggle the sort order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  //whistlist
  const [TotalRecords, setTotalRecords] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [perWhistListPage, setWhistListPerpage] = useState<number>(0);

  const [searchProfileData, setSearchProfileData] = useState<any>([]); //advance search page search by id
  const [chevvai_dhosam, setChevvai_dhosam] = useState<string>("no");
  const [perPage, setPerPage] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [fromAge, setFromAge] = useState<number>(0);
  const [ToAge, setToAge] = useState<number>(0);
  const [fromHeight, setFromHeight] = useState<number>(0);
  const [toHeight, setToHeight] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<string>("");
  //matching profile
  const [MatchingProfileperPage, setMatchingProfilePerPage] =
    useState<number>(20);
  const [MatchingProfilepageNumber, setMatchingProfilePageNumber] =
    useState<number>(1);
  const [MatchingProfiletotalCount, setMatchingProfileTotalCount] =
    useState<number>(0);
  const [matchingProfileSearchId, setMatchingProfileSearchId] =
    useState<string>("");
  const [matchingProfile_profession, set_MatchingProfile_profession] =
    useState<string>("");
  const [matchingProfile_search_age, set_MatchingProfile_search_age] =
    useState<string>("");
  const [matichingSearch_location, Set_Search_location] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [dashboardDetails, setDashboardDetails] =
    useState<DashboardDetails|any >();
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const [AdvanceselectedProfessions, setAdvanceSelectedProfessions] = useState<
    number[]
  >([]);
  const [nativeState, setNativeState] = useState<string[]>([]);
  const [selectedAdvanceEducation, setAdvanceSelectedEducation] =
    useState<string>("");
  const [workLocation, setWorkLocation] = useState<string>("");
  const [selectedIncomes, setSelectedIncomes] = useState<string>("");
  const [advanceSearchData, setAdvanceSearchData] = useState<Profile[]>([]);
  const [gridListCardData, setGridListCardData] = useState<Profile[]>([]);
  const [peopleOnlyWithPhoto, setPeopleOnlyWithPhoto] = useState<number>(0);
  //advance search
  const [advanceSelectedBirthStar, setAdvanceSelectedBirthStar] =
    useState<string>("");
  const [maritial_Status, Set_Maritial_Status] = useState<number[]>([]);
  const [rehuDhosam, setRehuDhosam] = useState<string>("no");
  const fetchDashboardDetails = async () => {
    if (!loginuser_profileId) {
      setError("No profile ID found in session.");
      return;
    }
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_dashboard_details/",
        {
          profile_id: loginuser_profileId,
        }
      );

      if (response.data.Status === 1) {
        setDashboardDetails(response.data.data);
      } else {
        setError(`Error fetching dashboard details: ${response.data.Message}`);
      }
    } catch (error) {
      setError("Error fetching dashboard details. Please try again.");
      console.error("Error fetching dashboard details:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "bookmarkedProfiles",
      JSON.stringify(bookmarkedProfiles)
    );
  }, [bookmarkedProfiles]);

  useEffect(() => {
    localStorage.setItem("selectedProfiles", JSON.stringify(selectedProfiles));
  }, [selectedProfiles]);

  const addBookmark = async (profile: Profile) => {
    if (!loginuser_profileId) {
      setError("No profile ID found in session.");
      return;
    }
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Mark_profile_wishlist/",
        {
          profile_id: loginuser_profileId,
          profile_to: profile.profile_id,
          status: "1",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.Status === 1) {
        setBookmarkedProfiles((prev) => [...prev, profile]);
        console.log(`Profile ${profile.profile_id} bookmarked successfully.`);
      } else {
        setError(`Failed to bookmark profile: ${response.data.Message}`);
      }
    } catch (error) {
      setError("Error bookmarking profile. Please try again.");
      console.error("Error bookmarking profile:", error);
    }
  };

  const removeBookmark = async (profileId: string) => {
    if (!loginuser_profileId) {
      setError("No profile ID found in session.");
      return;
    }
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Mark_profile_wishlist/",
        {
          profile_id: loginuser_profileId,
          profile_to: profileId,
          status: "0",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.Status === 1) {
        setBookmarkedProfiles((prev) =>
          prev.filter((profile) => profile.profile_id !== profileId)
        );
        setSelectedProfiles((prev) =>
          prev.filter((profile) => profile.profile_id !== profileId)
        );
        console.log(
          `Profile ${profileId} removed from bookmarks successfully.`
        );
      } else {
        setError(`Failed to remove bookmark: ${response.data.Message}`);
      }
    } catch (error) {
      setError("Error removing bookmark. Please try again.");
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        bookmarkedProfiles,
        selectedProfiles,
        error,
        selectedProfile,
        setSelectedProfile,
        addBookmark,
        removeBookmark,
        setSelectedProfiles,
        dashboardDetails,
        fetchDashboardDetails,
        perPage,
        pageNumber,
        totalCount,
        setPerPage,
        setPageNumber,
        setTotalCount,
        fromAge,
        fromHeight,
        toHeight,
        ToAge,
        setFromAge,
        setToAge,
        setFromHeight,
        setToHeight,
        MatchingProfileperPage,
        MatchingProfilepageNumber,
        MatchingProfiletotalCount,
        setMatchingProfilePerPage,
        setMatchingProfilePageNumber,
        setMatchingProfileTotalCount,
        sortOrder,
        toggleSortOrder,
        searchProfileData,
        setSearchProfileData,
        setMatchingProfileSearchId,
        matchingProfileSearchId,
        matchingProfile_profession,
        matchingProfile_search_age,
        matichingSearch_location,
        set_MatchingProfile_profession,
        set_MatchingProfile_search_age,
        Set_Search_location,
        userProfile,
        setUserProfile,
        Set_Maritial_Status,
        maritial_Status,
        AdvanceselectedProfessions,
        setAdvanceSelectedProfessions,
        selectedAdvanceEducation,
        setAdvanceSelectedEducation,
        setSelectedIncomes,
        selectedIncomes,
        chevvai_dhosam,
        setChevvai_dhosam,
        rehuDhosam,
        setRehuDhosam,
        advanceSelectedBirthStar,
        setAdvanceSelectedBirthStar,
        nativeState,
        setNativeState,
        workLocation,
        setWorkLocation,
        peopleOnlyWithPhoto,
        setPeopleOnlyWithPhoto,
        advanceSearchData,
        setAdvanceSearchData,
        gridListCardData,
        setGridListCardData,
        TotalRecords,
        setTotalRecords,
        totalPage,
        setTotalPage,
        perWhistListPage,
        setWhistListPerpage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
