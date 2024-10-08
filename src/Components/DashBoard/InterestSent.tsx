import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { InterestSentCard } from "./InterestSent/InterestSentCard";
import Pagination from "../Pagination";
import axios from "axios";

interface InterestSentProps {
  dashBoardAgain: () => void;
}

export const InterestSent: React.FC<InterestSentProps> = ({
  dashBoardAgain,
}) => {
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [dataPerPage, setDataPerPage] = useState(0);
  const toptalPages = dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;
  // const [totalPages,setTotalPages]=useState<number>(0)

  console.log(dataPerPage, "dataPerPage" ,toptalPages,"toptalPages",totalRecords,"totalRecords");

  const [pageNumber, setPageNumber] = useState<number>(1);
  const fetchData = async () => {
    const response = await axios.post(
      "http://103.214.132.20:8000/auth/My_intrests_list/",
      {
        profile_id: loginuser_profileId,
      }
    );
    setTotalRecords(response.data.data.total_records);
    setDataPerPage(response.data.data.per_page);

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
              Interest Sent
              <span className="text-sm text-primary"> ({totalRecords})</span>
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

        {/* Interest Sent Card */}
        <div className="bg-white rounded-xl shadow px-5 py-5">
          <p className="text-ashSecondary font-semibold">Today</p>

          <InterestSentCard pageNumber={pageNumber} dataPerPage={dataPerPage} />
          {/* <InterestSentCard /> */}
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalRecords={totalRecords}
            dataPerPage={dataPerPage}
            toptalPages={toptalPages}
          />
        </div>
      </div>
    </div>
  );
};
