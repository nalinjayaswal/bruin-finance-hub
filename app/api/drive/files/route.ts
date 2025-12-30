/**
 * GET /api/drive/files
 * List Google Drive files
 * 
 * POST /api/drive/files
 * Upload a file to Google Drive
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
    const pageSize = searchParams.get("pageSize") || "10";
    const pageToken = searchParams.get("pageToken");
    const q = searchParams.get("q"); // Search query
    const orderBy = searchParams.get("orderBy") || "modifiedTime desc";

    // Build Drive API URL
    const params = new URLSearchParams({
      pageSize,
      orderBy,
      fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size, webViewLink, thumbnailLink)",
      ...(pageToken && { pageToken }),
      ...(q && { q }),
    });

    const data = await googleApiRequest(
      user.id,
      `https://www.googleapis.com/drive/v3/files?${params}`
    );

    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error fetching Drive files:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch files" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string || file?.name;
    const mimeType = formData.get("mimeType") as string || file?.type;
    const folderId = formData.get("folderId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Create file metadata
    const metadata = {
      name,
      mimeType,
      ...(folderId && { parents: [folderId] }),
    };

    // Upload file using multipart upload
    const boundary = "-------314159265358979323846";
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const fileContent = await file.arrayBuffer();

    const multipartRequestBody = 
      delimiter +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      `Content-Type: ${mimeType}\r\n\r\n` +
      Buffer.from(fileContent).toString("binary") +
      closeDelimiter;

    const data = await googleApiRequest(
      user.id,
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error uploading to Drive:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    );
  }
}


