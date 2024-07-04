import React from 'react'

interface OptionCardProps {
    cardTitle: string,
    cardIcon: JSX.Element,
    // cardIconColor : string,
    // cardIconSize : number,
    // cardIconBackground : string,
}

export const OptionCard: React.FC<OptionCardProps> = ({ cardTitle, cardIcon }) => {
    return (
        <div>
            <div className="w-fit mx-auto bg-white shadow-sm rounded-xl p-5 cursor-pointer">
                <div className="text-[48px] text-closeRed mb-5">
                    {cardIcon}
                </div>
                <h4 className="text-[20px] text-ash font-semibold">{cardTitle}</h4>
            </div>
        </div>
    )
}
