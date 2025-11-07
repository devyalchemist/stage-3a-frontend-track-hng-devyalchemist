"use client";
import Footer from '@/components/Footer';
import SpeakersHeader from '@/components/Speakers/SpeakersHeader';
import SpeakersProducts from '@/components/Speakers/SpeakersProducts';
import About from '@/components/Home/About';
import ProductCards from '@/components/ProductCards';
import React from 'react'

function SpeakersPage() {
  return (
    <div className="w-full overflow-x-hidden">
        <SpeakersHeader />
        <SpeakersProducts />
        <ProductCards />
        <About />
        <Footer />
    </div>
  )
}

export default SpeakersPage