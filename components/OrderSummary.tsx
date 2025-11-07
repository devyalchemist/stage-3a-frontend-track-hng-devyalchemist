import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Button } from 'antd';

interface OrderSummaryProps {
  onFormSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onFormSubmit }) => {
  const { items, totalAmount } = useCartStore();

  const shippingCost = 50; // Fixed shipping cost
  const vatRate = 0.20; // 20% VAT
  const subtotal = totalAmount;
  const vat = subtotal * vatRate;
  const grandTotal = subtotal + shippingCost + vat;

  return (
    <div className="bg-white rounded-lg p-6 md:p-8 xl:p-10">
      <h2 className="text-xl uppercase font-semibold mb-4">Summary</h2>
      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-lg" />
              <div>
                <p className="font-bold text-sm">{item.name}</p>
                <p className="text-black/50 text-sm">$ {item.price.toLocaleString()}</p>
              </div>
            </div>
            <span className="text-black/50">x{item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <p className="text-black/50 uppercase">Total</p>
          <p className="text-lg font-bold">$ {totalAmount.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-black/50 uppercase">Shipping</p>
          <p className="text-lg font-bold">$ 50</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-black/50 uppercase">VAT (Included)</p>
          <p className="text-lg font-bold">$ {(totalAmount * 0.20).toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-black/50 uppercase">Grand Total</p>
          <p className="text-lg font-bold text-[#D87D4A]">$ {(grandTotal).toLocaleString()}</p>
        </div>
      </div>
      <Button type="primary" size="large" onClick={() => {
        console.log('OrderSummary Continue button clicked!');
        onFormSubmit();
      }} className="w-full modal-btn uppercase! text-xs! tracking-[2px]!">
        Continue
      </Button>
    </div>
  );
};

export default OrderSummary;
