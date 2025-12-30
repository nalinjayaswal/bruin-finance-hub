import { withAuth, errorResponse, successResponse } from "@/lib/api/utils";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  return withAuth(request, async ({ supabase, organizationId }) => {
    const url = new URL(request.url);
    const assignee = url.searchParams.get("assignee");
    const state = url.searchParams.get("state");

    // Build query
    let query = supabase
      .from("tasks")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    // Apply filters
    if (assignee && assignee !== "me") {
      query = query.eq("assignee", assignee);
    }
    if (state) {
      query = query.eq("state", state);
    }

    const { data: tasks, error: fetchError } = await query;

    if (fetchError) {
      logger.error("Error fetching tasks:", fetchError);
      return errorResponse(500, "FETCH_ERROR", "Failed to fetch tasks");
    }

    return successResponse({ items: tasks || [] });
  });
}


