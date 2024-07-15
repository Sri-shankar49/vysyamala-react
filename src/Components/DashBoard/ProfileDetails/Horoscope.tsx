import React from 'react'
import { MdModeEdit } from "react-icons/md";

export const Horoscope = () => {
    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Horoscope Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" />
            </h2>

            <div>
                <div className="grid grid-rows-1 grid-cols-2">

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Tamil Year :
                            <span className="font-normal"> Srimukha</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Tamil Month :
                            <span className="font-normal"> Karthikai</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Tamil Day :
                            <span className="font-normal"> 18, Friday</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Telugu Year :
                            <span className="font-normal"> -</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Telugu Month :
                            <span className="font-normal"> -</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Telugu Day :
                            <span className="font-normal"> 22 years</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Rasi :
                            <span className="font-normal"> Kadagam</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Star - Padham :
                            <span className="font-normal"> Poosam</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Lagnam :
                            <span className="font-normal"> Magaram</span></h5>
                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Nallikai :
                            <span className="font-normal"> No</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Didi :
                            <span className="font-normal"> No</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Suya Gothram :
                            <span className="font-normal"> Palisetla</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Madhulam :
                            <span className="font-normal"> Vasthrakula</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Dasa  :
                            <span className="font-normal"> Saturn</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Dasa Balance :
                            <span className="font-normal"> 18 years, 0 months, 8 days</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Chevvai Dosham :
                            <span className="font-normal"> Unknown</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Sarpa Dosham :
                            <span className="font-normal"> Unknown</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Lagnam :
                            <span className="font-normal"> Magaram</span></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
