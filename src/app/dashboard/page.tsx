/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardContent from "@/app/dashboard/DashboardContent";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const mappedUser: User = {
          id: data.user.id,
          name: (data.user.user_metadata as any)?.full_name || "Sem nome",
          email: data.user.email!,
          role: (data.user.user_metadata as any)?.role || "TEACHER",
          created_at: data.user.created_at
        };
        setUser(mappedUser);
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

  if (!user) return <p>Carregando...</p>;

  return <DashboardContent user={user} />;
}
