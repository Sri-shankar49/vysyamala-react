interface WhyReasonsProps {
    icon?: string;
    heading: string;
    desc: string;
}

export const WhyReasons: React.FC<WhyReasonsProps> = ({ icon, heading, desc }) => {
    return (
        <div>
            <div>
                <div className="mb-3">
                    <img src={icon} alt="Wide profile coverage" />
                </div>
                <h5 className="text-lg text-ash font-semibold mb-3">{heading}</h5>
                <p className="text-ash">{desc}</p>
            </div>
        </div>
    )
}
