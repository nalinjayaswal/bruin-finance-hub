/**
 * Google API Client Utilities
 * Handles token refresh and API calls
 */

import { createClient } from "@/lib/supabase/server";
import { refreshAccessToken } from "@/lib/google-oauth";
import { logger } from "@/lib/logger";

interface StoredToken {
  access_token: string;
  refresh_token: string | null;
  expires_at: string;
}

/**
 * Get valid access token for user, refreshing if necessary
 */
export async function getValidAccessToken(
  userId: string
): Promise<string | null> {
  const supabase = await createClient();

  const { data: tokenData } = await supabase
    .from("oauth_tokens")
    .select("access_token, refresh_token, expires_at")
    .eq("user_id", userId)
    .eq("provider", "google")
    .single();

  if (!tokenData) {
    return null;
  }

  const token = tokenData as StoredToken;

  // Check if token is expired
  const expiresAt = new Date(token.expires_at);
  const now = new Date();
  const bufferMinutes = 5; // Refresh 5 minutes before expiry

  if (expiresAt.getTime() - now.getTime() > bufferMinutes * 60 * 1000) {
    // Token is still valid
    return token.access_token;
  }

  // Token is expired or about to expire, refresh it
  if (!token.refresh_token) {
    logger.error("No refresh token available for user:", userId);
    return null;
  }

  try {
    const newTokens = await refreshAccessToken(token.refresh_token);
    const newExpiresAt = new Date(Date.now() + newTokens.expires_in * 1000);

    // Update stored token
    await supabase
      .from("oauth_tokens")
      .update({
        access_token: newTokens.access_token,
        expires_at: newExpiresAt.toISOString(),
        // Refresh token might not be returned, keep the old one
        refresh_token: newTokens.refresh_token || token.refresh_token,
      })
      .eq("user_id", userId)
      .eq("provider", "google");

    return newTokens.access_token;
  } catch (error) {
    logger.error("Failed to refresh access token:", error);
    return null;
  }
}

/**
 * Make authenticated request to Google API
 */
export async function googleApiRequest<T = any>(
  userId: string,
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await getValidAccessToken(userId);

  if (!accessToken) {
    throw new Error("No valid access token available");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google API error: ${response.status} - ${error}`);
  }

  return response.json();
}


