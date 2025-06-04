"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/lib/hooks/useUserSession";
import Loading from "./layout/Loading";

type VerifySessionProps = {
  children: ReactNode;
};

export default function VerifySession({ children }: VerifySessionProps) {
  const { user, loading } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // si pas de session, on renvoie vers login
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return null;
  }
  return <>{children}</>;
}
