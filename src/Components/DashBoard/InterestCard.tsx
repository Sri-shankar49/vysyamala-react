import InterestprofileImg from "../../assets/images/InterestProfileImg.png";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

export const InterestCard = () => {
    return (
        <div>

            <div className="flex justify-between items-center bg-white shadow-sm rounded-xl px-3 py-2 mb-4">
                <div className="flex justify-center items-center space-x-5">
                    <div>
                        <img src={InterestprofileImg} alt="" className="w-full" />
                    </div>

                    <div>
                        <h5 className="text-[18px] text-primary font-bold">Harini <span className="text-sm text-ashSecondary font-semibold">(VM32787)</span></h5>
                        <p className="text-sm text-ashSecondary">28 yrs</p>
                        <p className="text-sm text-ashSecondary">I am interested in your profile. If you are interested in my profile, please contact me.</p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center">
                        <FaCheckCircle className="text-[60px] text-checkGreen rounded-xl px-3 py-3 m-3 cursor-pointer hover:bg-gray" />
                        <IoMdCloseCircle className="text-[65px] text-closeRed rounded-xl px-3 py-3 m-3 cursor-pointer hover:bg-gray" />
                    </div>
                </div>
            </div>
        </div>
    )
}
