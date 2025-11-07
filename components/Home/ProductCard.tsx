import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  imageSrc: string;
  title: string;
  link: string;
}

function ProductCard({ imageSrc, title, link }: ProductCardProps) {
  return (
    <div className="card relative lg:w-[350px] w-[350px] lg:h-[205px] h-[205px] bg-(--white-dark) rounded-lg">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/3 lg:h-10 h-8 bg-black/30 blur-lg rounded-full"></div>
        <img src={imageSrc} alt={title} className=' absolute -top-1/3 z-10 left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 ' width={120} height={207} />
      <div className="text absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center">
        <p className='uppercase font-semibold tracking-wide'>{title}</p>
        <div className="mt-4 flex items-center justify-center uppercase text-black/50 hover:text-(--orange-dark) text-sm  cursor-pointer gap-2">
          <p className='font-semibold '>Shop</p>
          <Image src="/assets/shared/desktop/icon-arrow-right.svg" alt="Arrow Right" width={10} height={12} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
