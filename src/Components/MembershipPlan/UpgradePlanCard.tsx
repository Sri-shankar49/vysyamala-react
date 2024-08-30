import { FaCheck } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface UpgradePlanCardProps {
    id: number; // New prop for ID
    price: number;
    period: string;
    planName: string;
    features: string[];
    className?: string;
    customStyles?: string;
    customStylesOne?: string;
    customStylesTwo?: string;
    customStylesThree?: string;
    isCenterCard?: boolean;
    children?: React.ReactNode; // To include additional elements
}

export const UpgradePlanCard: React.FC<UpgradePlanCardProps> = ({
    id,
    price,
    period,
    planName,
    features,
    className,
    customStyles,
    customStylesOne,
    customStylesTwo,
    customStylesThree,
    isCenterCard,
    children,
}) => {
    return (
        <div className="w-[26%]">
            <div
                className={`flex flex-col justify-evenly h-full w-full bg-white rounded-3xl p-16 ${className}`}
            >
                {children}
                <h1 className={`text-[36px] ${customStylesTwo} font-bold`}>
                    ₹ {price}
                    <span className={`text-[16px] ${customStylesOne}`}>/{period}</span>
                </h1>

                <h4 className={`text-[28px] ${customStylesOne} font-bold mb-2`}>
                    {planName}
                </h4>

                <div>
                    <ul>
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className={`relative text-[14px] ${customStyles} mb-2`}
                            >
                                {feature}
                                {isCenterCard ? (
                                    <FaCircleCheck className="absolute top-0.5 left-[-30px] text-[18px] text-checkRed bg-white rounded-full" />
                                ) : (
                                    <FaCheck className="absolute top-1 left-[-30px] text-[18px] text-checkGreen" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to={`/UpgradePayNow?id=${id}&price=${price}`}>
                    {" "}
                    {/* Pass the id as a query parameter to PayNow route */}
                    <button
                        className={`${customStylesThree} w-full rounded-full py-[8px] text-main text-[16px] font-semibold mt-10 cursor-pointer`}
                    >
                        Choose Plan
                    </button>
                </Link>
            </div>
        </div>
    );
};
