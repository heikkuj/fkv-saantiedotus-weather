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
          <li><a href='#'>Kaks</a></li>
          <li><a href='#'>Kolme</a></li>
          <li><a href='#'>Nelje</a></li>
        </ul>
      </nav>
    </>
  );
}
