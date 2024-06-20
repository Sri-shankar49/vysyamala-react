import { FaCheck } from "react-icons/fa6";

interface PlanCardProps {
    price: number;
    period: string;
    planName: string;
    features: string[];
    className?: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({ price, period, planName, features, className }) => {
    return (
        <div>
            <div className={`flex flex-col justify-evenly h-full w-full bg-white rounded-lg p-16 ${className}`}>
                <h1 className="text-[36px] text-main font-bold">₹ {price} <span className="text-[16px] text-vysyamalaBlack">/{period}</span></h1>

                <h4 className="text-[28px] text-vysyamalaBlack font-bold mb-2">{planName}</h4>

                <div>
                    <ul>
                        {features.map((feature, index) => (
                            <li key={index} className="relative text-[14px] text-ash mb-2">
                                {feature}
                                <FaCheck className="absolute top-1 left-[-30px] text-[18px] text-checkGreen" />
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="bg-light-pink rounded-full py-[8px]  text-main text-[16px] font-semibold cursor-pointer">Choose Plan</button>
            </div>
        </div>
    )
}
