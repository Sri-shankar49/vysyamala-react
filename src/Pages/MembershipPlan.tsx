import arrowRed from "../assets/icons/arrowred.png";
import { PlanCard } from "../Components/MembershipPlan/PlanCard";
import { useState, useEffect } from "react";
import apiClient from "../API";

export const MembershipPlan: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]); // State to hold plans data

  useEffect(() => {
    // Define an async function to fetch plans data
    const fetchPlans = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_palns/`);
        const { data } = response.data;

        const updatedPlans = Object.keys(data).map(planName => ({
          id: data[planName][0].plan_id, // Assuming plan_id is available in the response
          price: parseFloat(data[planName][0].plan_price), // Assuming the price is a float number
          period: data[planName][0].plan_renewal_cycle,
          planName: planName,
          features: data[planName].map((feature: any) => feature.feature_name)
        }));
        setPlans(updatedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans(); // Call the async function
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h5 className="text-[36px] text-ash font-bold">Membership Plans</h5>

        <button className="flex items-center py-[10px] px-14 bg-white text-main font-semibold mt-2">Skip for Free
          <span>
            <img src={arrowRed} alt="next arrow" className="ml-2" />
          </span>
        </button>
      </div>

      <div>
        <p className="font-normal text-ashSecondary">Upgrade your plan as per your customized requirements, with a paid membership, you can seamlessly connect with your prospects and get more responses. Here are some key benefits</p>
      </div>

      <div className="flex justify-center w-fit mx-auto my-24 rounded-3xl shadow-2xl relative">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            id={plan.id} // Pass the id to PlanCard component
            price={plan.price}
            period={plan.period}
            planName={plan.planName}
            features={plan.features}
            className={`rounded-3xl ${index === 1 ? "bg-gradientBgImg bg-cover bg-center translate-y-[-50px] text-white shadow-2xl shadow-shadowPink" : ""}`}
            customStyles={index === 1 ? "text-white" : "text-ash"}
            customStylesOne={index === 1 ? "text-white" : "text-vysyamalaBlack"}
            customStylesTwo={index === 1 ? "text-white" : "text-main"}
            customStylesThree={index === 1 ? "bg-white" : "bg-light-pink"}
            isCenterCard={index === 1}
          >
            {index === 1 && (
              <div className="absolute top-[0px] left-1/2 transform -translate-x-1/2 bg-light-pink text-main uppercase tracking-wider font-semibold py-1 px-4 rounded-b-md">
                Most Popular
              </div>
            )}
          </PlanCard>
        ))}
      </div>
    </div>
  );
};
