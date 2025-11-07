"use server";

import nodemailer from "nodemailer";

interface SendOrderEmailParams {
	to: string;
	name: string;
	orderId: string;
	items: { name: string; quantity: number; price: number }[];
	totals: {
		subtotal: number;
		shipping: number;
		vat: number;
		grandTotal: number;
	};
	baseUrl: string;
}

export async function sendOrderConfirmationEmail({
	to,
	name,
	orderId,
	items,
	totals,
	baseUrl,
}: SendOrderEmailParams) {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com", // or "smtp.zoho.com"
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false, // ✅ this line ignores the self-signed error
		},
		logger: true,
		debug: true,
	});

	const itemsHtml = items
		.map(
			(item) => `
      <tr>
        <td style="padding: 8px 0;">${item.name}</td>
        <td style="text-align:center;">${item.quantity}</td>
        <td style="text-align:right;">$${item.price.toLocaleString()}</td>
      </tr>`
		)
		.join("");

	const html = `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f6f7f9; padding: 40px;">
    <table style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.05);">
      <tr>
        <td style="background:#111; color:white; padding:20px 30px; text-align:center;">
          <h1 style="margin:0; font-size:24px; letter-spacing:1px;">Audiophile</h1>
          <p style="margin:4px 0 0; font-size:14px; color:#ccc;">Premium Sound Delivered</p>
        </td>
      </tr>

      <tr>
        <td style="padding:30px;">
          <h2 style="color:#222;">Thank you for your order, ${name}!</h2>
          <p style="color:#444; font-size:15px; line-height:1.6;">
            We’re processing your order <b>#${orderId}</b>. You’ll receive another email once it ships.
          </p>

          <table style="width:100%; margin-top:24px; border-collapse:collapse; font-size:15px;">
            <thead>
              <tr style="background:#fafafa;">
                <th align="left" style="padding:8px 0;">Item</th>
                <th align="center">Qty</th>
                <th align="right">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <hr style="margin:24px 0; border:0; border-top:1px solid #eee;" />

          <table style="width:100%; font-size:15px;">
            <tr>
              <td>Subtotal</td>
              <td style="text-align:right;">$${totals.subtotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td style="text-align:right;">$${totals.shipping.toLocaleString()}</td>
            </tr>
            <tr>
              <td>VAT</td>
              <td style="text-align:right;">$${totals.vat.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding-top:10px; font-weight:bold; font-size:16px;">Grand Total</td>
              <td style="text-align:right; color:#d87d4a; padding-top:10px; font-weight:bold; font-size:16px;">
                $${totals.grandTotal.toLocaleString()}
              </td>
            </tr>
          </table>

          <div style="margin-top:32px; text-align:center;">
            <a href="${baseUrl}/orders/${orderId}"
               style="background:#d87d4a; color:white; padding:12px 20px; border-radius:8px; text-decoration:none; display:inline-block; font-weight:500;">
              View Your Order
            </a>
          </div>

          <p style="margin-top:40px; color:#777; font-size:13px; line-height:1.6; text-align:center;">
            If you have any questions, reply to this email or visit our
            <a href="${baseUrl}/support" style="color:#d87d4a; text-decoration:none;">Support Center</a>.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#111; color:white; text-align:center; padding:16px; font-size:13px;">
          &copy; ${new Date().getFullYear()} Audiophile Inc. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;

	await transporter.sendMail({
		from: `"Audiophile Store" <${process.env.EMAIL_USER}>`,
		to,
		subject: `Your Audiophile Order Confirmation (#${orderId})`,
		html,
	});
}
