import { createClient } from "@supabase/supabase-js";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export function createServerClient(cookies: () => RequestCookies) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key) => cookies().get(key)?.value ?? null,
        setItem: () => {},
        removeItem: () => {},
      },
    },
  });
}
