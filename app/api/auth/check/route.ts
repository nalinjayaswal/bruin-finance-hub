/**
 * GET /api/auth/check
 * Debug endpoint to check authentication status
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({
        authenticated: false,
        error: error.message,
      });
    }

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        message: "No user session found",
      });
    }

    // Get profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("organization_id, full_name, role")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        profile,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        authenticated: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


