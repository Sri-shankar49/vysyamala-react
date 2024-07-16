// src/Components/LoginHome/LoginHome.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileDetailsExpressInterest } from '../../Components/DashBoard/ProfileDetails/ProfileDetailsExpressInterest';
import { HandleLogin } from '../../Components/LoginHome/HandleLogin';
import { RootState } from '../../redux/store';

export const LoginHome: React.FC = () => {
  const showExpressInterest = useSelector((state: RootState) => state.interest.showExpressInterest);

  return (
    <div>
      {showExpressInterest ? (
        <ProfileDetailsExpressInterest />
      ) : (
        <HandleLogin />
      )}
    </div>
  );
};
