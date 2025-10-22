import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
serve(async (req) => {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, name",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { user_id, name, email } = await req.json();
  const { data, error } = await supabase.auth.admin.updateUserById(user_id, {
    email,
    user_metadata: {
      full_name: name,
    },
  });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const { error: userError } = await supabase.from("users").insert([
    {
      id: user_id,
      name,
      email,
      role: "TEACHER",
    },
  ]);
  if (userError) {
    const errorMsg = userError.code === "23505" // código de UNIQUE violation no PostgreSQL
      ? "Email já cadastrado."
      : userError.message;
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 400,
      headers: corsHeaders,
    });
  }
  return new Response(
    JSON.stringify({
      message: "Usuário salvo com sucesso!",
    }),
    {
      headers: corsHeaders,
    },
  );
});
