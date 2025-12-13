"use client";

import { useUserAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Protected({ children }) {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/sign-in");
  }, [user]);

  if (!user) return null;  
  return children;
}
