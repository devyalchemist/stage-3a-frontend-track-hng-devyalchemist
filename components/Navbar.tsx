"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CartModal from '@/components/CartModal';
import { useCartStore } from '@/store/cartStore';

function Navbar({ isProductPage }: { isProductPage?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const totalItems = useCartStore((state) => state.totalItems);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="mx-auto max-w-[1110px] text-white py-6 border-b border-white/20 relative">
      <div className="flex items-center justify-between">
        {/* Hamburger Icon (Tablet only) */}
        <div className="lg:hidden cursor-pointer mr-[30px]" onClick={toggleMenu}>
          <Image src="/assets/hamburger.svg" alt="Menu" width={20} height={24} />
        </div>

        {/* Logo (Always visible) */}
        <div className="flex-1 cursor-pointer lg:flex-none">
          <Image src="/assets/logo.svg" alt="Audiophile Logo" width={143} height={25} />
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex flex-1 justify-center space-x-8 uppercase tracking-widest text-sm">
          <li><a href="/" className="hover:text-(--orange-dark)">Home</a></li>
          <li><a href="/headphones" className="hover:text-(--orange-dark)">Headphones</a></li>
          <li><a href="/speakers" className="hover:text-(--orange-dark)">Speakers</a></li>
          <li><a href="/earphones" className="hover:text-(--orange-dark)">Earphones</a></li>
        </ul>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <ul ref={menuRef} className={`lg:hidden flex flex-col absolute top-full left-0 w-full p-4 items-center gap-4 border-t border-white/20 ${isProductPage ? 'bg-black' : 'bg-transparent backdrop-blur-lg'}`}>
            <li className="uppercase tracking-widest text-sm w-full text-center"><a href="/" className="hover:text-(--orange-dark)">Home</a></li>
            <li className="uppercase tracking-widest text-sm w-full text-center"><a href="/headphones" className="hover:text-(--orange-dark)">Headphones</a></li>
            <li className="uppercase tracking-widest text-sm w-full text-center"><a href="#" className="hover:text-(--orange-dark)">Speakers</a></li>
            <li className="uppercase tracking-widest text-sm w-full text-center"><a href="#" className="hover:text-(--orange-dark)">Earphones</a></li>
          </ul>
        )}

        {/* Cart Icon (Always visible) */}
        <div className="flex-1 flex justify-end cursor-pointer lg:flex-none relative">
          <Image src="/assets/carts.svg" alt="Cart" width={24} height={24} onClick={() => setIsCartModalOpen(true)} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-(--orange-dark) text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </div>
      </div>
      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
    </nav>
  );
}

export default Navbar;
