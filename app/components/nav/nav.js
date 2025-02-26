'use client';

import React, { useState } from 'react' ;
import { FiMenu } from "react-icons/fi";
import styles from './nav.module.css'

export default function Nav() {
  // Navigation menu state
  let [openMenu, closedMenu] = useState(false);

  // Toggle menu state
  const toggleMenu = () => {
    closedMenu(!openMenu);
    };
    
  
  return (
    <>
      <div>
        <FiMenu className={styles.menuBtn} onClick={toggleMenu} />
      </div>
      <nav className={`${styles.menuList} ${openMenu ? styles.open : ''}`}>
        <ul>
          <li><a href='#'>Etulaita</a></li>
          {/* ADDITIONAL LINKS  
          <li><a href='#'>/a></li>
          <li><a href='#'></a></li> */}
        </ul>
      </nav>
    </>
  );
}
