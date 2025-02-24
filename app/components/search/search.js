import React from 'react'
import styles from './search.module.css'

export default function Search() {
  return (
    <>
    <div className={styles.container}>
        <input type='text' placeholder='Kohta' className={styles.searchField}></input>
        <button className={styles.button}>Haje</button>
    </div>
    </>
  )
}
