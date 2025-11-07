import React from 'react'
import Image from 'next/image';
import { FaFacebookSquare, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <div className="bg-(--black-light) text-white lg:px-[100px] md:px-[50px] px-[25px]">
            <div className="h-[5px] w-[100px] bg-(--orange-dark)"></div>
            <div className="mx-auto py-20 md:py-[50px] max-w-[1110px] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="logo md:col-span-1 mx-auto md:mx-0">
                    <Image src="/assets/logo.svg" alt="Audiophile Logo" width={143} height={25} />
                </div>
                <ul className="nav flex flex-col md:flex-row items-center md:justify-end md:col-span-1 space-y-4 md:space-y-0 md:space-x-8 uppercase tracking-widest text-sm">
                    <li><a href="/" className="hover:text-(--orange-dark)">Home</a></li>
                    <li><a href="/headphones" className="hover:text-(--orange-dark)">Headphones</a></li>
                    <li><a href="/speakers" className="hover:text-(--orange-dark)">Speakers</a></li>
                    <li><a href="/earphones" className="hover:text-(--orange-dark)">Earphones</a></li>
                </ul>
                <p className='about text-white/50 md:col-span-2 lg:w-1/2 text-center md:text-left'>Audiophile is an all in one stop to fulfil your audio needs. We are a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.</p>
                <p className='copyright text-white/50 md:col-span-1 text-center md:text-left'>Copyright 2021. All rights reserved</p>
                <div className="social icons flex gap-4 justify-center md:justify-end md:col-span-1">
                    <FaFacebookSquare className="text-white hover:text-(--orange-dark) cursor-pointer text-2xl" />
                    <FaTwitter className="text-white hover:text-(--orange-dark) cursor-pointer text-2xl" />
                    <FaInstagram className="text-white hover:text-(--orange-dark) cursor-pointer text-2xl" />
                </div>
            </div>
        </div>
    )
}

export default Footer