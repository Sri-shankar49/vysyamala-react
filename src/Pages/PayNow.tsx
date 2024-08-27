import React, { useEffect, useState } from "react";
import { AddOns } from "../Components/PayNow/AddOns";
import { Link, useNavigate } from "react-router-dom";
import { Get_addon_packages } from "../commonapicall";
import axios from "axios";

import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../Components/Toast/ToastNotification";
interface Package {
  package_id: number;
  name: string;
  description: string;
  amount: number;
}

export const PayNow: React.FC = () => {
  const [membershipPlane, setMemberShipPlane] = useState<Package[]>([]);
  const profile_id = sessionStorage.getItem("profile_id_new") || sessionStorage.getItem("loginuser_profile_id")
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.post(Get_addon_packages);
    try {
      if (response.status === 200) {
        setMemberShipPlane(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const price = queryParams.get("price");

  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const handleAddOnChange = (rate: number, checked: boolean) => {
    if (checked) {
      setSelectedValues([...selectedValues, rate]);
    } else {
      // Create a copy of the array
      const updatedValues = [...selectedValues];
      // Find the index of the first occurrence of the rate
      const index = updatedValues.indexOf(rate);
      if (index !== -1) {
        // Remove that single occurrence
        updatedValues.splice(index, 1);
      }
      setSelectedValues(updatedValues);
    }
  };

  const totalAmount = selectedValues.reduce((acc, val) => acc + val, Number(price));

  console.log(profile_id, id, totalAmount);
  const Save_plan_package = async () => {
    try {
      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Save_plan_package/",
        {
          profile_id: profile_id,
          plan_id: id,
          addon_package_id: "1,2,3", // Ensure this is the correct format the API expects
          total_amount: totalAmount,
        }
      );

      if (response.status === 200) {
        // Handle the successful response here
        NotifySuccess("Plans and packages updated successfully");
        sessionStorage.setItem(
          "Save_plan_package_message",
          response.data.data_message
        );

        setTimeout(() => {
          navigate("/ThankYouReg");
        }, 2000);
      } else {
        // Handle cases where the response is not successful but still received
      }
    } catch (error) {
      // Handle the error here
      NotifyError("Something went wrong.");
      console.error("Error saving the package:", error);
    }
  };

  return (
    <div>

      <div className="container mx-auto">
        <div className="w-1/3 mx-auto font-semibold rounded-2xl shadow-xl p-10 my-10">
          <h5 className="text-footer-gray mb-2">Selected Plan</h5>

          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-[24px] text-footer-gray font-bold mb-2">
                Platinum
              </h4>
              <Link to="/MembershipPlan">
                <p className="text-main underline font-normal">Change Plan</p>
              </Link>{" "}
            </div>

            <div>
              <p className="text-ash">&#8377; {price}.00/-</p>
            </div>
          </div>

          <hr className="text-footer-text-gray my-5" />

          <h5 className="text-footer-gray font-semibold mb-2">
            Add-On Packages
          </h5>

          {membershipPlane.map((packageItem) => (
            <AddOns
              key={packageItem.package_id}
              label={packageItem.name}
              desc={packageItem.description}
              name={packageItem.name}
              rate={packageItem.amount}
              onChange={handleAddOnChange}
            />
          ))}
          <hr className="text-footer-text-gray my-5" />

          <div className="flex justify-between items-center">
            <p className="text-footer-gray">Total</p>
            <p className="text-[24px] text-primary font-bold">
              &#8377; {totalAmount}
            </p>
          </div>

          <button
            onClick={() => Save_plan_package()}
            type="submit"
            className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] mt-5"
          >
            Pay Now
          </button>
        </div>
      </div>
      <ToastNotification />
    </div>
  );
};
