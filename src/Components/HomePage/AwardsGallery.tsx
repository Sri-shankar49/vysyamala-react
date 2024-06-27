import Award from "../../assets/icons/Award.png";
import { AwardCard } from "./AwardGallery/AwardCard";
import VysyaSaathanaiyaalar from "../../assets/images/VysyaSaathanaiyaalar.png"
import EnterprisingEntrepreneur from "../../assets/images/EnterprisingEntrepreneur.png"
import AryaVysyaMatrimonial from "../../assets/images/AryaVysyaMatrimonial.png"


export const AwardsGallery = () => {
    return (
        <div>
            <div className="container mx-auto">
                <div className="text-center">
                    <div className="">
                        <img src={Award} alt="Award-icon" className="w-fit mx-auto" />
                    </div>
                    <h4 className="text-primary text-[36px] font-semibold">Awards Gallery</h4>
                </div>

                <div className="flex justify-between items-center my-8">
                    <AwardCard image={VysyaSaathanaiyaalar} awardName={"Vysya Saathanaiyaalar"} awardDesc={"- TN Arya Vysya Mahasabha, Theni"} />
                    <AwardCard image={EnterprisingEntrepreneur} awardName={"Enterprising Entrepreneur"} awardDesc={"- Vasavi Club International – District 502A"} />
                    <AwardCard image={AryaVysyaMatrimonial} awardName={"Arya Vysya Matrimonial"} awardDesc={"- Sri Brahmam"} />
                </div>
            </div>
        </div>
    )
}
