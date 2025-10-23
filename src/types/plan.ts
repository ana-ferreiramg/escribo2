/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Plan {
  id: string;
  user_id: string;
  theme?: string | null;
  introduction?: string | null;
  learning_objective?: string | null;
  activity_steps: any[];
  evaluation_rubric: any[];
  created_at: string;
}
