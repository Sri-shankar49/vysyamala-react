import React from "react";

interface ContentCardProps {
  heading: string;
  desc: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ heading, desc }) => {
  return (
    <div className="bg-gradient-to-tr from-[#22272E] to-[#202332] text-white px-24 py-16">
      <div className="container">
        <h1 className="font-bold text-2xl mb-1">{heading}</h1>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ContentCard;
