import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Notification } from "../../Components/LoginHeader";
import { ProfileContext } from "../../ProfileContext";
import Spinner from "../../Components/Spinner";

export const Notifications = () => {
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

  const [NotificationData, setNotificationData] = useState<Notification[]>([]);
  const userId = sessionStorage.getItem("loginuser_profile_id");
  const [dataPerPage, setDataPerPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(5);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [totalPages, setTotalpages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(totalPages, totalRecords, currentPage, dataPerPage, "ffffffff");

  const getNotification = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Get_notification_list/",
        {
          profile_id: userId,
          per_page: currentPage,
        }
      );

      setNotificationData(response.data.data);
      setDataPerPage(response.data.per_page);
      setTotalRecords(response.data.total_records);
      setTotalpages(response.data.total_pages);
      console.log(response.data.data, ".....");
    } catch (error: any) {
      console.error(
        "Error fetching notifications:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, userId]);

  useEffect(() => {
    getNotification();
  }, [getNotification]);

  const hasMore = totalRecords > NotificationData.length;

  const handleLoadData = useCallback(() => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 5);
    }
  }, [hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const windowHeight = document.body.offsetHeight;

      if (scrollPosition >= windowHeight && hasMore) {
        handleLoadData();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleLoadData, hasMore]);

  console.log(currentPage, "currentpage");
  return (
    <>
      <div className="bg-grayBg py-10">
        <div className="container mx-auto">
          <div className="notification-dropdown bg-white rounded-md shadow-lg py-1 z-20">
            <h4 className="text-[24px] text-vysyamalaBlack font-bold px-3 py-3">
              Notifications ({totalRecords})
            </h4>

            <div className="">
              {NotificationData.map((data) => (
                <div
                  key={data.id}
                  className="bg-lightFade-pink flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5"
                >
                  <div>
                    <img
                      src={data.profile_image}
                      alt="Image"
                      className="rounded-full"
                    />
                  </div>

                  <div className="">
                    <h5 className="text-lg text-vysyamalaBlack font-semibold">
                      {data.from_profile_id} {data.to_message}
                    </h5>
                  

                    {data.notification_type === "express_interests" ? (
                      <button className="text-main rounded-md border-[2px] border-main px-2 py-1">
                        Message
                      </button>
                    ) : (
                      <button className="text-main rounded-md border-[2px] border-main px-2 py-1">
                        Update my photo
                      </button>
                    )}
                    <p className="text-sm text-ashSecondary font-semibold mt-3">
                      {data.time_ago}
                    </p>
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <button
                  onClick={handleLoadData}
                  className="w-full rounded-md text-main py-3 font-semibold hover:bg-gradient hover:text-white"
                >
                  {NotificationData.length === totalRecords
                    ? "You have reached the maximum number of records"
                    : "Load more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
