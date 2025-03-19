'use client';

import React, { useState } from 'react' ;
import { FiMenu } from "react-icons/fi";

export default function Nav() {
  // Navigation menu state
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    };
    
  
  return (
    <>
      <div>
        {/* Icon */}
        <FiMenu className='fixed flex !my-[10px] !mx-[15px] content-center items-center z-50 text-white text-[2em] lg:text-[2.5em] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.485)] cursor-pointer' onClick={toggleMenu} />
      </div>

      {/* Sidebar */}
      <nav className={`fixed w-[45vw] max-w-[300px] h-screen z-40 bg-glass backdrop-blur-xs shadow-[1px_1px_8px_rgba(42, 42, 42, 0.38)] transition-transform ease-in-out duration-700 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <ul className='!p-[70px] text-left list-none font-poppins text-white text-[1.3em]'>

            {/* Sidebar content */}
            {/* Front page */}
            {/* <li className='!py-[10px]'><a href='#'>Etulaita</a></li> */}
            
            {/* ADDITIONAL LINKS  
            <li><a href='#'>/a></li>
            <li><a href='#'></a></li> */}
        </ul>
        <div className='absolute !p-[10px] bottom-0 text-center'>
          <p className='text-white font-poppins text-[0.8em]'>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
          <p className='!my-[5px] text-white font-poppins text-[0.8em]'>Created by <a href="https://github.com/heikkuj" target='_blank'>Heikku J.</a></p>
        </div>
      </nav>
    </>
  );
}