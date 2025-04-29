import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className='bg-slate-50 flex justify-center items-center gap-3'>
        <h2 className='text-xl md:text-3xl font-bold'>Local Task Planner</h2>
        <img src={logo} alt="" className='w-[44px] md:w-[64px] aspect-square' />
    </header>
  )
}

export default Header