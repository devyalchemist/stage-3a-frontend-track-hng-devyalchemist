"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function HomeProducts() {
  const products = useQuery(api.products.getAll);

  if (!products) {
    return <div>Loading featured products...</div>;
  }

  const zx9Speaker = products.find(product => product.slug === "zx9-speaker");
  const zx7Speaker = products.find(product => product.slug === "zx7-speaker");
  const yx1Earphones = products.find(product => product.slug === "yx1-earphones");

  return (
    <div className='bg-(--white-light) lg:pb-[150px] pb-[100px] lg:px-[100px] md:px-[50px] px-[25px]'>
      <div className="mx-auto max-w-[1110px]">
        <div className="flex flex-col gap-10">
          {zx9Speaker && (
            <div className="lg:h-[560px] h-[600px] bg-(--orange-dark) flex flex-col relative overflow-hidden rounded-lg items-center md:gap-y-[30px]">
              <img src="/assets/home/desktop/pattern-circles.svg" alt="Pattern Circles" className="absolute top-0 -left-1/8" />
              <div className="flex-start w-full flex justify-center">
              <img src="/assets/home/desktop/image-speaker-zx9.svg" alt={zx9Speaker.name} className="absolute w-[170px] md:w-[250px] lg:w-[400px] top-10 lg:top-auto lg:bottom-0 left-1/2 -translate-x-1/2 lg:left-[5%] xl:left-1/10 lg:translate-x-0" />
              </div>
              <div className="text absolute w-full text-white text-center top-auto bottom-1/10 md:bottom-1/20 lg:bottom-auto left-1/2 -translate-x-1/2 lg:translate-x-0 lg:top-1/2 lg:-right-1/10 lg:-translate-y-1/2 lg:w-1/2 lg:text-left flex flex-col gap-6 justify-end lg:pl-[50px]">
                <h1 className='text-4xl lg:text-6xl font-semibold uppercase'>{zx9Speaker.name}</h1>
                <p className='text-sm lg:text-base w-full md:w-2/3 px-5 md:px-0 mx-auto lg:mx-0 tracking-wide text-(--white-light)'>{zx9Speaker.description}</p>
                <Link href={`/speakers/${zx9Speaker.slug}`}>
                  <p className='p-3 px-6 uppercase bg-black hover:bg-[#4c4c4c] cursor-pointer w-fit text-sm mx-auto lg:mx-0'>See product</p>
                </Link>
              </div>
            </div>
          )}

          {zx7Speaker && (
            <div className="speaker h-80 bg-no-repeat bg-cover bg-center rounded-lg flex items-center" style={{ backgroundImage: `url(/assets/home/desktop/image-speaker-zx7.jpg)` }}>
              <div className="text flex flex-col gap-6 items-start px-10 md:px-15 lg:px-30">
                <p className='text-2xl font-semibold uppercase tracking-[2px]'>{zx7Speaker.name}</p>
                <Link href={`/speakers/${zx7Speaker.slug}`}>
                  <p className='p-3 px-6 uppercase border border-black hover:bg-black hover:text-white cursor-pointer w-fit text-sm'>See product</p>
                </Link>
              </div>
            </div>
          )}

          {yx1Earphones && (
            <div className="h-80 flex flex-col md:flex-row lg:gap-8 gap-4">
              <picture className="w-full md:w-1/2 h-[200px] md:h-auto">
                <source media="(min-width: 1024px)" srcSet="/assets/home/desktop/image-earphones-yx1.jpg" />
                <source media="(min-width: 768px)" srcSet="/assets/home/desktop/image-earphones-yx1.jpg" />
                <img src="/assets/home/desktop/image-earphones-yx1.jpg" alt={yx1Earphones.name} className="rounded-lg w-full h-full object-cover" />
              </picture>
              <div className="w-full md:w-1/2 lg:px-30 px-15 rounded-lg bg-(--white-dark) flex flex-col gap-6 items-start justify-center min-h-[200px]">
                <p className='text-2xl font-semibold uppercase tracking-[2px]'>{yx1Earphones.name}</p>
                <Link href={`/earphones/${yx1Earphones.slug}`}>
                  <p className='p-3 px-6 uppercase border border-black hover:bg-black hover:text-white cursor-pointer w-fit text-sm'>See product</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeProducts;