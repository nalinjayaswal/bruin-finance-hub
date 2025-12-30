/**
 * GET /api/gmail/messages/[id]
 * Get a specific Gmail message
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { googleApiRequest } from "@/lib/google-api-client";
import { logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const data = await googleApiRequest(
      user.id,
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`
    );

    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error fetching Gmail message:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch message" },
      { status: 500 }
    );
  }
}

