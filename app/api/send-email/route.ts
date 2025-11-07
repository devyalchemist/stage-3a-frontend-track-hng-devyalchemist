import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/sendEmail";

export async function POST(request: Request) {
  try {
    const { to, name, orderId, items, totals, baseUrl } = await request.json();

    await sendOrderConfirmationEmail({
      to,
      name,
      orderId,
      items,
      totals,
      baseUrl: baseUrl || process.env.NEXT_PUBLIC_BASE_URL!,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
