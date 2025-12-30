/**
 * Google OAuth 2.0 Configuration and Utilities
 */

export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  redirectUri: process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')}/api/oauth/google/callback`
    : "http://localhost:3000/api/oauth/google/callback",
  scopes: {
    gmail: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.compose",
    ],
    drive: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
    basic: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  },
  endpoints: {
    auth: "https://accounts.google.com/o/oauth2/v2/auth",
    token: "https://oauth2.googleapis.com/token",
    revoke: "https://oauth2.googleapis.com/revoke",
    userInfo: "https://www.googleapis.com/oauth2/v2/userinfo",
  },
};

export interface GoogleTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface GoogleOAuthState {
  userId: string;
  organizationId: string;
  returnTo?: string;
}

/**
 * Generate Google OAuth authorization URL
 */
export function getGoogleAuthUrl(
  state: GoogleOAuthState,
  includeGmail = true,
  includeDrive = true
): string {
  const scopes = [
    ...GOOGLE_OAUTH_CONFIG.scopes.basic,
    ...(includeGmail ? GOOGLE_OAUTH_CONFIG.scopes.gmail : []),
    ...(includeDrive ? GOOGLE_OAUTH_CONFIG.scopes.drive : []),
  ];

  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline", // Request refresh token
    prompt: "consent", // Force consent screen to get refresh token
    state: Buffer.from(JSON.stringify(state)).toString("base64"),
  });

  return `${GOOGLE_OAUTH_CONFIG.endpoints.auth}?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(
  code: string
): Promise<GoogleTokenResponse> {
  const response = await fetch(GOOGLE_OAUTH_CONFIG.endpoints.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
      redirect_uri: GOOGLE_OAUTH_CONFIG.redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<GoogleTokenResponse> {
  const response = await fetch(GOOGLE_OAUTH_CONFIG.endpoints.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: GOOGLE_OAUTH_CONFIG.clientId,
      client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json();
}

/**
 * Revoke access token
 */
export async function revokeToken(token: string): Promise<void> {
  await fetch(
    `${GOOGLE_OAUTH_CONFIG.endpoints.revoke}?token=${encodeURIComponent(token)}`,
    { method: "POST" }
  );
}

/**
 * Get user info from Google
 */
export async function getGoogleUserInfo(accessToken: string) {
  const response = await fetch(GOOGLE_OAUTH_CONFIG.endpoints.userInfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}

