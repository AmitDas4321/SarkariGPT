import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123F78] min-h-[86px] py-3 sm:py-2.5 px-3 text-white flex flex-col items-center justify-center gap-2.5 select-none w-full">
      <p className="text-[10px] sm:text-[11px] opacity-85 text-center leading-normal px-2 max-w-[900px]">
        © {new Date().getFullYear()} Bharatiya AI Seva | NIC | MeitY | Best viewed in 1024x768 | Disclaimer | Privacy Policy
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 pt-0.5">
        <img
          src="/assets/images/Digital_India_logo.png"
          alt="Digital India"
          className="h-7 sm:h-9 md:h-10 w-auto object-contain drop-shadow-xs max-w-[120px]"
        />
        <img
          src="/assets/images/meity.png"
          alt="MeitY"
          className="h-7 sm:h-9 md:h-10 w-auto object-contain drop-shadow-xs max-w-[120px]"
        />
        <img
          src="/assets/images/Mygov.png"
          alt="myGov"
          className="h-7 sm:h-9 md:h-10 w-auto object-contain drop-shadow-xs max-w-[120px]"
        />
      </div>
    </footer>
  );
};
