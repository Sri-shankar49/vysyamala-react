import React from 'react'
import { MdModeEdit } from "react-icons/md";

export const Contact = () => {
    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Contact Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" />
            </h2>

            <div>
                <div className="grid grid-rows-1 grid-cols-2">

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Address :
                            <span className="font-normal"> Srimukha</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">City :
                            <span className="font-normal"> Cuddalore - 607001</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">State :
                            <span className="font-normal"> Tamil Nadu</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Country :
                            <span className="font-normal"> India</span></h5>
                    </div>

                    <div>
                        <h5 className="text-[20px] text-ash font-semibold mb-2">Phone :
                            <span className="font-normal"> 1234567890</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Mobile :
                            <span className="font-normal"> 1234567890</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">WhatsApp :
                            <span className="font-normal"> 1234567890</span></h5>

                        <h5 className="text-[20px] text-ash font-semibold mb-2">Email :
                            <span className="font-normal"> Harini@gmail.com</span></h5>

                    </div>
                </div>
            </div>
        </div>
    )
}
