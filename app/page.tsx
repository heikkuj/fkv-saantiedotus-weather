'use client'

import React from 'react'
import Search from './components/search'
import Title from './components/title'

export default function Home() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <Title />
      <Search  />
    </div>
  )
}
