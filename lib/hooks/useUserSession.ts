// /lib/hooks/useUserSession.ts
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export type UserSession = { id: string; email: string } | null;

export function useUserSession() {
  const [user, setUser] = useState<UserSession>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchSessionAndRole() {
      try {
        const {
          data: { session },
          error: sessionErr,
        } = await supabase.auth.getSession();

        if (sessionErr) {
          console.error("[useUserSession] getSession:", sessionErr.message);
        }

        if (session?.user) {
          const currentUser = session.user;

          if (mounted) {
            setUser({
              id: currentUser.id,
              email: currentUser.email || "",
            });
          }

          // ✅ Lecture directe du rôle
          const { data: prof, error: profErr } = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", currentUser.id)
            .single();

          if (profErr) {
            console.error("[useUserSession] profiles:", profErr.message);
          }

          const roleName = prof?.role || "client";

          if (mounted) {
            setRole(roleName);
          }
        } else {
          if (mounted) {
            setUser(null);
            setRole(null);
          }
        }

        if (mounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error("[useUserSession] Erreur:", err);
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchSessionAndRole();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchSessionAndRole();
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, role, loading };
}
