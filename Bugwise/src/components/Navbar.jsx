import React from 'react'
import { Bug , Sun } from 'lucide-react';


const Navbar = () => {
  return (
    <>

    <div className="nav flex item-center justify-between px-[150px] h-[90px] bg-zinc-900"
    style={{padding :"20px 150px"}}>
    <div className="logo" flex item-center gap='[0px]'>
    <Bug size={40} color='#67e8f9' /></div>
    <span className='text-2xl font-bold text-white ml-0 mr-25'>Bugwise</span>

    <div className='icons flex items-center gap-[20px]'>
    <i className='cursor-pointer transition-all hover:text-[#67e8f9]'><Sun/></i>
    </div>
    </div>
   
    </>
  )
}

export default Navbar

