"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { useCallback, useEffect } from "react";

export function useAuthRouter() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const redirectToRole = useCallback(
    (role: string) => {
      const path = `/dashboard/${role}`;
      router.replace(path);
    },
    [router]
  );

  const redirectToLogin = useCallback(() => {
    router.replace("/login");
  }, [router]);

  const redirectToDashboard = useCallback(() => {
    if (user?.profile?.role) {
      redirectToRole(user.profile.role);
    } else {
      redirectToLogin();
    }
  }, [user, redirectToRole, redirectToLogin]);

  // Auto-redirection depuis la page d'accueil
  const handleHomeRedirect = useCallback(() => {
    if (!loading) {
      if (user) {
        redirectToDashboard();
      } else {
        redirectToLogin();
      }
    }
  }, [loading, user, redirectToDashboard, redirectToLogin]);

  return {
    redirectToRole,
    redirectToLogin,
    redirectToDashboard,
    handleHomeRedirect,
    isReady: !loading,
  };
}
