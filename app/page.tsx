'use client'

import React from 'react'
import Search from './components/search'
import Title from './components/title'

export default function Home() {
  return (
    <div className='flex justify-center items-center flex-col overflow-hidden'>
      <Title />
      <div className='!m-[20px]'></div>
      <Search  />
    </div>
  )
}