# Native Dashboard

A modern, iOS-inspired dashboard built with Next.js, featuring refined minimalism and smooth animations.

## ✨ Features

- **iOS-Inspired Design** - Clean, minimal interface with iOS-style design patterns
- **Authentication** - Secure authentication via Supabase (Email/Password + Invite System)
- **Real-time Chat Stream** - Smooth streaming message animation with collapsible long messages
- **Workspace Sidebar** - Channel + member list mirrored from the NativeIQ Nuxt app
- **Insight & KPI Panels** - Pulls from shared `@native/types` + `@native/ui` packages
- **Next.js Route Handlers** - `/api/chat`, `/api/insights`, `/api/tasks`, `/api/policy/check`
- **Dark Mode** - Seamless light/dark theme switching
- **Smooth Animations** - Framer Motion powered transitions and interactions

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Theme:** next-themes
- **Backend:** Supabase (Auth, Postgres, Realtime)
- **LLM:** OpenAI Responses API (via `openai` SDK)
- **Packages:** npm workspaces (`packages/types`, `packages/ui`, `packages/utils`)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create `.env.local` and configure environment variables (see [Environment](#-environment))
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── api/               # Next route handlers (chat, insights, tasks, policy, invite)
│   └── (pages + layout + globals)
├── middleware.ts          # Auth middleware (Supabase session handling)
├── components/
│   ├── channel-sidebar.tsx
│   ├── sections/          # Signal ticker, business insights, etc.
│   └── ui/                # Local wrappers around design-system primitives
├── lib/
│   ├── mock-data.ts       # Sample data + shared mock channels/members
│   └── server-data.ts     # Backend seed used by API routes
└── packages/              # npm workspaces lifted from NativeIQ
    ├── types/             # `@native/types`
    ├── ui/                # `@native/ui` (React components + CSS tokens)
    └── utils/             # `@native/utils` (formatters/helpers)

```

## 🔌 API Routes

All handlers live under `app/api` and mirror the Nuxt server endpoints:

| Route | Method | Description |
| --- | --- | --- |
| `/api/chat` | POST | Calls OpenAI (`gpt-4o`) with history + system prompt. Requires `OPENAI_API_KEY`. |
| `/api/insights` | GET | Returns insight objects filtered by `type`, `impact`, or `team`. |
| `/api/tasks` | GET | Filters mock tasks by `assignee` or `state`. |
| `/api/tasks/from-thread` | POST | Creates a placeholder task from a Slack thread payload. |
| `/api/invite` | POST | Generates a new invite code for an organization. |
| `/api/policy/check` | POST | Simulated policy decision envelope (`allow`, `policy_id`, `rationale`). |

## 🔐 Environment

Create `.env.local` in the `NativePOC` directory with:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-key              # /api/chat
RESEND_API_KEY=your-resend-api-key          # Email API for invites

# Web Push Notifications (optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=base64key
VAPID_PRIVATE_KEY=base64key
VAPID_SUBJECT=mailto:your-email@example.com

# Google OAuth 2.0 (for Gmail & Drive integration)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Production: https://your-domain.com
```

**Note:** Legacy variable names (`SUPABASE_URL`, `SUPABASE_KEY`) are still supported for compatibility. Restart `npm run dev` after updating env vars.

Supabase keys enable auth + realtime; the Gemini key powers `/api/chat`. Resend API is used for sending invite emails. Google OAuth credentials enable Gmail and Drive integrations.

## 🎨 Design System

### Color Palette
- **Accent:** iOS Blue (#3b82f6)
- **Backgrounds:** Layered grays with subtle elevation
- **Typography:** Barlow font family

### Components
- **Cards:** Multiple variants (default, interactive, accent)
- **Buttons:** 4 variants (primary, secondary, outline, ghost) × 3 sizes
- **Metric Tiles:** Animated trend indicators
- **Insight Cards:** Priority-based styling (high, medium, low)

### Animations
- Stagger animations for lists
- Smooth slide and fade transitions
- Micro-interactions on hover and click

## 🌓 Theme Support

The app supports both light and dark modes with:
- Automatic system preference detection
- Manual toggle via header button
- Persistent theme selection
- Smooth transitions between themes

## 📝 Key Features

### Chat + Channels
- Character-by-character streaming animation
- Collapsible long messages and loader state
- Channel sidebar with AI + team channels and members
- Auto-scroll to latest message

### Metrics & Insights
- Collapsible right column
- Reuses `@native/ui` MetricTile + InsightCard components
- Signal ticker mixing SLA deltas + insight headlines
- Quick actions module

## 🔧 Configuration

Customize theme colors in `app/globals.css`:
```css
:root {
  --color-accent: #3b82f6;
  --color-bg-base: #ffffff;
  /* ...more variables */
}
```

## 🔗 Google OAuth Setup

To enable Gmail and Google Drive integration, you need to set up Google OAuth 2.0 credentials:

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Gmail API** and **Google Drive API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Gmail API" and click "Enable"
   - Search for "Google Drive API" and click "Enable"

### 2. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/oauth/google/callback`
   - Production: `https://your-domain.com/api/oauth/google/callback`
5. Copy the **Client ID** and **Client Secret**

### 3. Configure Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" (or "Internal" if using Google Workspace)
3. Fill in app information and add scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/drive.file`
   - `https://www.googleapis.com/auth/drive.readonly`
4. Add test users if in testing mode

### 4. Add to Environment Variables
Add the credentials to your `.env.local`:
```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Database Migration
Apply the OAuth tokens migration:
```bash
# In Supabase SQL Editor, run:
supabase/migrations/004_oauth_tokens.sql
```

### 6. Connect Google Account
1. Navigate to `/integrations` in your dashboard
2. Click "Connect Google Account"
3. Authorize the requested permissions
4. You're all set! 🎉

## 📧 Gmail & Drive API Usage

Once connected, you can access Gmail and Drive APIs:

### Gmail
```typescript
// List messages
GET /api/gmail/messages?maxResults=10&q=from:example@gmail.com

// Get specific message
GET /api/gmail/messages/[messageId]

// Send email
POST /api/gmail/send
Body: { to: "user@example.com", subject: "Hello", body: "Message" }
```

### Google Drive
```typescript
// List files
GET /api/drive/files?pageSize=10&q=name contains 'report'

// Get file metadata
GET /api/drive/files/[fileId]

// Download file
GET /api/drive/files/[fileId]?download=true

// Upload file
POST /api/drive/files
Body: FormData with 'file', 'name', 'mimeType'

// Update file metadata
PATCH /api/drive/files/[fileId]
Body: { name: "new-name.pdf" }

// Delete file
DELETE /api/drive/files/[fileId]
```