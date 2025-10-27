import { generatePlan } from "@/lib/gemini";
import { createServerClient } from "@/lib/supabaseServer";
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

    const supabase = createServerClient(() => req.cookies);

    const { data, error } = await supabase.from("plans").insert([
      { ...plan, user_id },
    ]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      error: (err as Error).message || "Erro ao criar plano",
    }, { status: 500 });
  }
}
