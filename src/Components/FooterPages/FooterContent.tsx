import React from 'react'

interface FooterContentProps {
    title: string;
    description: string;
}

export const FooterContent: React.FC<FooterContentProps> = ({ title, description }) => {
    return (
        <div className="container mx-auto">
            <div className="my-10">
                <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5">{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}
