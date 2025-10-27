import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import CreatePlanForm from "./CreatePlanForm";

export default async function Page() {
  const cookieStore = await cookies();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
        storage: {
          getItem: (key: string) => cookieStore.get(key)?.value ?? null,
          setItem: () => { },
          removeItem: () => { },
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return <p>You must be logged in to create a plan.</p>;
  }

  return <CreatePlanForm userId={session.user.id} />;
}
