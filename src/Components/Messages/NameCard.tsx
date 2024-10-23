import React from 'react';

interface NameCardProps {
  profile_image: string;
  profile_user_name: string;
  last_mesaage: string;
  profile_lastvist: string;
  room_name: string;
  onClick: () => void; // Add onClick handler
}

export const NameCard: React.FC<NameCardProps> = ({
  profile_image,
  profile_user_name,
  last_mesaage,
  profile_lastvist,
  onClick, // Destructure the onClick handler
}) => {
  return (
    <div
      className="flex items-center p-3 border-b border-footer-text-gray cursor-pointer"
      onClick={onClick} // Attach onClick handler
    >
      <img src={profile_image} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
      <div className="ml-3">
        <h6 className="text-lg font-bold text-vysyamalaBlack">{profile_user_name}</h6>
        <p className="text-sm text-ashSecondary">{last_mesaage}</p>
        <p className="text-xs text-primary">{profile_lastvist}</p>
      </div>
    </div>
  );
};
