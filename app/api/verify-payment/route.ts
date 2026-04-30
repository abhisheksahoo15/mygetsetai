import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

type VerifyPaymentBody = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  courseSlug?: string;
  courseTitle?: string;
  amount?: number;
};

function isValidSignature(body: VerifyPaymentBody, secret: string) {
  if (!body.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
    return false;
  }

  const msg = `${body.razorpay_order_id}|${body.razorpay_payment_id}`;
  const generated = crypto.createHmac("sha256", secret).update(msg).digest("hex");

  return generated === body.razorpay_signature;
}

export async function POST(req: Request) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return Response.json(
        { success: false, error: "Payment verification not configured" },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => null)) as VerifyPaymentBody | null;

    if (!body || !isValidSignature(body, secret)) {
      return Response.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey) {
      const supabase = createClient(supabaseUrl, serviceRoleKey);
      const authHeader = req.headers.get("Authorization");
      const token = authHeader?.replace("Bearer ", "");

      if (token) {
        const { data } = await supabase.auth.getUser(token);

        if (data.user) {
          const { error: purchaseError } = await supabase.from("purchases").insert({
            user_id: data.user.id,
            order_id: body.razorpay_order_id,
            course_slug: body.courseSlug || "unknown",
            course_title: body.courseTitle || null,
            amount: body.amount || null,
            payment_id: body.razorpay_payment_id,
            signature: body.razorpay_signature,
          });

          if (purchaseError) {
            console.warn("Purchase save skipped:", purchaseError.message);
          }
        }
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Verify payment error:", error);
    return Response.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
