import { FaCheck } from "react-icons/fa";

export const ThankYouReg = () => {
  const Save_plan_package_message = sessionStorage.getItem(
    "Save_plan_package_message"
  );

  return (
    <div>
      <div className="container mx-auto">
        <div className="w-full rounded-3xl shadow-2xl mx-auto text-center p-24 my-20">
          <div className="w-1/2 mx-auto flex flex-col justify-between items-center">
            <h1 className="text-6xl text-vysyamalaBlack uppercase font-bold tracking-wide mb-5">
              Thank You!
            </h1>

            <FaCheck className="w-full text-8xl text-[#00c96a] mb-5" />
            <p className="text-vysyamalaBlack">{Save_plan_package_message}</p>

            {/* <p className="text-vysyamalaBlack">Thank you for Registering your profile in Vysyamala. Your Profile ID is <span className="text-main font-semibold">VM110</span>. Thanks a bunch for filling that out. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thanks for being you. </p> */}
          </div>

          <div>
            <p className="text-vysyamalaBlack font-semibold mt-24">
              Copyright &copy; 2024 | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
