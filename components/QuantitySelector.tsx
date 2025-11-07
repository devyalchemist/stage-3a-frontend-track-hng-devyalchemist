"use client";
import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  const decrease = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const increase = () => {
    onQuantityChange(Math.min(99, quantity + 1));
  };

  return (
    <div className="flex items-center gap-4  bg-(--white-dark) px-4 p-2 w-fit">
      <button
        onClick={decrease}
        className="text-gray-600 hover:text-black transition"
      >
        <FiMinus size={16} />
      </button>

      <span className="text-lg font-medium w-6 text-center">{quantity}</span>

      <button
        onClick={increase}
        className="text-gray-600 hover:text-black "
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
}

export default QuantitySelector;

