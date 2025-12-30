/**
 * GET /api/oauth/google/callback
 * Handles Google OAuth callback
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  exchangeCodeForTokens,
  type GoogleOAuthState,
} from "@/lib/google-oauth";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");
    const error = searchParams.get("error");

    // Handle user denial
    if (error) {
      logger.warn("Google OAuth error:", error);
      return NextResponse.redirect(
        new URL(
          `/dashboard?error=${encodeURIComponent("OAuth cancelled")}`,
          request.url
        )
      );
    }

    if (!code || !stateParam) {
      return NextResponse.redirect(
        new URL(
          `/dashboard?error=${encodeURIComponent("Invalid OAuth callback")}`,
          request.url
        )
      );
    }

    // Decode state
    let state: GoogleOAuthState;
    try {
      state = JSON.parse(Buffer.from(stateParam, "base64").toString());
    } catch {
      return NextResponse.redirect(
        new URL(
          `/dashboard?error=${encodeURIComponent("Invalid state")}`,
          request.url
        )
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Verify user matches state
    if (!user || user.id !== state.userId) {
      return NextResponse.redirect(
        new URL(
          `/dashboard?error=${encodeURIComponent("User mismatch")}`,
          request.url
        )
      );
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Calculate expiry
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

    // Store tokens in database
    const { error: dbError } = await supabase.from("oauth_tokens").upsert(
      {
        user_id: state.userId,
        organization_id: state.organizationId,
        provider: "google",
        scope: tokens.scope,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_type: tokens.token_type,
        expires_at: expiresAt.toISOString(),
      },
      {
        onConflict: "user_id,provider",
      }
    );

    if (dbError) {
      logger.error("Failed to store OAuth tokens:", dbError);
      return NextResponse.redirect(
        new URL(
          `/dashboard?error=${encodeURIComponent("Failed to store tokens")}`,
          request.url
        )
      );
    }

    // Redirect to return URL or dashboard
    const returnUrl = state.returnTo || "/dashboard?success=google-connected";
    return NextResponse.redirect(new URL(returnUrl, request.url));
  } catch (error) {
    logger.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      new URL(
        `/dashboard?error=${encodeURIComponent("OAuth failed")}`,
        request.url
      )
    );
  }
}


