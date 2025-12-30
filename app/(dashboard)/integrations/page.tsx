"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GoogleIntegration } from "@/components/integrations/GoogleIntegration";
import { useGoogleIntegration } from "@/hooks/useGoogleIntegration";
import { AlertCircle, CheckCircle } from "lucide-react";

function IntegrationsContent() {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("success");
  const errorMessage = searchParams.get("error");

  const googleIntegration = useGoogleIntegration();

  // Show success/error notifications
  const [notification, setNotification] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  React.useEffect(() => {
    if (successMessage === "google-connected") {
      setNotification({
        type: "success",
        message: "Google account connected successfully!",
      });
      setTimeout(() => setNotification(null), 5000);
    } else if (errorMessage) {
      setNotification({
        type: "error",
        message: decodeURIComponent(errorMessage),
      });
      setTimeout(() => setNotification(null), 5000);
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-fg-primary)] mb-2">
            Integrations
          </h1>
          <p className="text-[var(--color-fg-tertiary)]">
            Connect external services to enhance your workflow
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              notification.type === "success"
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <p
                className={`text-sm font-medium ${
                  notification.type === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {notification.message}
              </p>
              <button
                onClick={() => setNotification(null)}
                className="ml-auto text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-primary)]"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Google Integration */}
        <div className="mb-6">
          <GoogleIntegration
            isConnected={googleIntegration.isConnected}
            scopes={googleIntegration.scopes}
            onConnect={googleIntegration.connect}
            onDisconnect={googleIntegration.disconnect}
            loading={googleIntegration.loading}
          />
        </div>

        {/* Coming Soon */}
        <div className="p-6 border border-dashed border-[var(--color-border-subtle)] rounded-lg text-center">
          <p className="text-[var(--color-fg-tertiary)] text-sm">
            More integrations coming soon: Slack, Microsoft 365, Dropbox, and
            more.
          </p>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 p-6 bg-[var(--color-bg-subtle)] rounded-lg">
          <h2 className="text-lg font-semibold text-[var(--color-fg-primary)] mb-3">
            What you can do with Google integration:
          </h2>
          <ul className="space-y-2 text-sm text-[var(--color-fg-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-accent)]">•</span>
              <span>
                <strong>Gmail:</strong> Send and receive emails directly from
                Native, analyze email threads, and automate responses
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-accent)]">•</span>
              <span>
                <strong>Google Drive:</strong> Access, upload, and organize
                files, sync documents with your team, and generate reports
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-accent)]">•</span>
              <span>
                <strong>AI Integration:</strong> Your AI co-founder can read
                your emails and files to provide better context and insights
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-bg-base)] flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <IntegrationsContent />
    </Suspense>
  );
}

