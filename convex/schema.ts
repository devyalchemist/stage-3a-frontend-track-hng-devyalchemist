
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    id: v.number(),
    slug: v.string(),
    name: v.string(),
    image: v.object({
      mobile: v.string(),
      tablet: v.string(),
      desktop: v.string(),
    }),
    category: v.string(),
    categoryImage: v.object({
      mobile: v.string(),
      tablet: v.string(),
      desktop: v.string(),
    }),
    new: v.boolean(),
    price: v.number(),
    description: v.string(),
    features: v.string(),
    includes: v.array(v.object({
      quantity: v.number(),
      item: v.string(),
    })),
    gallery: v.object({
      first: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
      second: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
      third: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
    }),
    others: v.array(v.object({
      slug: v.string(),
      name: v.string(),
      category: v.optional(v.string()),
      image: v.object({
        mobile: v.string(),
        tablet: v.string(),
        desktop: v.string(),
      }),
    })),
  }),

  orders: defineTable({
    customerDetails: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shippingDetails: v.object({
      address: v.string(),
      zip: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    paymentMethod: v.string(), // e.g., 'e-Money', 'Cash on Delivery'
    items: v.array(v.object({
      id: v.number(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    })),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(), // Assuming VAT is calculated as a percentage of subtotal
      grandTotal: v.number(),
    }),
    orderStatus: v.string(), // e.g., 'pending', 'completed', 'shipped'
    timestamp: v.number(), // Unix timestamp
  }),
});
