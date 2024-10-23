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
  const profile_id = sessionStorage.getItem("profile_id_new");
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
  const [selectedPackageIds, setSelectedPackageIds] = useState<number[]>([]);

  const handleAddOnChange = (
    rate: number,
    checked: boolean,
    packageId: number
  ) => {
    if (checked) {
      setSelectedValues([...selectedValues, rate]);
      setSelectedPackageIds([...selectedPackageIds, packageId]);
    } else {
      // Remove rate and package ID from the respective arrays
      const updatedValues = selectedValues.filter((val) => val !== rate);
      const updatedPackageIds = selectedPackageIds.filter(
        (id) => id !== packageId
      );

      setSelectedValues(updatedValues);
      setSelectedPackageIds(updatedPackageIds);
    }
  };

  const totalAmount = selectedValues.reduce(
    (acc, val) => acc + val,
    Number(price)
  );

  const Save_plan_package = async () => {
    try {
      const addonPackageIdsString = selectedPackageIds.join(",");

      const response = await axios.post(
        "http://103.214.132.20:8000/auth/Save_plan_package/",
        {
          profile_id: profile_id,
          plan_id: id,
          addon_package_id: addonPackageIdsString,
          total_amount: totalAmount,
        }
      );

      if (response.status === 200) {
        NotifySuccess("Plans and packages updated successfully");
        sessionStorage.setItem(
          "Save_plan_package_message",
          response.data.data_message
        );
        sessionStorage.setItem("register_token", response.data.token);
        console.log(response.data, "kkkkkkkkkkk");
        setTimeout(() => {
          navigate("/ThankYouReg");
        }, 2000);
      }
    } catch (error) {
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
              </Link>
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
              onChange={(rate, checked) =>
                handleAddOnChange(rate, checked, packageItem.package_id)
              }
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
