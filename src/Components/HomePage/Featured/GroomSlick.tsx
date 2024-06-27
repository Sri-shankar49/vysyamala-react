import React from 'react'
import Groom from "../../../assets/images/Groom.png";

interface GroomSlickProps {
  profileId: string;
  age: string;
}

export const GroomSlick: React.FC<GroomSlickProps> = ({ profileId, age }) => {
  return (
    <div>
      <div>
        <div className='mx-5 w-4/5 cursor-grab'>
          <img src={Groom} alt="Bride image" className="w-full" />
          <div className="bg-white flex justify-between items-center rounded-b-md shadow-lg px-5 py-3">
            <h5 className="text-secondary font-semibold">{profileId}</h5>
            <p className="text-vysyamalaBlack font-semibold">{age} yrs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
