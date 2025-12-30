# NativePOC Codebase Index

> Comprehensive index of the NativePOC codebase for context retrieval and navigation.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [API Routes](#api-routes)
4. [Components](#components)
5. [Hooks](#hooks)
6. [Packages](#packages)
7. [Configuration Files](#configuration-files)
8. [Database & Migrations](#database--migrations)
9. [Key Patterns & Architecture](#key-patterns--architecture)

---

## Project Overview

**NativePOC** is a modern, iOS-inspired dashboard built with Next.js 16 (App Router), featuring refined minimalism and smooth animations. It serves as a proof-of-concept migration from NativeIQ (Nuxt/Vue) to Next.js/React.

### Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Theme:** next-themes
- **Backend:** Supabase (Auth, Postgres, Realtime)
- **LLM:** Google Gemini 2.5 Flash (via REST API)
- **Package Management:** npm workspaces

### Key Features

- iOS-inspired design with refined minimalism
- Secure authentication via Supabase (Email/Password + Invite System with email sending)
- Real-time chat stream with character-by-character animation and reply threading
- Workspace sidebar with channels and members
- Dynamic insights & KPI panels with rule-based generation
- Context management system for AI grounding
- Progressive Web App (PWA) with offline support
- Web push notifications for real-time message alerts
- Marketing landing page with interactive demos
- Dark mode with seamless theme switching
- Smooth animations powered by Framer Motion

---

## Directory Structure

```
NativePOC/
├── app/                          # Next.js App Router entrypoint
│   ├── (auth)/                   # Authentication route group
│   │   ├── layout.tsx            # Auth layout wrapper (bare, children passthrough)
│   │   ├── login/
│   │   │   └── page.tsx          # Login page (email/password via useAuth)
│   │   └── signup/
│   │       └── page.tsx          # Signup page with invite support + org creation
│   ├── (dashboard)/              # Dashboard route group
│   │   └── dashboard/
│   │       └── page.tsx          # Main dashboard page (chat + insights + metrics)
│   ├── (marketing)/              # Marketing route group
│   │   ├── page.tsx              # Landing page with hero, features, and sections
│   │   ├── pricing/
│   │   │   └── page.tsx          # Pricing page
│   │   └── research/
│   │       └── page.tsx          # Research page
│   ├── api/                      # API route handlers (REST-ish)
│   │   ├── chat/
│   │   │   └── route.ts          # POST - Gemini AI chat endpoint with context grounding
│   │   ├── context/
│   │   │   └── route.ts          # GET - Fetch full organization context (legacy)
│   │   ├── contexts/
│   │   │   └── route.ts          # GET/POST - Fetch or create context entries for org
│   │   ├── insights/
│   │   │   ├── route.ts          # GET - Fetch insights with filters (auth + org scoped)
│   │   │   └── generate/
│   │   │       └── route.ts      # POST - Generate insights from team messages (rule-based)
│   │   ├── invite/
│   │   │   └── route.ts          # POST - Generate org invites with email sending
│   │   ├── messages/
│   │   │   └── send/
│   │   │       └── route.ts      # POST - Send message with push notification triggering
│   │   ├── policy/
│   │   │   └── check/
│   │   │       └── route.ts      # POST - RBAC policy evaluation helper
│   │   ├── push/
│   │   │   ├── subscribe/
│   │   │   │   └── route.ts      # POST - Register push subscription for user
│   │   │   └── send/
│   │   │       └── route.ts      # POST - Send push notification to user/org
│   │   └── tasks/
│   │       ├── route.ts          # GET - Fetch tasks with filters (auth + org scoped)
│   │       └── from-thread/
│   │           └── route.ts      # POST - Create task from Slack thread metadata
│   ├── globals.css               # Global styles + design tokens (Tailwind 4)
│   ├── layout.tsx                # Root layout with fonts, ThemeProvider, UserProvider, ServiceWorker
│   └── page.tsx                  # Root page (redirects to marketing or dashboard)
├── components/                   # React components (client)
│   ├── channel-sidebar.tsx       # Collapsible sidebar with channels/members, DM + invite actions
│   ├── chat-stream.tsx           # iOS Messages-style chat interface + composer
│   ├── dashboard-header.tsx      # Sticky header with frosted glass, quick actions, ticker, profile
│   ├── error-boundary.tsx        # Generic React error boundary
│   ├── error-message.tsx         # Lightweight inline error display component
│   ├── inline-insight-card.tsx   # Compact insight card used in right column
│   ├── invite-member-modal.tsx   # Modal for inviting team members (uses /api/invite)
│   ├── landing/                  # Landing page section components
│   │   ├── BuiltForSMBSection.tsx
│   │   ├── ClosingCTASection.tsx
│   │   ├── CommandCenterSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── FooterSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── InteractiveChatDemo.tsx
│   │   ├── NavigationSection.tsx
│   │   ├── OwnershipSection.tsx
│   │   ├── PricingClient.tsx
│   │   ├── ResearchClient.tsx
│   │   └── WhatIsBLMSection.tsx
│   ├── loading-skeleton.tsx      # Skeleton loading states for key surfaces
│   ├── new-dm-modal.tsx          # Modal for creating direct message channels
│   ├── sections/
│   │   ├── business-insights.tsx # Business insights section (risk radar, growth pulse, SLA)
│   │   └── signal-ticker.tsx     # Signal ticker / notifications bubble in header
│   ├── sw-register.tsx           # Service worker registration + push subscription
│   ├── theme-provider.tsx        # Theme context provider (light/dark)
│   ├── theme-toggle.tsx          # Dark/light mode toggle button
│   └── ui/                       # Local UI component wrappers around @native/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── insight-card.tsx
│       └── metric-tile.tsx
├── contexts/
│   └── user-context.tsx          # User + organization context for client components
├── docs/
│   ├── nativeiq-inventory.md     # Reference inventory from original NativeIQ app
│   └── workspace-structure.md    # High-level workspace / monorepo structure notes
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Auth hook (signUp, signIn, signOut, profile/org fetch)
│   ├── useChat.ts                # Chat hook with realtime subscriptions + reply threading
│   ├── useFocusTrap.ts           # Focus trap helper for modals/sheets
│   └── useNotifications.ts       # Browser notification helper (local-only, no Supabase writes)
├── lib/                          # Utility libraries
│   ├── animations.ts             # Framer Motion animation variants + iOS-style springs
│   ├── context.ts                # Organization context fetcher (profile, channels, members, etc.)
│   ├── logger.ts                 # Thin wrapper around console for structured logging
│   ├── mock-data.ts              # Mock data for development (metrics, messages, insights)
│   ├── push-service.ts           # Web push notification service with VAPID
│   ├── server-data.ts            # Server-side seed data helpers
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client (createBrowserClient)
│   │   ├── middleware.ts         # Middleware session helper (updateSession)
│   │   └── server.ts             # Server Supabase client (createServerClient)
│   ├── supabase-browser.ts       # Legacy browser client (deprecated, kept for compatibility)
│   └── utils.ts                  # Utility functions (cn, formatters, etc.)
├── middleware.ts                 # Next.js middleware for auth/session (invokes updateSession)
├── packages/                     # npm workspaces
│   ├── types/                    # @native/types - Shared TypeScript types
│   │   └── src/
│   │       └── index.ts          # Exports: Insight, Task, Approval, SlaMetric, UserProfile, CommandDescriptor
│   ├── ui/                       # @native/ui - Design system components
│   │   └── src/
│   │       ├── components/       # React components (Button, MetricTile, InsightCard, etc.)
│   │       ├── styles/           # CSS tokens and base styles
│   │       └── theme/            # Theme provider and controls
│   └── utils/                    # @native/utils - Utility functions
│       └── src/
│           └── index.ts          # formatRelativeTime, formatAsPercent, clamp
├── public/                       # Static assets (logos, icons, PWA manifest)
│   ├── manifest.webmanifest      # PWA manifest
│   ├── MessageIcon.png
│   ├── NativeLogo.png
│   ├── NativeLogo.svg
│   └── sw.js                     # Service worker for caching + push notifications
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql       # Database schema
│       ├── 002_rls_policies.sql         # Row Level Security policies
│       ├── 003_add_role_to_invites.sql  # Add role to org invites
│       ├── 003_notifications.sql        # Notifications + push subscriptions table
│       ├── 004_context_table.sql        # Context table for AI grounding
│       ├── 004_relax_role_constraints.sql
│       ├── 005_ensure_role_column.sql
│       └── 006_fix_push_rls.sql         # Fix push subscription RLS policies
├── types/
│   └── web-push.d.ts             # TypeScript declarations for web-push
├── eslint.config.mjs             # ESLint configuration
├── index.css                     # Additional CSS file
├── next.config.ts                # Next.js configuration (aliases for @native/*)
├── package.json                  # Root package.json with workspaces + scripts
├── postcss.config.mjs            # PostCSS configuration (Tailwind 4 plugin)
├── tailwind.config.js            # Tailwind CSS 4 config (content, brand colors, fonts)
└── tsconfig.json                 # TypeScript configuration (paths for @native/*)
```

---

## Route Groups

The application uses Next.js route groups to organize pages:

1. **`(auth)/`** - Authentication pages (login, signup)
   - Minimal layout without navigation
   - Redirects authenticated users to dashboard

2. **`(dashboard)/`** - Authenticated dashboard pages
   - Main application interface
   - Requires authentication via middleware
   - Includes chat, insights, and metrics

3. **`(marketing)/`** - Public marketing pages
   - Landing page, pricing, research
   - No authentication required
   - Includes navigation and footer components

**Root Pages:**
- `app/page.tsx` - Root redirect (marketing or dashboard based on auth status)
- `app/layout.tsx` - Root layout with providers and service worker

---

## API Routes

All API routes are located in `app/api/` and follow Next.js App Router conventions.

### `/api/chat` (POST)

**Purpose:** AI chat endpoint using Google Gemini 2.5 Flash via REST API

**Request Body:**
```typescript
{
  message: string
  history?: Array<{ role: "user" | "assistant"; content: string }>
  systemPrompt?: string
}
```

**Response:**
```typescript
{ 
  message: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
} 
```

**Error Response:**
```typescript
{
  error: { code: string; message: string; details: {} }
}
```

**Key Details:**
- Requires `GEMINI_API_KEY` environment variable
- Uses Gemini REST API (`/v1beta/models/gemini-2.5-flash:generateContent`)
- **Context Grounding:** Fetches top 10 most recently updated items from the `contexts` table (filtered by organization) to use as a "source of truth".
- Builds a single text prompt combining system prompt, context block, prior history, and latest user message
- Default system prompt describes Native as an AI assistant for NativeIQ
- Returns canonical error envelope format on failures

**File:** `app/api/chat/route.ts`

---

### `/api/insights` (GET)

**Purpose:** Fetch insights with optional filtering

**Query Parameters:**
- `type` - Filter by insight type (decision, risk, blocker, trend, summary)
- `impact` - Filter by impact level (critical, high, medium, low)
- `team` - Filter by team name (searches in sources JSONB)

**Response:**
```typescript
{
  items: Insight[]
}
```

**Key Details:**
- Requires authentication
- Organization-scoped (only returns insights for user's organization)
- Supports JSONB filtering for team search
- Ordered by `created_at` descending

**File:** `app/api/insights/route.ts`

---

### `/api/tasks` (GET)

**Purpose:** Fetch tasks with optional filtering

**Query Parameters:**
- `assignee` - Filter by assignee (use "me" for current user)
- `state` - Filter by state (open, in_progress, done, blocked)

**Response:**
```typescript
{
  items: Task[]
}
```

**Key Details:**
- Requires authentication
- Organization-scoped
- Ordered by `created_at` descending

**File:** `app/api/tasks/route.ts`

---

### `/api/tasks/from-thread` (POST)

**Purpose:** Create a task from a Slack thread payload

**Request Body:**
```typescript
{
  channel: string
  thread_ts: string
}
```

**Response:**
```typescript
{
  task: Task
}
```

**Key Details:**
- Creates placeholder task with 4-hour due date
- Sets priority to "p1"
- Includes Slack permalink in metadata

**File:** `app/api/tasks/from-thread/route.ts`

---

### `/api/invite` (POST)

**Purpose:** Generate invite code for organization

**Request Body:**
```typescript
{
  email: string
  organizationId: string
}
```

**Response:**
```typescript
{
  success: true
  inviteLink: string
  message: string
}
```

**Key Details:**
- Authenticated user must belong to the target organization
- Only `owner` and `admin` roles can invite members
- Writes to `invites` table (or returns helper SQL if table missing)
- Invite codes are UUIDs expiring in 7 days
- Returns full signup URL with `invite` parameter, derived from:
  - `NEXT_PUBLIC_APP_URL`, or
  - `NEXT_PUBLIC_VERCEL_URL` / `VERCEL_URL`, or
  - Request host (fallback, including localhost)

**File:** `app/api/invite/route.ts`

---

### `/api/policy/check` (POST)

**Purpose:** Role-based authorization policy evaluation

**Request Body:**
```typescript
{
  actor: string
  action: string
  resource: { type: string; id: string }
  context?: Record<string, unknown>
}
```

**Response:**
```typescript
{
  allow: boolean
  policy_id: string
  rationale: string
  context: Record<string, unknown>
}
```

**Supported Actions:**
-- `tasks.delete` - Only owners and admins
-- `tasks.create` / `tasks.update` - All authenticated users
-- `insights.create` / `insights.update` - All authenticated users
-- `organization.update` - Only owners
-- `members.invite` - Owners and admins
-- All other actions: allowed by default with a generic rationale


**File:** `app/api/policy/check/route.ts`

---

### `/api/context` (GET)

**Purpose:** Fetch comprehensive organization context for the current user (legacy)

**Response:**
```typescript
{
  context: OrgContext
}
```

**OrgContext Structure:**
- `userId`: string
- `organizationId`: string
- `organizationName`: string | null
- `profile`: { id, full_name, role }
- `channels`: Channel[]
- `members`: Member[]
- `insights`: Insight[]
- `tasks`: Task[]

**Key Details:**
- Aggregates data from multiple tables (organizations, channels, profiles, insights, tasks)
- Used for initializing client-side state or rich context
- Authenticated and organization-scoped

**File:** `app/api/context/route.ts`

---

### `/api/contexts` (GET/POST)

**Purpose:** Manage context entries for AI grounding (curated org knowledge)

**GET** - Fetch context entries:
**Query Parameters:** None
**Response:**
```typescript
{
  items: Context[]
}
```

**POST** - Create new context entry:
**Request Body:**
```typescript
{
  title: string        // Max 200 chars
  content: string      // Max 6000 chars
  tags?: string[]      // Max 10 tags, 40 chars each
}
```

**Response:**
```typescript
{
  item: Context
}
```

**Key Details:**
- Context entries are org-scoped snippets of business knowledge
- Used to ground AI responses with specific business context
- Automatically tracks `updated_by` and `updated_at`
- Ordered by `updated_at` descending (most recent first)
- Top 10 contexts are used in `/api/chat` for AI grounding

**File:** `app/api/contexts/route.ts`

---

### `/api/insights/generate` (POST)

**Purpose:** Generate insights from team messages using rule-based classification

**Request Body:** None

**Response:**
```typescript
{
  created: number        // Number of insights created
  scanned: number        // Number of messages scanned
  channelCount: number   // Number of team channels
  messageCount: number   // Number of messages found
}
```

**Key Details:**
- Scans team channel messages from last 24 hours
- Applies keyword rules for risk, decision, and profit signals
- Ignores messages mentioning `@native` (AI prompts)
- Creates insights with appropriate type, title, confidence, and impact
- Risk keywords: blocker, blocked, outage, downtime, incident, critical, sev1
- Decision keywords: decision:, we decided, final call, ship it, go ahead, approved
- Profit keywords: profit, revenue, mrr, growth, improved, accelerating, velocity
- Only creates insights if message matches a rule (no generic summaries)
- Links insights to source messages in `sources` field

**File:** `app/api/insights/generate/route.ts`

---

### `/api/messages/send` (POST)

**Purpose:** Send a message to a channel with automatic push notification delivery

**Request Body:**
```typescript
{
  channelId: string
  content: string
  replyToId?: string
  isAI?: boolean
}
```

**Response:**
```typescript
{
  id: string
  channel_id: string
  author_id: string
  content: string
  created_at: string
  author: {
    id: string
    full_name: string
    avatar_url: string
  }
}
```

**Key Details:**
- Authenticates user and verifies channel access
- Inserts message into `messages` table with author join
- Triggers web push notifications to relevant users:
  - For DM channels: sends to other participants
  - For team channels: sends to all org members (excluding sender)
- Push notification includes title, body preview, and deep link data
- Non-blocking push errors (logs warning but doesn't fail request)

**File:** `app/api/messages/send/route.ts`

---

### `/api/push` Routes

#### `/api/push/subscribe` (POST)
**Purpose:** Register a Web Push subscription for the current user/device
**Request Body:** `{ subscription: PushSubscription }`
**Response:** `{ success: boolean }`
**Key Details:**
- Upserts subscription to `push_subscriptions` table
- Associates subscription with user and organization
- Used by service worker registration

**File:** `app/api/push/subscribe/route.ts`

#### `/api/push/send` (POST)
**Purpose:** Send a push notification to specific users or organization members
**Request Body:** `{ title, body, url?, userId?, organizationId? }`
**Response:** `{ sent: number }`
**Key Details:**
- Uses `web-push` library with VAPID keys
- Can target individual user or all org members
- Supports filtering by excludeUserId for org broadcasts

**File:** `app/api/push/send/route.ts`

---

## Components

### Core Components

#### `components/chat-stream.tsx`

iOS Messages-style chat interface with streaming animation and rich composer.

**Props:**
```typescript
{
  messages: Message[]              // From useChat (includes author + reply metadata)
  className?: string
  onSendMessage?: (content: string, replyToId?: string) => void
  isNativeResponding?: boolean
  channelType?: "team" | "direct" | "ai-assistant"
  channelName?: string | null
  aiError?: string | null
  onRetryAI?: () => void
  onRegenerate?: (message: Message) => void
  onFeedback?: (message: Message, value: "up" | "down") => void
}
```

**Features:**
- Character-by-character streaming animation
- Collapsible long messages (>200 chars)
- Auto-scroll to latest message
- Loading state with animated dots
- Message alignment (self vs others)
- Timestamp formatting
 - Reply UI (quoted messages + reply composer state)
 - Copy, regenerate, and thumbs-up/down feedback for assistant messages
 - Keyboard shortcuts (Enter send, Shift+Enter newline, Cmd/Ctrl+K focus)
 - "Jump to latest" affordance when scrolled up

**Key Implementation:**
- Uses Framer Motion `AnimatePresence` for message animations
- Prevents animation on immediate scroll to avoid jank
- Supports both user and assistant messages
- Integrates with `useUser` for current user identity

---

#### `components/channel-sidebar.tsx`

Collapsible sidebar with channels, members, and organization info.

**Props:**
```typescript
{
  channels: Channel[]
  currentChannel: Channel | null
  members: ChatMember[]
  organizationName?: string
  onSelectChannel?: (channel: Channel) => void
  onInvite?: () => void
  onNewDM?: () => void
  onToggleCollapse?: () => void
  collapsed?: boolean
  className?: string
  isMobileOpen?: boolean
  onMobileClose?: () => void
}
```

**Features:**
- Auto-collapse with hover expand (desktop)
- Mobile drawer variant with backdrop and close button
- Sections: Team Chat (with AI), Direct Messages, Team Members
- Channel type indicators, avatar stacks, unread badges
- Member list with role badges (e.g., owner)
- Invite and new DM buttons wired to modals in `app/page.tsx`

**Channel Types:**
- `ai-assistant` - Native AI channel
- `team` - Team chat channels
- `direct` - Direct message channels

---

#### `components/dashboard-header.tsx`

Sticky header with iOS-style frosted glass effect that increases blur on scroll.

**Props:**
```typescript
{
  className?: string
  insights?: Insight[]
  metrics?: SlaMetric[]
  onMobileMenuClick?: () => void
}
```

**Features:**
- Dynamic backdrop blur based on scroll position
- Quick Actions dropdown menu
- Search trigger (⌘K)
- Signal ticker component
- Theme toggle
- Profile dropdown with sign out
 - Mobile menu button that toggles sidebar on small screens

**Implementation:**
- Uses Framer Motion `useScroll` and `useTransform` for scroll effects
- Backdrop filter increases from 0 to 12px on scroll
 - Uses `SignalTicker` for notifications and `ProfileDropdown` for account controls

---

#### `components/sections/business-insights.tsx`

Business insights section with risk radar, growth pulse, and metrics.

**Props:**
```typescript
{
  company?: string
  insights: Insight[]
  metrics: SlaMetric[]
}
```

**Features:**
- Highlights top risk insight
- Shows trending/summary insights
- Displays decision insights
- Shows SLA metric with variance using "pulse" style cards

---

#### `components/sections/signal-ticker.tsx`

Signal ticker mixing SLA deltas and insight headlines.

**Props:**
```typescript
{
  insights: Insight[]
  metrics: SlaMetric[]
}
```

**Features:**
- Synthesizes metric alerts (over-target SLAs) and recent insights into a compact list
- Badge on header icon shows unread count
- Dropdown lists mixed alerts with timestamps (`formatRelativeTime`)

---

### Landing Page Components

Located in `components/landing/` - Marketing page section components.

**Components:**
- `NavigationSection.tsx` - Landing page header/navigation
- `HeroSection.tsx` - Hero section with CTA
- `WhatIsBLMSection.tsx` - Business Logic Model explanation
- `InteractiveChatDemo.tsx` - Interactive chat demonstration
- `OwnershipSection.tsx` - Ownership/data privacy messaging
- `HowItWorksSection.tsx` - How it works explanation
- `FeaturesSection.tsx` - Feature highlights
- `CommandCenterSection.tsx` - Command center showcase
- `BuiltForSMBSection.tsx` - SMB-focused messaging
- `ClosingCTASection.tsx` - Final call-to-action
- `FooterSection.tsx` - Footer with links
- `PricingClient.tsx` - Client-side pricing component
- `ResearchClient.tsx` - Client-side research component

**Usage:**
These components are composed in `app/(marketing)/page.tsx` to form the complete landing page.

---

### Service Worker & PWA Components

#### `components/sw-register.tsx`

Client component that registers the service worker and subscribes to push notifications.

**Features:**
- Registers `/sw.js` on mount (HTTPS or localhost only)
- Subscribes to Web Push using VAPID public key
- Sends subscription to `/api/push/subscribe`
- Gracefully handles errors and logs warnings
- Uses `urlBase64ToUint8Array` helper for VAPID key conversion

**Usage:**
Rendered in root `app/layout.tsx` to ensure service worker is active throughout the app.

---

### UI Components

Located in `components/ui/` - Local wrappers around design system primitives.

- `button.tsx` - Button component with variants
- `card.tsx` - Card container component
- `insight-card.tsx` - Insight display card
- `metric-tile.tsx` - Metric tile with trend indicators

---

### Modals

#### `components/invite-member-modal.tsx`

Modal for inviting team members to organization.

**Props:**
```typescript
{
  isOpen: boolean
  onClose: () => void
  organizationId: string
}
```

**Features:**
- Email input
- Calls `/api/invite` endpoint
- Displays generated invite link

---

#### `components/new-dm-modal.tsx`

Modal for creating direct message channels.

**Props:**
```typescript
{
  isOpen: boolean
  onClose: () => void
  organizationId: string
  currentUserId: string
  onDMCreated?: (channelId: string) => void
}
```

**Features:**
- Member selection
- Creates direct channel in Supabase
- Auto-selects created channel

---

## Hooks

### `hooks/useAuth.ts`

Authentication hook providing sign up, sign in, sign out, and profile/org helpers.

**Exports:**
```typescript
{
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, fullName: string, orgName: string) => Promise<...>
  signIn: (email: string, password: string) => Promise<...>
  signOut: () => Promise<void>
  fetchProfile: () => Promise<Profile | null>
  fetchOrganization: (organizationId: string) => Promise<Organization | null>
}
```

**Key Features:**
- Automatic organization creation on signup
- Profile creation with organization assignment
- Default AI assistant channel creation
- Router navigation after auth actions
- Uses browser Supabase client from `lib/supabase/client`

---

### `hooks/useChat.ts`

Chat hook with realtime subscriptions for channels and messages, including reply threading.

**Exports:**
```typescript
{
  channels: Channel[]
  currentChannel: Channel | null
  messages: Message[]
  members: ChatMember[]
  loading: boolean
  sending: boolean
  error: string | null
  isAIChannel: boolean
  teamChannel: Channel | undefined
  aiChannel: Channel | undefined
  fetchChannels: (organizationId: string) => Promise<Channel[]>
  fetchMessages: (channelId: string, limit?: number) => Promise<Message[]>
  fetchMembers: (organizationId: string) => Promise<ChatMember[]>
  sendMessage: (content: string, options?: { isAI?: boolean }) => Promise<Message>
  selectChannel: (channel: Channel) => Promise<void>
  subscribeToChannel: (channelId: string) => void
  unsubscribe: () => void
  getInitials: (name: string | null | undefined) => string
  formatTime: (timestamp: string) => string
}
```

**Key Features:**
- Real-time message subscriptions via Supabase Realtime
- Automatic message transformation (adds `role`, `timestamp`, and reply metadata for UI)
- Channel selection with message fetching
- Message sending with author join
- Organization-scoped data fetching

**Realtime Implementation:**
- Subscribes to `messages:${channelId}` channel
- Listens for `INSERT` events on `messages` table
- Fetches author details and reply target for new messages
- Prevents duplicate message insertion

---

### `hooks/useNotifications.ts`

Browser-only notifications helper (no Supabase persistence yet).

**Exports:**
```typescript
{
  permission: NotificationPermission
  unreadCount: number
  notifications: Notification[]
  preferences: NotificationPreferences
  requestPermission: () => Promise<boolean>
  savePreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>
  fetchUnreadCount: () => Promise<void>
  fetchNotifications: (limit?: number) => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  createNotification: (
    userId: string,
    type: "message" | "mention" | "reply" | "direct",
    options: { channelId?: string; messageId?: string; title?: string; body?: string }
  ) => Promise<void>
}
```

**Key Features:**
- Wraps the browser `Notification` API with permission checks
- Keeps unread count and recent notifications in local React state
- Type-specific preferences (mentions, replies, DMs)
- Used by `app/page.tsx` to create notifications from realtime message events

---

### `hooks/useFocusTrap.ts`

Focus trap hook for modals/sheets and other overlays.

**Signature:**
```typescript
function useFocusTrap(isActive: boolean): React.RefObject<HTMLElement | null>
```

**Key Features:**
- Traps Tab/Shift+Tab focus within a container while active
- Automatically focuses the first focusable element
- Restores focus to previously focused element on cleanup

---

## Library Files

### `lib/context.ts`

Organization context fetcher for server-side use.

**Exports:**
```typescript
type OrgContext = {
  userId: string
  organizationId: string
  organizationName: string | null
  profile: { id, full_name, role }
  channels: Channel[]
  members: Member[]
  insights: Insight[]
  tasks: Task[]
}

function fetchOrgContext(request?: NextRequest): Promise<OrgContext | null>
```

**Key Features:**
- Server-only helper for fetching comprehensive org data
- Used by `/api/context` endpoint
- Fetches authenticated user's profile, org, channels, members, insights, and tasks
- Returns `null` if user not authenticated or not in an organization
- All data is org-scoped for security

---

### `lib/push-service.ts`

Web push notification service with VAPID support.

**Exports:**
```typescript
interface PushSubscription { endpoint, keys: { p256dh, auth } }
type PushNotificationPayload = { title, body, url?, icon?, tag?, data? }

function sendPushNotification(subscription: PushSubscription, payload: PushNotificationPayload): Promise<boolean>
function sendPushToUser(supabase: SupabaseClient, userId: string, payload: PushNotificationPayload): Promise<number>
function sendPushToOrganization(supabase: SupabaseClient, organizationId: string, payload: PushNotificationPayload, excludeUserId?: string): Promise<number>
```

**Key Features:**
- Uses `web-push` library with VAPID keys from environment
- Configures VAPID details on first use (lazy initialization)
- Sends push notifications to individual users or entire organizations
- Fetches push subscriptions from `push_subscriptions` table
- Supports excluding sender from org-wide broadcasts
- Returns count of successfully sent notifications
- Gracefully handles errors and logs failures

**Environment Variables:**
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - VAPID public key (client-accessible)
- `VAPID_PRIVATE_KEY` - VAPID private key (server-only)
- `VAPID_SUBJECT` - VAPID subject (email or URL)

---

## Packages

### `@native/types` (`packages/types`)

Shared TypeScript interfaces and types.

**Exports:**
```typescript
export type InsightType = "decision" | "risk" | "blocker" | "trend" | "summary"

export type InsightSource = {
  label: string
  url: string
  timestamp: string
  channel?: string
}

export type Insight = {
  id: string
  type: InsightType
  title: string
  summary: string
  confidence: number           // 0..1
  impact: "critical" | "high" | "medium" | "low"
  owner: string
  sources: InsightSource[]
  suggestedActions?: Array<{
    id: string
    label: string
    intent?: "primary" | "secondary" | "ghost"
  }>
  userRole?: string            // Role of the user who triggered this insight
}

export type TaskState = "open" | "in_progress" | "done" | "blocked"

export type Task = {
  id: string
  title: string
  assignee: string
  state: TaskState
  dueAt?: string
  priority: "p0" | "p1" | "p2"
  sourceInsightId?: string
  slackPermalink?: string
}

export type Approval = {
  id: string
  summary: string
  requester: string
  requestedAt: string
  status: "pending" | "approved" | "rejected"
  slaMinutes: number
}

export type SlaMetric = {
  label: string
  value: number
  target: number
  unit: "ms" | "%" | "count" | "seconds" | "minutes" | "hours"
}

export type UserProfile = {
  id: string
  name: string
  avatarUrl: string
  role: string
}

export type CommandDescriptor = {
  id: string
  name: string
  description: string
  shortcut?: string
  mcpTool?: string
}
```

**Usage:**
```typescript
import type { Insight, Task, SlaMetric } from "@native/types"
```

---

### `@native/ui` (`packages/ui`)

Design system React components and CSS tokens.

**Structure:**
```text
packages/ui/src/
├── components/
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── CommandPalette.tsx
│   ├── GlassCard.tsx
│   ├── InsightCard.tsx
│   ├── MetricTile.tsx
│   ├── NavigationRail.tsx
│   └── index.ts
├── styles/
│   ├── base.css
│   ├── tokens.css
│   └── index.ts
└── theme/
    ├── ThemeProvider.tsx
    ├── ThemeControls.tsx
    └── index.ts
```

**Exports:**
- All components from `components/index.ts` (Button, InsightCard, MetricTile, NavigationRail, etc.)
- Styles from `styles/index.ts` (includes base.css + tokens.css)
- Theme from `theme/index.ts` (ThemeProvider, ThemeControls)

**Usage:**
```typescript
import { Button, InsightCard, MetricTile } from "@native/ui"
import "@native/ui/styles"
```

---

### `@native/utils` (`packages/utils`)

Reusable utility functions.

**Exports:**
```typescript
// Time formatting (supports future and past)
formatRelativeTime(value: string | number | Date): string
// Returns: "just now", "5m ago", "2h ago", "3d ago", "in 5m", etc.

// Number formatting
formatAsPercent(value: number, fractionDigits?: number): string
// Returns: "12.5%"

// Math utilities
clamp(value: number, min: number, max: number): number
```

**Usage:**
```typescript
import { formatRelativeTime, formatAsPercent, clamp } from "@native/utils"
```

---

## Configuration Files

### `tsconfig.json`

TypeScript configuration with path aliases for workspace packages.

**Key Path Aliases:**
```json
{
  "@/*": ["./*"],
  "@native/types": ["packages/types/src"],
  "@native/types/*": ["packages/types/src/*"],
  "@native/ui": ["packages/ui/src"],
  "@native/ui/*": ["packages/ui/src/*"],
  "@native/utils": ["packages/utils/src"],
  "@native/utils/*": ["packages/utils/src/*"]
}
```

---

### `next.config.ts`

Next.js configuration with webpack and turbopack aliases for workspace packages.

**Features:**
- `typedRoutes` enabled
- Webpack alias configuration for `@native/*`
- Turbopack `resolveAlias` configuration mirroring webpack

---

### `package.json`

Root package.json with npm workspaces configuration.

**Workspaces:**
```json
{
  "workspaces": ["packages/*"]
}
```

**Scripts:**
- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint

**Key Dependencies:**
- `next@16.0.7`
- `react@19.2.0`, `react-dom@19.2.0`
- Supabase client + SSR helpers
- Framer Motion
- Tailwind CSS 4 (`@tailwindcss/postcss`)
- Google Generative AI SDK (`@google/generative-ai`)

---

### `eslint.config.mjs`

ESLint configuration using Next.js configs.

**Configuration:**
- Uses `eslint-config-next/core-web-vitals`
- Uses `eslint-config-next/typescript`
- Overrides default ignores via `globalIgnores`, ignoring:
  - `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

---

### `app/globals.css`

Global styles with CSS variables and Tailwind 4 `@theme` block.

**Key Features:**
- Defines brand-aware tokens (`--color-bg-*`, `--color-fg-*`, `--color-accent*`)
- Light and dark mode variants (via `.dark` class)
- iOS-inspired 8pt spacing grid and generous radii
- Glassmorphism tokens and spring animation config
- Utility classes for scrollbars, loaders, chat container, and marquee

---

## Database & Migrations

### Schema Overview

**Tables:**
1. `organizations` - Organization data
2. `profiles` - User profiles (extends auth.users)
3. `organization_invites` - Invite codes for organizations
4. `channels` - Chat channels (team, ai-assistant, direct)
5. `messages` - Chat messages
6. `insights` - Business insights (auto-generated from messages)
7. `tasks` - Task management
8. `approvals` - Approval workflows
9. `contexts` - Curated org knowledge for AI grounding
10. `push_subscriptions` - Web push subscriptions per user/device

### Migration Files

#### `001_initial_schema.sql`

Creates all tables, indexes, and triggers.

**Key Features:**
- UUID primary keys
- Foreign key relationships
- JSONB columns for flexible data (sources, metadata)
- Automatic profile creation trigger on user signup
- Indexes for performance

**Tables Created:**
- `organizations` - id, name, slug, created_at
- `profiles` - id (FK to auth.users), organization_id, full_name, avatar_url, role
- `organization_invites` - id, organization_id, email, invite_code, expires_at
- `channels` - id, organization_id, name, description, type
- `messages` - id, channel_id, author_id, content, is_ai_response, metadata
- `insights` - id, organization_id, type, title, summary, confidence, impact, sources
- `tasks` - id, organization_id, title, assignee, state, due_at, priority
- `approvals` - id, organization_id, summary, requester, status, sla_minutes

---

#### `002_rls_policies.sql`

Enables Row Level Security (RLS) and creates policies for all tables.

**Policy Pattern:**
- Users can view data in their organization
- Users can create/update data in their organization
- Role-based permissions (owner, admin, member)
- Organization-scoped isolation

**Key Policies:**
- **Organizations:** View own org, owners can update
- **Profiles:** View org members, update own profile
- **Channels:** View org channels, admins/owners can create
- **Messages:** View/insert in org channels
- **Insights:** View/create/update in org
- **Tasks:** View/create/update in org, only owners/admins can delete
- **Approvals:** View/create in org, owners/admins can update

---

#### `003_add_role_to_invites.sql`

Adds role field to organization invites table.

---

#### `003_notifications.sql`

Creates push subscriptions table for web push notifications.

**Tables Created:**
- `push_subscriptions` - id, user_id, organization_id, endpoint, subscription_json

**Key Features:**
- Stores Web Push subscription objects per user/device
- Includes RLS policies for user-scoped access
- Links subscriptions to both user and organization for targeting

---

#### `004_context_table.sql`

Creates context table for storing curated org knowledge for AI grounding.

**Tables Created:**
- `contexts` - id, organization_id, title, content, tags, updated_by, created_at, updated_at

**Key Features:**
- Stores org-specific business context snippets
- Used to ground AI chat responses with business knowledge
- Supports tagging for categorization
- Tracks who last updated each context entry
- Ordered by `updated_at` for recency-based retrieval

---

#### `004_relax_role_constraints.sql`

Relaxes role constraints to allow more flexible role management.

---

#### `005_ensure_role_column.sql`

Ensures role column exists in profiles table with proper constraints.

---

#### `006_fix_push_rls.sql`

Fixes Row Level Security policies for push_subscriptions table.

**Key Changes:**
- Ensures users can only view/manage their own push subscriptions
- Adds proper organization-scoped policies

---

## Key Patterns & Architecture

### Authentication Flow

1. **Signup:**
   - User creates account via Supabase Auth
   - Trigger creates profile in `profiles` table
   - Organization created and assigned to profile
   - Default AI assistant channel created
   - User redirected to dashboard

2. **Login:**
   - User authenticates via Supabase Auth
   - Middleware validates session
   - Profile fetched to get organization_id
   - User redirected to dashboard

3. **Invite Flow:**
   - Admin/owner generates invite via `/api/invite`
   - Invite code stored in `organization_invites` table
   - User signs up with invite code in URL
   - Profile updated with organization_id
   - Invite marked as accepted

4. **Middleware:**
   - Runs on all routes except static files
   - Validates Supabase session
   - Redirects unauthenticated users to `/login`
   - Allows access to auth pages when not authenticated

**Files:**
- `middleware.ts` - Next.js middleware
- `lib/supabase/middleware.ts` - Session update helper
- `hooks/useAuth.ts` - Client-side auth hook

---

### Chat & Realtime Pattern

1. **Channel Selection:**
   - User selects channel from sidebar
   - `useChat` hook fetches messages for channel
   - Realtime subscription established for channel
   - Messages displayed in chat stream

2. **Message Sending:**
   - User types message and submits
   - Message inserted into `messages` table
   - Realtime subscription receives INSERT event
   - Message added to UI state
   - If AI channel or "@native" mentioned, AI responds

3. **AI Response:**
   - Message sent to `/api/chat` with history
   - Gemini API called with system prompt
   - Response inserted as assistant message
   - Realtime subscription updates UI

**Files:**
- `hooks/useChat.ts` - Chat hook with realtime
- `components/chat-stream.tsx` - Chat UI component
- `app/api/chat/route.ts` - AI chat endpoint

---

### Data Flow Pattern

1. **Organization-Scoped:**
   - All data queries filtered by `organization_id`
   - User's organization fetched from profile
   - RLS policies enforce organization isolation

2. **Real-time Updates:**
   - Supabase Realtime subscriptions for live data
   - Channel-based subscriptions for messages
   - Automatic UI updates on database changes

3. **Error Handling:**
   - Canonical error envelope: `{ error: { code, message, details } }`
   - Consistent error codes across API routes
   - Client-side error state management

---

### Styling Pattern

1. **CSS Variables:**
   - Theme-aware CSS variables in `globals.css`
   - Light/dark mode via `data-theme` attribute
   - iOS-inspired design tokens

2. **Tailwind CSS:**
   - Utility-first approach
   - Custom theme configuration
   - Responsive design utilities

3. **Component Styling:**
   - CSS variables for colors
   - Framer Motion for animations
   - iOS-style spring animations

**Files:**
- `app/globals.css` - Global styles and variables
- `lib/animations.ts` - Animation variants
- `components/theme-provider.tsx` - Theme context

---

### Package Workspace Pattern

1. **Local Development:**
   - Packages referenced via path aliases
   - TypeScript resolves to source files
   - No build step required for development

2. **Package Structure:**
   - Each package has own `package.json` and `tsconfig.json`
   - Exports via `src/index.ts`
   - Shared types and utilities

3. **Import Pattern:**
   ```typescript
   import type { Insight } from "@native/types"
   import { Button } from "@native/ui"
   import { formatRelativeTime } from "@native/utils"
   ```

---

### Animation Pattern

1. **Framer Motion Variants:**
   - Predefined variants in `lib/animations.ts`
   - iOS-style spring animations
   - Consistent timing across app

2. **Common Animations:**
   - `chatMessageFadeIn` - Message entry
   - `staggerContainer` / `staggerItem` - List animations
   - `iosSheet` - Modal/sheet entry
   - `slideUpFadeIn` - General fade with slide

3. **Usage:**
   ```typescript
   <motion.div variants={chatMessageFadeIn} initial="initial" animate="animate">
     {content}
   </motion.div>
   ```

---

## PWA & Service Worker

**Files:**
- `public/manifest.webmanifest` - PWA manifest with app metadata
- `public/sw.js` - Service worker for caching and push notifications
- `components/sw-register.tsx` - Client-side service worker registration
- `types/web-push.d.ts` - TypeScript declarations for web-push library

**Features:**
- Progressive Web App with installable manifest
- Service worker caches static assets (shell caching strategy)
- Push notification support via Web Push API
- Background notification handling
- Notification click handling with URL navigation

**Implementation:**
1. Service worker registers on page load via `sw-register.tsx`
2. User grants notification permission
3. Push subscription created with VAPID public key
4. Subscription sent to `/api/push/subscribe` and stored in database
5. Server can send push via `/api/push/send` or `lib/push-service.ts`
6. Service worker receives push and displays notification
7. User clicks notification → navigates to URL in payload

---

## Environment Variables

Required environment variables in `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI
GEMINI_API_KEY=your-gemini-api-key

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# Web Push (VAPID)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
VAPID_SUBJECT=mailto:your-email@example.com

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** Legacy variable names (`SUPABASE_URL`, `SUPABASE_KEY`) are supported for compatibility.

**VAPID Key Generation:**
```bash
npx web-push generate-vapid-keys
```

---

## Key Files Reference

### Entry Points
- `app/(marketing)/page.tsx` - Marketing landing page
- `app/(dashboard)/dashboard/page.tsx` - Main dashboard page
- `app/page.tsx` - Root page (redirects)
- `app/layout.tsx` - Root layout with service worker
- `middleware.ts` - Auth middleware

### Core Logic
- `hooks/useChat.ts` - Chat functionality
- `hooks/useAuth.ts` - Authentication
- `hooks/useNotifications.ts` - Browser notifications
- `lib/context.ts` - Organization context fetcher
- `lib/push-service.ts` - Web push service
- `lib/utils.ts` - Utility functions

### API Routes
- `app/api/chat/route.ts` - AI chat with context grounding
- `app/api/insights/route.ts` - Insights API
- `app/api/insights/generate/route.ts` - Insight generation
- `app/api/contexts/route.ts` - Context management
- `app/api/messages/send/route.ts` - Message sending with push
- `app/api/push/subscribe/route.ts` - Push subscription
- `app/api/push/send/route.ts` - Push notification sending
- `app/api/tasks/route.ts` - Tasks API
- `app/api/policy/check/route.ts` - Authorization

### Components
- `components/chat-stream.tsx` - Chat UI
- `components/channel-sidebar.tsx` - Sidebar
- `components/dashboard-header.tsx` - Header
- `components/sw-register.tsx` - Service worker registration
- `components/landing/*` - Landing page sections

### PWA & Service Worker
- `public/manifest.webmanifest` - PWA manifest
- `public/sw.js` - Service worker
- `types/web-push.d.ts` - Web push types

### Configuration
- `tsconfig.json` - TypeScript config
- `next.config.ts` - Next.js config
- `package.json` - Dependencies
- `app/globals.css` - Global styles

---

## Development Workflow

1. **Setup:**
   ```bash
   npm install
   # Create .env.local with Supabase and Gemini keys
   npm run dev
   ```

2. **Database:**
   - Run migrations in Supabase dashboard
   - Or use Supabase CLI: `supabase db push`

3. **Development:**
   - Packages are linked via path aliases
   - Hot reload works across packages
   - TypeScript checks all packages

4. **Build:**
   ```bash
   npm run build
   npm start
   ```

---

## Notes

- This codebase is a migration from NativeIQ (Nuxt/Vue) to Next.js/React
- Shared packages (`@native/types`, `@native/ui`, `@native/utils`) are lifted from NativeIQ
- Design system follows iOS-inspired refined minimalism
- All API routes follow canonical error envelope pattern
- Real-time features use Supabase Realtime subscriptions
- Authentication uses Supabase Auth with Row Level Security
- Progressive Web App (PWA) capabilities with service worker and web push notifications
- Rule-based insight generation from team messages (risk, decision, profit signals)
- Context management system for AI grounding with organization-specific knowledge
- Marketing landing page with interactive demos and feature sections
- Email invitations via Resend API
- Push notifications via Web Push API with VAPID keys

---

## Recent Updates

**Insights Generation:**
- Added rule-based insight generator (`/api/insights/generate`)
- Scans team messages from last 24 hours
- Classifies messages as risk, decision, or profit signals based on keywords
- Creates insights with appropriate type, confidence, and impact
- Ignores AI prompts (messages mentioning `@native`)
- Links insights to source messages

**PWA & Push Notifications:**
- Service worker registration with push subscription
- Web push notifications for new messages
- Push subscriptions stored in database per user/device
- Notification delivery via `/api/messages/send`
- Background notification handling with click navigation

**Marketing Site:**
- Complete landing page with hero, features, and CTAs
- Interactive chat demo component
- Pricing and research pages
- Separate route group for marketing pages

**Context Management:**
- `contexts` table for storing curated org knowledge
- `/api/contexts` for managing context entries
- AI chat uses top 10 contexts for grounding responses
- Supports tags for categorization

---

*Last updated: 2025-12-29 - Codebase indexing after landing page, PWA, and insights generation implementation*

