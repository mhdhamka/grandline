import React from 'react';
import luffyPointingImg from '../../assets/images/luffy-running.png';

interface LuffyPointingProps {
  className?: string;
}

export const LuffyPointing: React.FC<LuffyPointingProps> = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={luffyPointingImg}
        alt="Gear 5 Luffy Eyeball Pop"
        className="w-full h-full object-contain filter contrast-125 mix-blend-multiply"
      />
    </div>
  );
};