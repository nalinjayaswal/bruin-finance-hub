/**
 * POST /api/oauth/google/disconnect
 * Disconnects Google account and revokes tokens
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revokeToken } from "@/lib/google-oauth";
import { logger } from "@/lib/logger";

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get stored token
    const { data: tokenData } = await supabase
      .from("oauth_tokens")
      .select("access_token")
      .eq("user_id", user.id)
      .eq("provider", "google")
      .single();

    // Revoke token with Google
    if (tokenData?.access_token) {
      try {
        await revokeToken(tokenData.access_token);
      } catch (error) {
        logger.warn("Failed to revoke token with Google:", error);
        // Continue anyway to delete from our DB
      }
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("oauth_tokens")
      .delete()
      .eq("user_id", user.id)
      .eq("provider", "google");

    if (deleteError) {
      logger.error("Failed to delete OAuth tokens:", deleteError);
      return NextResponse.json(
        { error: "Failed to disconnect" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Error disconnecting Google:", error);
    return NextResponse.json(
      { error: "Failed to disconnect" },
      { status: 500 }
    );
  }
}


