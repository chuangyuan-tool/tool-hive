import { redirect } from "next/navigation";

// /signup 为旧入口，统一重定向到 /register（避免 404）
export default function SignupPage() {
  redirect("/register");
}
