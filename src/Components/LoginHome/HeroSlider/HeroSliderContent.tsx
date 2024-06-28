import HeartMsg from "../../../assets/icons/HeartMsg.png";
import ProfileImgSlider from "../../../assets/images/ProfileImgSlider.png";

export const HeroSliderContent = () => {
    return (
        <div>
            <div className="w-9/12 mx-auto flex justify-between items-center py-36">
                <div>
                    <div className="mb-3">
                        <img src={HeartMsg} alt="" />
                    </div>
                    <h4 className="text-4xl text-white font-semibold">New Interest <br /> Received</h4>
                </div>

                <div>
                    <div className="flex justify-center items-center">
                        <div className="relative fade-bottom">
                            <img src={ProfileImgSlider} alt="" className="w-full translate-x-1" />

                            <div className="w-full absolute bottom-0 p-5 z-10">
                                <h5 className="text-white font-semibold">Harini <span>(VM32787)</span></h5>
                                <div className="flex justify-between items-center">
                                    <p className="text-white font-normal">28 yrs</p>
                                    <p className="text-white font-normal">5ft 10in (177 cms)</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-10 py-[3.39em] rounded-r-lg">
                            <h5 className="text-md vysyamalaBlack font-semibold mb-5">I am interested in your profile. <br /> If you are interested in my profile, <br /> please contact me.</h5>

                            <div className="space-x-5">
                                <button className="bg-gradient text-white rounded-[6px] font-semibold px-8 py-3">View Profile</button>
                                <button className="bg-white text-main rounded-[6px] border-2 border-main font-semibold px-8 py-2.5">Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
