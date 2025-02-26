import React from 'react'
import styles from './search.module.css'
import { FaSearchLocation } from "react-icons/fa";

export default function Search() {
  return (
    <>
    <div className={styles.container}>

        <input type='text' placeholder='Kohta' className={styles.searchField}>
        </input>
        <a href='#'>
          <FaSearchLocation className={styles.icon} />
          </a>
    </div>
    </>
  )
}
