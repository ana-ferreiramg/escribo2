import { generatePlan } from "@/lib/gemini";
import { supabase } from "@/lib/supabaseClient";
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

    const { data, error } = await supabase.from("plans").insert([{
      ...plan,
      user_id,
    }]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao criar plano" }, { status: 500 });
  }
}
