/**
 * Hook for managing Google OAuth integration
 */

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { logger } from "@/lib/logger";

interface GoogleIntegrationStatus {
  isConnected: boolean;
  scopes: string[];
  loading: boolean;
  error: string | null;
}

export function useGoogleIntegration() {
  const [status, setStatus] = useState<GoogleIntegrationStatus>({
    isConnected: false,
    scopes: [],
    loading: true,
    error: null,
  });

  const checkConnection = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStatus({
          isConnected: false,
          scopes: [],
          loading: false,
          error: null,
        });
        return;
      }

      const { data, error } = await supabase
        .from("oauth_tokens")
        .select("scope")
        .eq("user_id", user.id)
        .eq("provider", "google")
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found", which is expected
        logger.error("Error checking Google connection:", error);
        setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
        return;
      }

      setStatus({
        isConnected: !!data,
        scopes: data?.scope?.split(" ") || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      logger.error("Error checking Google connection:", error);
      setStatus((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  };

  const connect = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/oauth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          includeGmail: true,
          includeDrive: true,
          returnTo: "/integrations",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        logger.error("OAuth initiation failed:", errorData);
        throw new Error(errorData.error || "Failed to initiate OAuth flow");
      }

      const { authUrl } = await response.json();

      if (!authUrl) {
        throw new Error("No authorization URL received");
      }

      // Redirect to Google OAuth
      window.location.href = authUrl;
    } catch (error) {
      logger.error("Error connecting Google:", error);
      setStatus((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to connect",
      }));
    }
  };

  const disconnect = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/oauth/google/disconnect", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to disconnect");
      }

      setStatus({
        isConnected: false,
        scopes: [],
        loading: false,
        error: null,
      });
    } catch (error) {
      logger.error("Error disconnecting Google:", error);
      setStatus((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to disconnect",
      }));
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return {
    ...status,
    connect,
    disconnect,
    refresh: checkConnection,
  };
}

