import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

serve(async (req) => {
  try {
    const { user_id, theme, introduction, learning_objective } = await req
      .json();

    const response = await fetch("https://api.gemini.com/v2.5/flash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("GEMINI_API_KEY")}`,
      },
      body: JSON.stringify({
        theme,
        introduction,
        learning_objective,
      }),
    });

    const geminiData = await response.json();

    const { data, error } = await supabase
      .from("plans")
      .insert({
        user_id,
        theme,
        introduction,
        learning_objective,
        activity_steps: geminiData.activity_steps,
        evaluation_rubric: geminiData.evaluation_rubric,
      });

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 400,
    });
  }
});
