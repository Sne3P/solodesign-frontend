"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageLoading } from "@/components/ui/Loading";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !hasRedirected) {
      if (user?.profile?.role) {
        router.replace(`/dashboard/${user.profile.role}`);
      } else if (!user) {
        router.replace("/login");
      }
    }
  }, [user, loading, router, hasRedirected]);

  return <PageLoading text="Redirection..." />;
}
