interface UserInputPlan {
  theme: string;
  introduction?: string;
  learning_objective?: string;
}

export async function generatePlan(userInput: UserInputPlan) {
  const response = await fetch("https://api.gemini.com/v2/flash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "flash-2.5",
      prompt: `Com base nesses dados: ${
        JSON.stringify(userInput)
      }, gere um plano completo em JSON incluindo theme, introduction, learning_objective, activity_steps (array de objetos {step, duration}), evaluation_rubric (array de objetos {criterion, weight})`,
      temperature: 0.7,
      max_output_tokens: 500,
    }),
  });

  const data = await response.json();
  const planJson = JSON.parse(data.output_text);

  return planJson;
}
