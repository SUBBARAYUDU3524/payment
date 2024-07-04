import React from 'react';

const ProfileCard = ({ imgSrc }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <img src={imgSrc} alt="Profile" className="rounded-lg" />
    </div>
  );
};

export default ProfileCard;
