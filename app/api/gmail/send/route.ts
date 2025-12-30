/**
 * POST /api/gmail/send
 * Send an email via Gmail
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { googleApiRequest } from "@/lib/google-api-client";
import { logger } from "@/lib/logger";

interface SendEmailRequest {
  to: string;
  subject: string;
  body: string;
  cc?: string;
  bcc?: string;
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

    const body: SendEmailRequest = await request.json();
    const { to, subject, body: emailBody, cc, bcc } = body;

    if (!to || !subject || !emailBody) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, body" },
        { status: 400 }
      );
    }

    // Construct email in RFC 2822 format
    const emailLines = [
      `To: ${to}`,
      ...(cc ? [`Cc: ${cc}`] : []),
      ...(bcc ? [`Bcc: ${bcc}`] : []),
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      "",
      emailBody,
    ];

    const email = emailLines.join("\r\n");

    // Base64url encode (without padding)
    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const data = await googleApiRequest(
      user.id,
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error sending Gmail:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email" },
      { status: 500 }
    );
  }
}


