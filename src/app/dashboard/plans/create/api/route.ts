import { generatePlan } from "@/lib/gemini";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { theme, introduction, learning_objective, user_id } = await req
      .json();

    if (!theme || !user_id) {
      return NextResponse.json({ error: "Faltando campos obrigatórios" }, {
        status: 400,
      });
    }

    const plan = await generatePlan({
      theme,
      introduction,
      learning_objective,
    });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabase.from("plans").insert([{
      ...plan,
      user_id,
    }]).select();

    if (error) {
      console.error("Erro Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Erro geral POST route:", err);
    return NextResponse.json({
      error: (err as Error).message || "Erro ao criar plano",
    }, { status: 500 });
  }
}
