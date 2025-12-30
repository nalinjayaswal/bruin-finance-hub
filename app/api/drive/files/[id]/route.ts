/**
 * GET /api/drive/files/[id]
 * Get file metadata or download file content
 * 
 * PATCH /api/drive/files/[id]
 * Update file metadata
 * 
 * DELETE /api/drive/files/[id]
 * Delete a file
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { googleApiRequest, getValidAccessToken } from "@/lib/google-api-client";
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
    const searchParams = request.nextUrl.searchParams;
    const download = searchParams.get("download") === "true";

    if (download) {
      // Download file content
      const accessToken = await getValidAccessToken(user.id);
      if (!accessToken) {
        return NextResponse.json(
          { error: "No valid access token" },
          { status: 401 }
        );
      }

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      // Stream the file back to client
      return new NextResponse(response.body, {
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
          "Content-Disposition": response.headers.get("Content-Disposition") || "attachment",
        },
      });
    } else {
      // Get file metadata
      const data = await googleApiRequest(
        user.id,
        `https://www.googleapis.com/drive/v3/files/${id}?fields=id,name,mimeType,modifiedTime,size,webViewLink,thumbnailLink,description`
      );

      return NextResponse.json(data);
    }
  } catch (error) {
    logger.error("Error fetching Drive file:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch file" },
      { status: 500 }
    );
  }
}

export async function PATCH(
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
    const body = await request.json();

    const data = await googleApiRequest(
      user.id,
      `https://www.googleapis.com/drive/v3/files/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error updating Drive file:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update file" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    await googleApiRequest(
      user.id,
      `https://www.googleapis.com/drive/v3/files/${id}`,
      {
        method: "DELETE",
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Error deleting Drive file:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete file" },
      { status: 500 }
    );
  }
}

