"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutForm, { CheckoutFormRef } from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import OrderConfirmationModal from '@/components/OrderConfirmationModal'; // Will create this component

function CheckoutPage() {
    const router = useRouter();
    const checkoutFormRef = useRef<CheckoutFormRef>(null);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

    const handleOrderSuccess = (orderId: string) => {
      setConfirmedOrderId(orderId);
      setShowOrderConfirmation(true);
    };

  return (
    <div className="w-full overflow-x-hidden bg-(--white-light)">
     <div className="bg-black lg:px-[100px] md:px-[50px] px-[25px]"><Navbar isProductPage={true} /></div>
      <div className="mx-auto max-w-[1110px] py-[35px] xl:py-[50px] xl:px-0 lg:px-[100px] md:px-[50px] px-[25px]">
        <p onClick={() => router.back()} className='text-black/50 mb-[30px] cursor-pointer hover:text-[#D87D4A]'>Go Back</p>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <CheckoutForm ref={checkoutFormRef} onOrderSuccess={handleOrderSuccess} />
          </div>
          <div className="lg:w-1/3">
            <OrderSummary onFormSubmit={() => checkoutFormRef.current?.triggerSubmit()} />
          </div>
        </div>
      </div>
      <Footer />
      {showOrderConfirmation && confirmedOrderId && (
        <OrderConfirmationModal orderId={confirmedOrderId} onClose={() => setShowOrderConfirmation(false)} />
      )}
    </div>
  );
}

export default CheckoutPage;



