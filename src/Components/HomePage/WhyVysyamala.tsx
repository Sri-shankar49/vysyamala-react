import { WhyReasons } from './WhyVysyamala/WhyReasons'
import ProfileCoverage from "../../assets/icons/profileCoverage.png"
import CustomerSupport from "../../assets/icons/CustomerSupport.png"
import Gothras from "../../assets/icons/Gothras.png"
import UserFriendly from "../../assets/icons/UserFriendly.png"


export const WhyVysyamala = () => {
    return (
        <div>
            <div className="container mx-auto py-16 max-2xl:px-5 max-sm:py-6">
                <div>
                    <h4 className="text-primary text-[36px] font-bold pb-3 max-xl:text-[34px] max-lg:text-[30px] max-lg:pb-2 max-md:text-[28px] max-sm:text-[24px]">
                        Why Vysyamala?
                    </h4>
                    <p className="text-primary text-[20px] max-xl:text-[18px] max-lg:text-[16px]">
                        Vysyamala is a platform initiated to ensure quality and culture. With
                        our platform, it is a given that you will find your soul mate. But what
                        makes us special is our keen eye on{" "}
                        <span className="font-bold">Arya Vysya Traditions</span>. Below are
                        some of the other reasons to choose us.
                    </p>
                </div>

                <div className="grid grid-rows-2 grid-cols-2 gap-10 my-16 max-sm:grid-cols-1 max-sm:gap-5 max-sm:my-10">
                    <WhyReasons
                        icon={ProfileCoverage}
                        heading={"Wide profile coverage"}
                        desc={
                            "Ensuring to provide the best service, we have curated our profile section to cover all the details of your prospects. A few easy clicks and you shall find your soul mate!"
                        }
                    />
                    <WhyReasons
                        icon={CustomerSupport}
                        heading={"Customer support"}
                        desc={
                            "Have an issue? Need someone to help you through the website? Any problem, we strive to provide you with an instant solution. Our customer support extends through various channels like email, live chat, call, etc."
                        }
                    />
                    <WhyReasons
                        icon={Gothras}
                        heading={"Arya Vysya Gotras"}
                        desc={
                            "Want to know about all Arya Vysya Gotras? Well, your search ends here as we have the list of all the Arya Vysya Gotras for your easy convenience."
                        }
                    />
                    <WhyReasons
                        icon={UserFriendly}
                        heading={"User-friendly movement through the portal website"}
                        desc={
                            "Our app is designed to be simple yet fulfilling. Our portal can be accessed from baby boomers to gen Zs."
                        }
                    />
                </div>

                <hr className="text-gray" />
            </div>
        </div>

    )
}
