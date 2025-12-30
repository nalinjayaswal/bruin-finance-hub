/**
 * POST /api/oauth/google
 * Initiates Google OAuth flow
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getGoogleAuthUrl, type GoogleOAuthState } from "@/lib/google-oauth";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      logger.warn("OAuth initiation: No user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's organization
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (profileError) {
      logger.error("OAuth initiation: Profile fetch error:", profileError);
      return NextResponse.json(
        { error: `Profile error: ${profileError.message}` },
        { status: 500 }
      );
    }

    if (!profile?.organization_id) {
      logger.error("OAuth initiation: No organization found for user:", user.id);
      return NextResponse.json(
        { error: "Organization not found. Please contact support." },
        { status: 404 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { includeGmail = true, includeDrive = true, returnTo } = body;

    // Check if Google OAuth is configured
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      logger.error("OAuth initiation: Google OAuth credentials not configured");
      return NextResponse.json(
        { error: "Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables." },
        { status: 500 }
      );
    }

    const state: GoogleOAuthState = {
      userId: user.id,
      organizationId: profile.organization_id,
      returnTo,
    };

    const authUrl = getGoogleAuthUrl(state, includeGmail, includeDrive);

    logger.info("OAuth initiation successful for user:", user.id);
    return NextResponse.json({ authUrl });
  } catch (error) {
    logger.error("Error initiating Google OAuth:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to initiate OAuth flow" },
      { status: 500 }
    );
  }
}

