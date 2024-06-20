import arrowRed from "../assets/icons/arrowred.png";
import { PlanCard } from "../Components/MembershipPlan/PlanCard";

// PlanCard Component 
const goldPlan = [
    {
        price: 4900,
        period: "year",
        planName: "Gold",
        features: [
            "Online Access to Matching Profiles 25/day",
            "Personalised Express Interest",
            "Private Notes",
            "Matching Albums",
            "Advanced Search Option",
            "App Notifications and SMS/E-mail Alerts",
            "Automated 10 Porutham Report",
            "Online chat"
        ]
    },
    // Add more plan objects here if needed
];

// Platinum PlanCard Component 
const platinumPlan = [
    {
        price: 6900,
        period: "year",
        planName: "Platinum",
        features: [
            "+ All Features of Gold +",
            "Online Access to Matching profiles 50/day",
            "Profile Spotlight for 3 Months",
            "Vysyamala Suggested profiles through Mail - Monthly",
            "Priority Circulation for your matching profiles",
            "Profile Booster for 3 Months",
        ]
    },
    // Add more plan objects here if needed
];

// Platinum Private PlanCard Component 
const platinumPrivatePlan = [
    {
        price: 9900,
        period: "year",
        planName: "Platinum Private",
        features: [
            "Online Access to Matching Profiles 50/day",
            "Private online access to Matching Profiles",
            "Dedicated Relationship Manager - Monthly Recommendations",
            "Choose your Profile Visibilty",
            "Vys Assist for 5 Members",
        ]
    },
    // Add more plan objects here if needed
];


export const MembershipPlan: React.FC = () => {
    // const plans = [goldPlan, platinumPlan, platinumPrivatePlan];

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h5 className="text-[36px] text-ash font-semibold">Membership Plans</h5>

                <button className="flex items-center py-[10px] px-14 bg-white text-main font-semibold mt-2">Skip for Free
                    <span>
                        <img src={arrowRed} alt="next arrow" className="ml-2" />
                    </span>
                </button>
            </div>

            <div>
                <p className="font-normal text-ashSecondary">Upgrade your plan as per your customized requirements, with a paid membership,you can seamlessly connect with your prospects and get more responses. Here are some key benefits</p>
            </div>

            <div className="flex justify-center w-full mx-auto my-10 space-x-5">
                {goldPlan.map((plan, index) => (
                    <PlanCard
                        key={index}
                        price={plan.price}
                        period={plan.period}
                        planName={plan.planName}
                        features={plan.features}
                    />
                ))}
                {platinumPlan.map((plan, index) => (
                    <PlanCard
                        key={index}
                        price={plan.price}
                        period={plan.period}
                        planName={plan.planName}
                        features={plan.features}
                        className="bg-gradientBgImg bg-cover bg-center text-white rounded-3xl"
                    />
                ))}
                {platinumPrivatePlan.map((plan, index) => (
                    <PlanCard
                        key={index}
                        price={plan.price}
                        period={plan.period}
                        planName={plan.planName}
                        features={plan.features}
                    />
                ))}

            </div>
        </div>
    )
}
