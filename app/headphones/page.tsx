"use client";
import Footer from '@/components/Footer';
import HeadphonesHeader from '@/components/Headphones/HeadphonesHeader';
import HeadphonesProducts from '@/components/Headphones/HeadphonesProducts';
import About from '@/components/Home/About';
import ProductCards from '@/components/ProductCards';
import React from 'react'

function HeadphonesPage() {
  return (
    <div className="w-full overflow-x-hidden">
        <HeadphonesHeader />
        <HeadphonesProducts />
        <ProductCards />
        <About />
        <Footer />
    </div>
  )
}

export default HeadphonesPage