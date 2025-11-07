"use client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Hero from "@/components/Home/Hero";
import HomeProducts from "@/components/Home/HomeProducts";
import About from "@/components/Home/About";
import Footer from "@/components/Footer";
import ProductCards from "@/components/ProductCards";

export default function Home() {
	return (
		<div className="w-full overflow-x-hidden">
			<Hero />
			<ProductCards />
			<HomeProducts />
			<About />
			<Footer />
		</div>
	);
}
