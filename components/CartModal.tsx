import React from 'react';
import { Modal, Button } from 'antd';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import QuantitySelector from '@/components/QuantitySelector';
import { useRouter } from 'next/navigation';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, totalItems, totalAmount, removeItem, updateQuantity, clearCart } = useCartStore();
  const router = useRouter();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    onClose(); // Close the modal
    router.push('/checkout');
  };

  return (
    <Modal
      title={
        <div className="flex justify-between items-center py-4">
          <h2 className="text-lg font-semibold uppercase tracking-[2px]">Cart ({totalItems})</h2>
          <Button type="link" onClick={clearCart} className="modal-link">
            Remove All
          </Button>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={380}
      style={{ position: 'absolute', top: 50, right: 30, left: 'auto' }}
      className="left-1/2! -translate-x-1/2! md:left-auto! md:translate-x-0!"
    >
      <div className="flex flex-col gap-4 pb-4">
        {items.length === 0 ? (
          <p className="text-center text-black/50">Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-lg" />
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-black/50 text-sm">$ {item.price.toLocaleString()}</p>
                  </div>
                </div>
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                />
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <p className="text-black/50 uppercase">Total</p>
              <p className="text-lg font-bold">$ {totalAmount.toLocaleString()}</p>
            </div>
            <Button type="primary" size="large" onClick={handleCheckout} className="modal-btn uppercase! tracking-wider! w-full text-white">
              Checkout
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
