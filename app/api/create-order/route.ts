import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";
import { courses } from "@/data/courses";

type CreateOrderBody = {
  slug?: string;
};

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!keyId || !keySecret) {
      return Response.json(
        { success: false, error: "Payment not configured" },
        { status: 500 }
      );
    }

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return Response.json(
        { success: false, error: "Please login first" },
        { status: 401 }
      );
    }

    if (supabaseUrl && serviceRoleKey) {
      const supabase = createClient(supabaseUrl, serviceRoleKey);
      const { data: userData, error: userError } = await supabase.auth.getUser(token);

      if (userError || !userData.user) {
        return Response.json(
          { success: false, error: "Invalid session" },
          { status: 401 }
        );
      }
    }

    const body = (await req.json().catch(() => ({}))) as CreateOrderBody;
    const course = courses.find((item) => item.slug === body.slug) ?? courses[0];
    const amountInPaise = Math.round(course.price * 100);

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `${course.slug}_${Date.now()}`,
    });

    return Response.json({
      success: true,
      key: keyId,
      order,
    });
  } catch (err: unknown) {
    console.error("Order creation failed:", err);
    return Response.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Order creation failed",
      },
      { status: 500 }
    );
  }
}
