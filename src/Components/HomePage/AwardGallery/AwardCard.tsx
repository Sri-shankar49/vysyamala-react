import React from 'react'

interface AwardCardProps {
  image?: string;
  awardName: string;
  awardDesc: string;
}

export const AwardCard: React.FC<AwardCardProps> = ({ image, awardName, awardDesc }) => {
  return (
    <div className="w-fit p-5 border-[1px] border-gray rounded-lg">
      <div className="mb-5">
        <img src={image} alt="" className="" />
      </div>
      <div className="text-center">
        <h4 className="text-[20px] text-primary font-bold mb-2">{awardName} Award</h4>
        <p className="text-ash">{awardDesc}</p>
      </div>
    </div>
  )
}
