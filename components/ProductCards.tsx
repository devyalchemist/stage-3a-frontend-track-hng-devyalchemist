"use client";
import React from 'react';
import ProductCard from "@/components/Home/ProductCard";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function ProductCards() {
  const products = useQuery(api.products.getAll);

  if (!products) {
    return <div>Loading categories...</div>;
  }

  const desiredOrder = ["headphones", "speakers", "earphones"];

  const categories = desiredOrder.map(categoryName => {
    let imageSrc = "";
    // Assign image based on category
    if(categoryName === "earphones") {
      imageSrc = "/assets/home/desktop/image-earphones.svg";
    }  else if (categoryName === "speakers") {
      imageSrc = "/assets/home/desktop/image-speaker-zx9.png";
    } else if (categoryName === "headphones") {
      imageSrc = "/assets/home/desktop/image-headphones.svg";
    }
    return {
      imageSrc,
      title: categoryName,
      link: `/${categoryName}`,
    };
  });

  return (
    <div className='bg-(--white-light) lg:py-[150px] py-[100px] lg:px-[100px] px-[50px] '>
      <div className="mx-auto max-w-[1110px]">
        <div className=" flex flex-col md:flex-row justify-between gap-[100px] md:gap-4 items-center">
          {categories.map((categoryData) => (
            <ProductCard
              key={categoryData.title}
              imageSrc={categoryData.imageSrc}
              title={categoryData.title}
              link={categoryData.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCards;