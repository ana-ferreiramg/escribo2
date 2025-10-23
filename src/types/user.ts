export interface User {
  id: string;
  name: string;
  email: string;
  role: "TEACHER" | "ADMIN";
  created_at: string;
}
