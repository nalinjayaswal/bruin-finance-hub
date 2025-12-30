"use client";

import { useEffect, useState } from "react";

export default function AuthTestPage() {
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setAuthStatus(data);
        setLoading(false);
      })
      .catch((error) => {
        setAuthStatus({ error: error.message });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-base)] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--color-fg-primary)] mb-4">
          Authentication Status
        </h1>
        <pre className="bg-[var(--color-bg-subtle)] p-4 rounded-lg text-sm overflow-auto">
          {JSON.stringify(authStatus, null, 2)}
        </pre>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => window.location.href = "/integrations"}
            className="w-full py-3 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:opacity-90"
          >
            Go to Integrations
          </button>
          <button
            onClick={() => {
              fetch("/api/oauth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  includeGmail: true,
                  includeDrive: true,
                }),
              })
                .then((res) => res.json())
                .then((data) => alert(JSON.stringify(data, null, 2)))
                .catch((error) => alert("Error: " + error.message));
            }}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:opacity-90"
          >
            Test OAuth API
          </button>
        </div>
      </div>
    </div>
  );
}

