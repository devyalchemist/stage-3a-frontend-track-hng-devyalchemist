"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

interface OrderConfirmationModalProps {
	orderId: string;
	onClose: () => void;
}

interface LocalItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
	orderId,
	onClose,
}) => {
	const order = useQuery(
		api.orders.getOrderById,
		orderId ? { orderId: orderId as Id<"orders"> } : "skip"
	);

	const [localItems, setLocalItems] = useState<LocalItem[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem("lastOrderItems");
		if (stored) setLocalItems(JSON.parse(stored));
	}, []);

	return (
		<Modal
			open={true}
			onCancel={onClose}
			footer={null}
			width={540}
			className="order-modal">
			<div className="sm:p-8 p-4 px-2">
				{!order ? (
					<Skeleton active paragraph={{ rows: 4 }} />
				) : (
					<>
						<Image
							src="/assets/checkout/icon-order-confirmation.svg"
							alt="Order Confirmed"
							width={64}
							height={64}
							className="mb-6"
						/>
						<h1 className="text-4xl font-semibold mb-4">
							THANK YOU <br /> FOR YOUR ORDER
						</h1>
						<p className="text-black/50 mb-6 py-2">
							You will receive an email confirmation shortly.
						</p>

						<div className="w-full flex flex-col md:flex-row bg-[#F1F1F1] rounded-lg mb-6 overflow-hidden">
							{/* Left: Order items */}
							<div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
								<div className="flex flex-col gap-2 border-b border-gray-300 pb-4">
									{localItems.map((item) => (
										<div
											key={item.id}
											className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												<Image
													src={item.image}
													alt={item.name}
													width={48}
													height={48}
													className="rounded-lg"
												/>
												<div>
													<p className="font-bold text-sm">{item.name}</p>
													<p className="text-black/50 text-sm">
														$ {item.price.toLocaleString()}
													</p>
												</div>
											</div>
											<span className="text-black/50">x{item.quantity}</span>
										</div>
									))}
								</div>

								{/* View more */}
								<p className="text-center text-sm text-black/50 mt-3 cursor-pointer hover:text-black transition">
									View less
								</p>
							</div>

							{/* Right: Grand total */}
							<div className="w-full md:w-1/2 bg-black text-white/50 p-6 flex flex-col justify-end items-start rounded-b-lg md:rounded-b-none md:rounded-r-lg">
								<p className="text-sm uppercase tracking-widest">Grand Total</p>
								<p className="text-lg font-semibold text-white mt-1">
									$ {order.totals.grandTotal.toLocaleString()}
								</p>
							</div>
						</div>

						<Link href="/">
							<Button
								type="primary"
								size="large"
								onClick={onClose}
								className="modal-btn !bg-[#D87D4A] !hover:bg-[#FBAF85] !text-white !border-none w-full">
								BACK TO HOME
							</Button>
						</Link>
					</>
				)}
			</div>
		</Modal>
	);
};

export default OrderConfirmationModal;
