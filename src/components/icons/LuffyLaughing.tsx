import React from 'react';
import luffyLaughingImg from '../../assets/images/luffy-laughing.png';

interface LuffyLaughingProps {
  className?: string;
}

export const LuffyLaughing: React.FC<LuffyLaughingProps> = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={luffyLaughingImg}
        alt="Gear 5 Luffy Laughing"
        className="w-full h-full object-contain filter contrast-125 mix-blend-multiply"
      />
    </div>
  );
};