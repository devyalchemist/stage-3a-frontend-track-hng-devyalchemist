import React from 'react'
import Navbar from '../Navbar'

function SpeakersHeader() {
  return (
    <div className="header w-full h-[336px] bg-black lg:px-[100px] md:px-[50px] px-[25px]">
            <Navbar />
            <h1 className='text-center text-white uppercase text-4xl flex items-center justify-center h-2/3'>Speakers</h1>
        </div>
  )
}

export default SpeakersHeader