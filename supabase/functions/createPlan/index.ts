import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, name",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { user_id, theme, introduction, learning_objective } = await req
      .json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        Deno.env.get("GEMINI_API_KEY")
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("GEMINI_API_KEY")}`,
        },
        body: JSON.stringify({
          model: "gemini-1.5-flash",
          content: [
            {
              type: "text",
              text: `Crie um plano de estudo:
                    Tema: ${theme}
                    Introdução: ${introduction || "Sem introdução"}
                    Objetivo de aprendizagem: ${
                learning_objective || "Não informado"
              }`,
            },
          ],
        }),
      },
    );

    const geminiData = await response.json();

    const activity_steps = geminiData?.candidates?.[0]?.content?.[0]?.text ||
      "";
    const evaluation_rubric = geminiData?.candidates?.[0]?.content?.[1]?.text ||
      "";

    const { data, error } = await supabase.from("plans").insert([{
      user_id,
      theme,
      introduction,
      learning_objective,
      activity_steps,
      evaluation_rubric,
    }]).select();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: corsHeaders },
    );
  }
});
