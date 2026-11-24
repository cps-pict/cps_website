import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextInstance";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setLoading(false);
      return;
    }

    // 1. Get initial active session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to retrieve Supabase session:", err);
        setUser(null);
        setLoading(false);
      });

    // 2. Listen for auth changes (sign in, sign out, token refresh)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async (redirectPath) => {
    if (!isSupabaseConfigured) {
      alert(
        "Authentication is currently unavailable because local Supabase credentials are not configured.\n\nThe website is running in guest mode."
      );
      return;
    }

    try {
      const defaultRedirect = new URL("/totw", window.location.origin).toString();
      const requestedRedirect =
        typeof redirectPath === "string" && redirectPath.startsWith("/") && !redirectPath.startsWith("//")
          ? new URL(redirectPath, window.location.origin)
          : null;
      const redirectTo = requestedRedirect?.origin === window.location.origin
        ? requestedRedirect.toString()
        : defaultRedirect;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Google sign-in error:", err.message);
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Sign-out error:", err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
