import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {Notification} from "../../Components/LoginHeader"


export const Notifications = () => {

  const [NotificationData, setNotificationData] = useState<Notification[]>([]);
  const userId = sessionStorage.getItem("loginuser_profile_id");
  const getNotification = () => {
    axios
      .post("http://103.214.132.20:8000/auth/Get_notification_list/", {
        profile_id: userId,
      })
      .then((response) => {
        setNotificationData(response.data.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching notifications:",
          error.response ? error.response.data : error.message
        );
      });
  };
  console.log("aaa", NotificationData)
  useEffect(() => {
    getNotification()
  }, [])


  return (
    <>
      <div className="bg-grayBg py-10">
        <div className="container mx-auto">
          <div className="notification-dropdown bg-white rounded-md shadow-lg py-1 z-20">
            <h4 className="text-[24px] text-vysyamalaBlack font-bold px-3 py-3">
              Notifications
            </h4>

            <div className="">
              {NotificationData.map((data) => (
                <>
                  <div className="bg-lightFade-pink flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5">
                    <div>
                      <img src={data.notify_img} alt="Harini Image" className="w-full" />
                    </div>
                    <div className="">
                      <h5 className="text-lg text-vysyamalaBlack font-semibold">
                        {data.from_profile_id} {data.
                          message_titile}
                      </h5>
                      <p className="text-md text-ashSecondary font-normal mb-3">
                        I am interested in your profile. If you are interested in my profile, please contact me.
                      </p>

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
                </>
              ))}
            </div>

            <div className="text-center px-3 py-3">
              <Link to="/Notifications">
                <button className="w-full rounded-md text-lg text-white bg-gradient py-3 font-semibold">
                  See previous notifications
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}