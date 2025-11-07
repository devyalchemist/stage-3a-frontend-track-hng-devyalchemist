import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Radio, Button, Form as AntForm } from "antd";
import { useCartStore } from "@/store/cartStore";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	zip: string;
	city: string;
	country: string;
	paymentMethod: string;
}

// Define Yup schema for validation
const schema: yup.ObjectSchema<FormData> = yup.object({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Wrong format").required("Email is required"),
	phone: yup.string().required("Phone is required"),
	address: yup.string().required("Address is required"),
	zip: yup.string().required("ZIP Code is required"),
	city: yup.string().required("City is required"),
	country: yup.string().required("Country is required"),
	paymentMethod: yup.string().required("Payment Method is required"),
});

export interface CheckoutFormRef {
	triggerSubmit: () => void;
}

interface CheckoutFormProps {
	onOrderSuccess: (orderId: string) => void;
}

const CheckoutForm = forwardRef<CheckoutFormRef, CheckoutFormProps>(
	(props, ref) => {
		const { onOrderSuccess } = props;
		const { items, totalAmount, clearCart } = useCartStore();
		const createOrder = useMutation(api.orders.createOrder);
		const router = useRouter();

		const {
			handleSubmit,
			control,
			watch,
			formState: { errors },
		} = useForm<FormData>({
			resolver: yupResolver(schema),
			defaultValues: {
				name: "",
				email: "",
				phone: "",
				address: "",
				zip: "",
				city: "",
				country: "",
				paymentMethod: "Cash on Delivery", // Default to Cash on Delivery
			},
		});
		const onSubmit = async (data: FormData) => {
			console.log("onSubmit called with data:", data);
			const orderItems = items.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				image: item.image,
			}));

			const shippingCost = 50;
			const vatRate = 0.2;
			const subtotal = totalAmount;
			const vat = subtotal * vatRate;
			const grandTotal = subtotal + shippingCost + vat;

			try {
				const orderId = await createOrder({
					customerDetails: {
						name: data.name,
						email: data.email,
						phone: data.phone,
					},
					shippingDetails: {
						address: data.address,
						zip: data.zip,
						city: data.city,
						country: data.country,
					},
					paymentMethod: data.paymentMethod,
					items: orderItems,
					totals: {
						subtotal,
						shipping: shippingCost,
						vat,
						grandTotal,
					},
				});
				localStorage.setItem("lastOrderItems", JSON.stringify(orderItems));
				console.log("Order created successfully. orderId:", orderId);

				// ✅ Send email via Next.js route
				await fetch("/api/send-email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						to: data.email,
						name: data.name,
						orderId,
						items: orderItems,
						totals: { subtotal, shipping: shippingCost, vat, grandTotal },
						baseUrl: window.location.origin,
					}),
				});

				clearCart();
				onOrderSuccess(orderId);
			} catch (error) {
				console.error("Error creating order:", error);
			}
		};

		useImperativeHandle(ref, () => ({
			triggerSubmit: () =>
				handleSubmit(onSubmit, (errors) => {
					console.error("CheckoutForm validation errors:", errors);
				})(),
		}));

		const paymentMethod = watch("paymentMethod");

		return (
			<AntForm layout="vertical" className="bg-white form">
				<h1 className="text-4xl font-semibold tracking-wide uppercase mb-8">
					Checkout
				</h1>

				{/* Billing Details */}
				<h2 className="text-xl text-(--orange-dark) uppercase font-semibold mb-4">
					Billing Details
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 lg:gap-y-4 mb-8">
					<AntForm.Item
						label="Name"
						validateStatus={errors.name ? "error" : ""}
						help={errors.name?.message}>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="Alexei Ward" />
							)}
						/>
					</AntForm.Item>
					<AntForm.Item
						label="Email Address"
						validateStatus={errors.email ? "error" : ""}
						help={errors.email?.message}>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="alexei@mail.com" />
							)}
						/>
					</AntForm.Item>
					<AntForm.Item
						label="Phone Number"
						validateStatus={errors.phone ? "error" : ""}
						help={errors.phone?.message}>
						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="+1 202-555-0136" />
							)}
						/>
					</AntForm.Item>
				</div>

				{/* Shipping Info */}
				<h2 className="text-xl text-(--orange-dark) uppercase font-semibold mb-4">
					Shipping Info
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 lg:gap-y-4 mb-8">
					<AntForm.Item
						label="Address"
						validateStatus={errors.address ? "error" : ""}
						help={errors.address?.message}
						className="md:col-span-2">
						<Controller
							name="address"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="1137 Williams Avenue" />
							)}
						/>
					</AntForm.Item>

					<AntForm.Item
						label="ZIP Code"
						validateStatus={errors.zip ? "error" : ""}
						help={errors.zip?.message}>
						<Controller
							name="zip"
							control={control}
							render={({ field }) => <Input {...field} placeholder="10001" />}
						/>
					</AntForm.Item>

					<AntForm.Item
						label="City"
						validateStatus={errors.city ? "error" : ""}
						help={errors.city?.message}>
						<Controller
							name="city"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="New York" />
							)}
						/>
					</AntForm.Item>

					<AntForm.Item
						label="Country"
						validateStatus={errors.country ? "error" : ""}
						help={errors.country?.message}>
						<Controller
							name="country"
							control={control}
							render={({ field }) => (
								<Input {...field} placeholder="United States" />
							)}
						/>
					</AntForm.Item>
				</div>

				{/* Payment Details */}
				<h2 className="text-xl text-(--orange-dark) uppercase font-semibold mb-4">
					Payment Details
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 lg:gap-y-4 mb-8">
					<AntForm.Item
						validateStatus={errors.paymentMethod ? "error" : ""}
						help={errors.paymentMethod?.message}
						className="col-span-1 md:col-span-2 w-full">
						<Controller
							name="paymentMethod"
							control={control}
							render={({ field }) => (
								<div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
									<label className="text-md font-medium text-gray-700 flex self-start">
										Payment Method
									</label>

									<Radio.Group
										{...field}
										className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
										{[
											{ value: "E-Money", label: "E-Money" },
											{ value: "Cash on Delivery", label: "Cash on Delivery" },
										].map((option) => (
											<div
												key={option.value}
												onClick={() => field.onChange(option.value)} // make div clickable like a label
												className={`flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 mb-3 cursor-pointer hover:border-orange-500 transition-colors w-full ${
													field.value === option.value
														? "border-orange-500"
														: ""
												}`}>
												<span className="text-sm font-medium text-gray-700">
													{option.label}
												</span>
												<Radio
													value={option.value}
													checked={field.value === option.value}
													className="[&_.ant-radio-inner]:border-orange-500 [&_.ant-radio-checked_.ant-radio-inner]:bg-orange-500 [&_.ant-radio-checked_.ant-radio-inner]:border-orange-500"
												/>
											</div>
										))}
									</Radio.Group>
								</div>
							)}
						/>
					</AntForm.Item>
				</div>
			</AntForm>
		);
	}
);

export default CheckoutForm;
