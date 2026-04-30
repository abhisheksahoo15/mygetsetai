import { createClient } from "@supabase/supabase-js";

type SaveUserBody = {
  fullName?: string;
  phone?: string;
};

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return Response.json(
        { success: false, error: "Service not configured" },
        { status: 500 }
      );
    }

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return Response.json(
        { success: false, error: "Login required" },
        { status: 401 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data, error: userError } = await supabase.auth.getUser(token);

    if (userError || !data.user) {
      return Response.json(
        { success: false, error: "Invalid session" },
        { status: 401 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as SaveUserBody;
    const fullName = body.fullName || data.user.user_metadata?.full_name || null;
    const phone = body.phone || data.user.user_metadata?.phone || null;

    const { error: metadataError } = await supabase.auth.admin.updateUserById(data.user.id, {
      user_metadata: {
        ...data.user.user_metadata,
        full_name: fullName,
        phone,
      },
    });

    if (metadataError) {
      console.warn("Metadata update skipped:", metadataError.message);
    }

    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        phone,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (profileError) {
      console.warn("Profile save skipped:", profileError.message);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Save user error:", error);
    return Response.json(
      { success: false, error: "Profile save failed" },
      { status: 500 }
    );
  }
}
