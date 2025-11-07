"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { useQuery } from "convex/react"; // Import useQuery
import { api } from "../../convex/_generated/api"; // Import api
import { Skeleton } from 'antd';

function HeadphonesProducts() {
  const products = useQuery(api.products.getAll); // Fetch all products

  // Filter for headphones
  const headphones = products?.filter(product => product.category === "headphones");

  if (!headphones) {
    return (
      <div className='bg-(--white-light) lg:py-[150px] py-[100px] lg:px-[100px] md:px-[50px] px-[25px] animate-pulse'>
        <div className="mx-auto max-w-[1110px]">
          <div className="mx-auto lg:max-w-[1110px] flex flex-col gap-20 ">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-auto md:h-fit items-start md:items-center gap-10 lg:gap-30`}
              >
                <Skeleton.Image active className="rounded-lg w-full h-[300px] lg:w-1/2" />
                <div className="text flex flex-col gap-6 justify-center md:justify-start w-full lg:w-1/2 text-center lg:text-left px-5">
                  <Skeleton active paragraph={{ rows: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const desiredOrder = ["xx99-mark-two-headphones", "xx99-mark-one-headphones", "xx59-headphones"];

  const sortedHeadphones = headphones.sort((a, b) => {
    return desiredOrder.indexOf(a.slug) - desiredOrder.indexOf(b.slug);
  });

  return (
    <div className='bg-(--white-light) lg:py-[150px] py-[100px] lg:px-[100px] md:px-[50px] px-[25px]'>
      <div className="mx-auto max-w-[1110px]">
        <div className="mx-auto lg:max-w-[1110px] flex flex-col gap-20 ">
          {sortedHeadphones.map((product, index) => (
            <div
              key={product.slug}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-auto md:h-fit items-start md:items-center gap-10 lg:gap-30`}
            >
              <picture className='rounded-lg'>
                <source media="(min-width: 1024px)" srcSet={product.categoryImage.desktop} />
                <source media="(min-width: 768px)" srcSet={product.categoryImage.tablet} />
                <img src={product.categoryImage.mobile} alt={product.name} className='rounded-lg' />
              </picture>
              <div className="text flex flex-col gap-6 justify-center md:justify-start w-full lg:w-1/2 text-center lg:text-left px-5">
                {product.new && <h4 className='text-sm uppercase tracking-[10px] text-(--orange-dark) text-center lg:text-left'>New product</h4>}
                <h1 className='text-3xl xs:text-4xl  md:text-5xl xl:text-6xl font-semibold uppercase'>{product.name}</h1>
                <p className='text-base mx-auto md:mx-auto lg:mx-0 w-full tracking-wide '>{product.description}</p>
                <Link href={`/headphones/${product.slug}`}>
                  <p className='p-2 px-4 mx-auto md:mx-auto lg:mx-0 uppercase bg-(--orange-dark) hover:bg-(--orange-light) cursor-pointer w-fit text-base'>See product</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HeadphonesProducts;