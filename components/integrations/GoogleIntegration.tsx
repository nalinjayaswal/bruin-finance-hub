"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, HardDrive, Check, X } from "lucide-react";

interface GoogleIntegrationProps {
  isConnected: boolean;
  scopes?: string[];
  onConnect: () => void;
  onDisconnect: () => void;
  loading?: boolean;
}

export function GoogleIntegration({
  isConnected,
  scopes = [],
  onConnect,
  onDisconnect,
  loading = false,
}: GoogleIntegrationProps) {
  const hasGmail = scopes.some((s) =>
    s.includes("gmail") || s.includes("mail.google.com")
  );
  const hasDrive = scopes.some((s) =>
    s.includes("drive") || s.includes("drive.google.com")
  );

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 text-white"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-fg-primary)]">
              Google Account
            </h3>
            <p className="text-sm text-[var(--color-fg-tertiary)]">
              Connect Gmail and Google Drive
            </p>
          </div>
        </div>

        {isConnected && (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500 font-medium">
              Connected
            </span>
          </div>
        )}
      </div>

      {isConnected && (
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-[var(--color-fg-secondary)]">
            <Mail className="w-4 h-4" />
            <span>Gmail</span>
            {hasGmail ? (
              <Check className="w-4 h-4 text-green-500 ml-auto" />
            ) : (
              <X className="w-4 h-4 text-red-500 ml-auto" />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-fg-secondary)]">
            <HardDrive className="w-4 h-4" />
            <span>Google Drive</span>
            {hasDrive ? (
              <Check className="w-4 h-4 text-green-500 ml-auto" />
            ) : (
              <X className="w-4 h-4 text-red-500 ml-auto" />
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {isConnected ? (
          <Button
            onClick={onDisconnect}
            variant="outline"
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Disconnecting..." : "Disconnect"}
          </Button>
        ) : (
          <Button
            onClick={onConnect}
            variant="primary"
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Connecting..." : "Connect Google Account"}
          </Button>
        )}
      </div>
    </Card>
  );
}


