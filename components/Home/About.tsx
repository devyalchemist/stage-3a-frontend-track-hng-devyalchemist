import React from 'react'

function About() {
  return (
    <div className="bg-(--white-light) lg:px-[100px] md:px-[50px] px-[25px]">
        <div className="mx-auto max-w-[1110px]  flex flex-col-reverse lg:flex-row pb-[100px] lg:pb-[150px]">
             <div className="w-full md:w-full mt-10 md:mt-0 flex flex-col gap-6 items-center md:items-center justify-center text-center md:text-center lg:items-start lg:text-left">
               <h2 className='text-3xl md:text-4xl font-semibold uppercase tracking-[1px]'>
                Bringing you the <br /> <span className='text-(--orange-light)'>best</span> audio gear</h2>
              <p className='md:mr-0 md:px-10 lg:px-0 lg:mr-25 text-black/80'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers and audio accesories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products, Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portsble audio equipment.</p>
            </div>
             <picture className='rounded-lg w-full md:w-full mt-8 md:mt-0 md:mb-4'>
               <source media="(min-width: 1024px)" srcSet="/assets/man.png" />
               <source media="(min-width: 768px)" srcSet="/assets/shared/tablet/image-best-gear.jpg" />
               <img src="/assets/man.png" alt="Man with earphones" className='rounded-lg w-full h-full object-cover'/>
             </picture>
        </div>
    </div>
  )
}

export default About