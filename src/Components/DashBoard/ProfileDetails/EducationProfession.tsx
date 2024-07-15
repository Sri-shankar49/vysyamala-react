import React from 'react'
import { MdModeEdit } from "react-icons/md";

export const EducationProfession = () => {
  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">Education & Profession Details
        <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" />
      </h2>

      <div>
        <div className="grid grid-rows-1 grid-cols-2">

          <div>
            <h5 className="text-[20px] text-ash font-semibold mb-2">Education Level :
              <span className="font-normal"> Diploma / PG Diploma</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">Education Details :
              <span className="font-normal"> DCE.,</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">About Education :
              <span className="font-normal"> -</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">Profession :
              <span className="font-normal"> Pollachi</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">Company Name :
              <span className="font-normal"> Ganapathi Medicals</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">Business Name :
              <span className="font-normal"> Ganapathi Medicals</span></h5>

          </div>

          <div>
            <h5 className="text-[20px] text-ash font-semibold mb-2">Business Address :
              <span className="font-normal"> No.36, Puthuplayam Main Road</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">Annual Income :
              <span className="font-normal"> Rs.5,00,001 - Rs.7,50,000</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">Gross Annual Income :
              <span className="font-normal"> -</span></h5>

            <h5 className="text-[20px] text-ash font-semibold mb-2">Place of Stay :
              <span className="font-normal"> Cuddalore</span></h5>
          </div>

        </div>
      </div>
    </div>
  )
}
