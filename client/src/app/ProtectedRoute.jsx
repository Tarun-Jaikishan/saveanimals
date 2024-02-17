"use client";

import { redirect } from "next/navigation";

export function ProtectedRoute() {
  const token = window.sessionStorage.getItem("access_token");

  if (!token) return redirect("/");
}
