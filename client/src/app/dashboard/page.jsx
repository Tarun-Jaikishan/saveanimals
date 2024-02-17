"use client";

import { useLayoutEffect } from "react";
import { ProtectedRoute } from "../ProtectedRoute";

export default function page() {
  useLayoutEffect(() => {
    ProtectedRoute();
  }, []);
  return <div>page</div>;
}
