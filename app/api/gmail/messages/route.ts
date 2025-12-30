/**
 * GET /api/gmail/messages
 * List Gmail messages
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { googleApiRequest } from "@/lib/google-api-client";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const maxResults = searchParams.get("maxResults") || "10";
    const pageToken = searchParams.get("pageToken");
    const q = searchParams.get("q"); // Search query

    // Build Gmail API URL
    const params = new URLSearchParams({
      maxResults,
      ...(pageToken && { pageToken }),
      ...(q && { q }),
    });

    const data = await googleApiRequest(
      user.id,
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?${params}`
    );

    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error fetching Gmail messages:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch messages" },
      { status: 500 }
    );
  }
}


