import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";
import type { SupabaseClient, User } from "@supabase/supabase-js";

// Standard error response
export function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

// Standard success response
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

// Authenticated user context
export interface AuthContext {
  user: User;
  supabase: SupabaseClient;
  organizationId: string;
  profile: {
    id: string;
    organization_id: string;
    full_name?: string;
    [key: string]: any;
  };
}

/**
 * Authenticates the request and returns user context
 * Returns an error response if authentication fails
 */
export async function withAuth(
  request: Request,
  handler: (ctx: AuthContext) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return errorResponse(401, "UNAUTHORIZED", "Authentication required");
    }

    // Get user's organization
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.organization_id) {
      return errorResponse(403, "NO_ORGANIZATION", "User not in an organization");
    }

    // Call handler with context
    return await handler({
      user,
      supabase,
      organizationId: profile.organization_id,
      profile,
    });
  } catch (err) {
    logger.error("Auth middleware error:", err);
    return errorResponse(500, "SERVER_ERROR", "Internal server error");
  }
}

/**
 * Parse JSON body with error handling
 */
export async function parseBody<T = any>(request: Request): Promise<T> {
  try {
    return await request.json();
  } catch {
    return {} as T;
  }
}

/**
 * Validate required fields
 */
export function validateRequired(
  body: any,
  fields: string[]
): { valid: boolean; missing?: string } {
  for (const field of fields) {
    if (!body[field]) {
      return { valid: false, missing: field };
    }
  }
  return { valid: true };
}

