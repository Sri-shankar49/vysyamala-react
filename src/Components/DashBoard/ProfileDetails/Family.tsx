import React from 'react'
import { MdModeEdit } from "react-icons/md";

export const Family = () => {
    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Family Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" />
            </h2>

            <div>
                <div className="grid grid-rows-1 grid-cols-2">

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">About My Family :
                            <span className="font-normal"> -</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Father Name :
                            <span className="font-normal"> K. Karthikeyan (Late)</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Father Occupation :
                            <span className="font-normal"> -</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Name :
                            <span className="font-normal"> K. Sujatha (Late)</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mother Occupation :
                            <span className="font-normal"> Pollachi</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Family Status :
                            <span className="font-normal"> Upper Middle Class</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters :
                            <span className="font-normal"> No</span></h5>

                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Sisters Married :
                            <span className="font-normal"> No</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers :
                            <span className="font-normal"> No</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Brothers Married :
                            <span className="font-normal"> No</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Property Details :
                            <span className="font-normal"> -</span></h5>

                    </div>
                </div>
            </div>
        </div>
    )
}
