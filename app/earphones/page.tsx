"use client";
import Footer from '@/components/Footer';
import EarphonesHeader from '@/components/Earphones/EarphonesHeader';
import EarphonesProducts from '@/components/Earphones/EarphonesProducts';
import About from '@/components/Home/About';
import ProductCards from '@/components/ProductCards';
import React from 'react'

function EarphonesPage() {
  return (
    <div className="w-full overflow-x-hidden">
        <EarphonesHeader />
        <EarphonesProducts />
        <ProductCards />
        <About />
        <Footer />
    </div>
  )
}

export default EarphonesPage