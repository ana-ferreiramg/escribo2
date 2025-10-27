"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePlanForm from "./CreatePlanForm";

export default function CreatePlanPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUserId(data.user.id);
      } else {
        router.push("/login");
      }
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return userId ? <CreatePlanForm userId={userId} /> : null;
}
