import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MyVisitorsCard } from "./MyVisitors/MyVisitorsCard";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";
import axios from "axios";
import Pagination from "../Pagination";

interface MyVisitorsProps {
  dashBoardAgain: () => void;
}

export const MyVisitors: React.FC<MyVisitorsProps> = ({ dashBoardAgain }) => {
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const [ViewCount, setViewCount] = useState<number>(0)
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [dataPerPage, setDataPerPage] = useState(0);
  const toptalPages = dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;
  // const [totalPages,setTotalPages]=useState<number>(0)

  console.log(ViewCount, "ViewCount");

  const [pageNumber, setPageNumber] = useState<number>(1);
  const fetchData = async () => {
    const response = await axios.post(
      "http://103.214.132.20:8000/auth/My_profile_visit/",
      {
        profile_id: loginuser_profileId,
      }
    );
    console.log(response, "response")

    setTotalRecords(response.data.data.total_records || 0);
    setDataPerPage(response.data.data.per_page || 0);
    setViewCount(response.data.viewed_count || 0)

  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-grayBg py-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <div className="flex justify-center items-center">
            <IoArrowBackOutline
              onClick={dashBoardAgain}
              className="text-[24px] mr-2 cursor-pointer"
            />
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
              {" "}
              My Visitors
              <span className="text-sm text-primary"> ({ViewCount})</span>
            </h4>
          </div>

          <div>
            <select
              name="month"
              id="month"
              className="rounded-md p-3 shadow focus-visible:outline-none"
            >
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="Apr">April</option>
              <option value="may">May</option>
              <option value="jun">June</option>
              <option value="jul">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>
          </div>
        </div>

        {/* My Visitors Card */}
        <div className="bg-white rounded-xl shadow px-5 py-5 mb-10">
          <p className="text-ashSecondary font-semibold">Today</p>
          <MyVisitorsCard />
          {/* <MyVisitorsCard /> */}
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalRecords={totalRecords}
            dataPerPage={dataPerPage}
            toptalPages={toptalPages}
          />
        </div>

      </div>
      <SuggestedProfiles />
    </div>
  );
};
