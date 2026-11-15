import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verify credentials exist and are not unedited placeholders from .env.example
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project-id.supabase.co" &&
  supabaseAnonKey !== "your-supabase-publishable-key"
);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase credentials missing or unconfigured. Running in guest mode with safe fallback client."
  );
}

// Fallback no-op client to prevent uncaught runtime exceptions when credentials are absent
const createNoopClient = () => {
  const chainable = {
    select: () => chainable,
    eq: () => chainable,
    order: () => chainable,
    limit: () => chainable,
    upsert: async () => ({ data: null, error: new Error("Supabase is not configured.") }),
    delete: () => chainable,
    then: (resolve) => Promise.resolve({ data: [], error: null }).then(resolve)
  };

  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
      signInWithOAuth: async () => ({
        data: null,
        error: new Error("Supabase credentials are not configured.")
      }),
      signOut: async () => ({ error: null })
    },
    from: () => chainable
  };
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createNoopClient();
