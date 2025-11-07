"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCards from '@/components/ProductCards';
import About from '@/components/Home/About';
import Footer from '@/components/Footer';
import QuantitySelector from '@/components/QuantitySelector';
import { Skeleton } from 'antd';
import { useCartStore } from '@/store/cartStore';
import CartModal from '@/components/CartModal';

interface ProductDetailClientProps {
  slug: string;
}

function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = useQuery(api.products.getProductBySlug, { slug: slug });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="w-full overflow-x-hidden bg-(--white-light)">
        <div className="bg-black lg:px-[100px] md:px-[50px] px-[25px]"><Navbar isProductPage={true} /></div>
        <div className="mx-auto max-w-[1110px] py-[100px] md:py-[35px] xl:px-0 lg:px-[100px] md:px-[50px] px-[25px] animate-pulse text-center">
          <Skeleton active paragraph={{ rows: 1 }} className="mb-[30px] mx-auto" />
          <div className="flex flex-col md:flex-row h-auto md:h-fit items-start md:items-center gap-10 lg:gap-30">
            <Skeleton.Image active className="rounded-lg w-full md:w-1/2 h-[300px] mx-auto" />
            <div className="text flex flex-col gap-6 justify-center md:justify-start w-full md:w-1/2 text-center md:text-left px-5">
              <Skeleton active paragraph={{ rows: 4 }} className="mx-auto" />
            </div>
          </div>
          <div className="mt-20 flex flex-col lg:flex-row gap-20">
            <div className="flex flex-col gap-10 lg:w-2/3">
              <Skeleton active paragraph={{ rows: 5 }} className="mx-auto" />
            </div>
            <div className="flex flex-col gap-10 lg:w-1/3">
              <Skeleton active paragraph={{ rows: 5 }} className="mx-auto" />
            </div>
          </div>
          <div className="my-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:h-[592px]">
            <div className="flex flex-col gap-5 h-full">
              <Skeleton.Image active className="rounded-lg h-full mx-auto" />
              <Skeleton.Image active className="rounded-lg h-full mx-auto" />
            </div>
            <div className="md:col-span-1 lg:col-span-2 h-full">
              <Skeleton.Image active className="rounded-lg h-full w-full mx-auto" />
            </div>
          </div>
          <div className="text-center mt-20 lg:mt-30 xl:mt-50">
            <Skeleton active paragraph={{ rows: 1 }} className="mb-10 mx-auto" />
            <div className="flex flex-col md:flex-row gap-5 justify-center">
              <div className="flex flex-col items-center gap-5">
                <Skeleton.Image active className="rounded-lg w-full max-w-[350px] h-[150px] mx-auto" />
                <Skeleton active paragraph={{ rows: 2 }} className="mx-auto" />
              </div>
              <div className="flex flex-col items-center gap-5">
                <Skeleton.Image active className="rounded-lg w-full max-w-[350px] h-[150px] mx-auto" />
                <Skeleton active paragraph={{ rows: 2 }} className="mx-auto" />
              </div>
              <div className="flex flex-col items-center gap-5">
                <Skeleton.Image active className="rounded-lg w-full max-w-[350px] h-[150px] mx-auto" />
                <Skeleton active paragraph={{ rows: 2 }} className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
        <ProductCards />
        <About />
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden bg-(--white-light) ">
      <div className="bg-black lg:px-[100px] md:px-[50px] px-[25px]"><Navbar isProductPage={true} /></div>

      <div className="mx-auto max-w-[1110px] py-[35px] xl:py-[50px] xl:px-0 lg:px-[100px] md:px-[50px] px-[25px] ">
        <Link href="/speakers">
          <p className='text-black/50 mb-[30px] cursor-pointer hover:text-(--orange-dark)'>Go Back</p>
        </Link>
        <div className="flex flex-col md:flex-row h-auto md:h-fit items-start md:items-center gap-10 lg:gap-30">
          <picture className='rounded-lg w-full '>
            <source media="(min-width: 1024px)" srcSet={`/assets/product-${slug}/desktop/image-product.jpg`} />
            <source media="(min-width: 768px)" srcSet={`/assets/product-${slug}/tablet/image-product.jpg`} />
            <img src={`/assets/product-${slug}/mobile/image-product.jpg`} alt={product.name} className='rounded-lg w-full' />
          </picture>
          <div className="text flex flex-col gap-6 justify-center md:justify-start w-full  text-center md:text-left px-5">
            {product.new && <h4 className='text-sm uppercase tracking-[10px] text-(--orange-dark) text-center md:text-left'>New product</h4>}
            <h1 className='text-3xl xs:text-4xl  md:text-5xl xl:text-6xl font-semibold uppercase'>{product.name}</h1>
            <p className='text-base mx-auto md:mx-auto lg:mx-0  tracking-wide '>{product.description}</p>
            <p className='text-lg font-bold'>$ {product.price.toLocaleString()}</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
              <p
                className='p-2 px-4 flex items-center uppercase bg-(--orange-dark) hover:bg-(--orange-light) cursor-pointer w-fit text-base text-white'
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity, // Use the quantity from state
                    image: `/assets/cart/image-${product.slug}.jpg`, // Using hardcoded cart image path
                  });
                  setIsCartModalOpen(true);
                }}
              >
                add to cart
              </p>
            </div>
          </div>
        </div>
        <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
        <div className="mt-20 flex flex-col lg:flex-row gap-20 ">
          <div className="flex flex-col gap-10 lg:w-2/3">
            <h2 className="text-3xl font-semibold uppercase">Features</h2>
            <p className="text-base whitespace-pre-line">{product.features}</p>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-col md:w-full gap-10 lg:w-1/3">
            <h2 className="text-3xl font-semibold uppercase md:w-1/2 ">In the box</h2>
            <ul>
              {product.includes.map((item, index) => (
                <li key={index} className="flex gap-6">
                  <span className="text-(--orange-dark) font-bold">{item.quantity}x</span>
                  <span>{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="my-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:h-[592px]">
          <div className="flex flex-col gap-5 h-full">
            <img src={`/assets/product-${slug}/mobile/image-gallery-1.jpg`} alt={`${product.name} gallery 1`} className="rounded-lg h-full object-cover" />
            <img src={`/assets/product-${slug}/mobile/image-gallery-2.jpg`} alt={`${product.name} gallery 2`} className="rounded-lg h-full object-cover" />
          </div>
          <div className="md:col-span-1 lg:col-span-2 h-full">
            <img src={`/assets/product-${slug}/mobile/image-gallery-3.jpg`} alt={`${product.name} gallery 3`} className="rounded-lg h-full w-full object-cover" />
          </div>
        </div>
        <div className="text-center mt-30 lg:mt-50 xl:mt-80">
          <h2 className="text-3xl font-semibold uppercase mb-10">You may also like</h2>
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            {product.others.map((otherProduct) => (
              <div key={otherProduct.slug} className="flex flex-col items-center">
                <picture className='rounded-lg w-full max-w-[350px]'>
                  <source media="(min-width: 1024px)" srcSet={`/assets/shared/desktop/image-${otherProduct.slug}.jpg`} />
                  <source media="(min-width: 768px)" srcSet={`/assets/shared/tablet/image-${otherProduct.slug}.jpg`} />
                  <img src={`/assets/shared/mobile/image-${otherProduct.slug}.jpg`} alt={otherProduct.name} className='rounded-lg w-full' />
                </picture>
                <h3 className="text-xl font-bold mt-5">{otherProduct.name}</h3>
                <Link href={`/${otherProduct.slug.includes('speaker') ? 'speakers' : otherProduct.slug.includes('earphones') ? 'earphones' : 'headphones'}/${otherProduct.slug}`}>
                  <p className='p-2 px-4 mt-5 uppercase bg-(--orange-dark) hover:bg-(--orange-light) cursor-pointer w-fit text-base text-white'>See product</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductCards />
      <About />
      <Footer />
    </div>
  );
}

export default ProductDetailClient;