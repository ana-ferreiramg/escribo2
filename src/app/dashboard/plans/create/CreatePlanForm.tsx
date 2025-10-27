"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreatePlanFormProps {
  userId: string;
}

export default function CreatePlanForm({ userId }: CreatePlanFormProps) {
  const [theme, setTheme] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [learningObjective, setLearningObjective] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/plans/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          theme,
          introduction,
          learning_objective: learningObjective,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        console.error("Erro:", data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <div>
        <label>Tema:</label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Introdução:</label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Objetivo de Aprendizagem:</label>
        <input
          type="text"
          value={learningObjective}
          onChange={(e) => setLearningObjective(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-sky-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Gerando plano..." : "Gerar Plano"}
      </button>
    </form>
  );
}
