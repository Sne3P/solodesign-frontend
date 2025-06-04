"use client";

import * as React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@/lib/supabase/client";
import { AuthUser, UserProfile } from "@/lib/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  // Création d'un profil par défaut à partir de l'utilisateur auth
  const createDefaultProfile = useCallback((authUser: User): UserProfile => {
    return {
      id: authUser.id,
      user_id: authUser.id,
      full_name: authUser.email ? authUser.email.split("@")[0] : "Utilisateur",
      role: "client",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }, []);

  // Récupère le profil utilisateur dans Supabase
  const fetchUserProfile = useCallback(
    async (authUser: User): Promise<UserProfile> => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", authUser.id)
          .single();

        if (error || !data) {
          console.warn("[useAuth] Profil non trouvé pour:", authUser.id);
          return createDefaultProfile(authUser);
        }
        return data;
      } catch (err) {
        console.error(
          "[useAuth] Erreur lors de la récupération du profil:",
          err
        );
        return createDefaultProfile(authUser);
      }
    },
    [supabase, createDefaultProfile]
  );

  // Met à jour l'état utilisateur
  const updateUserState = useCallback(async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session && session.user) {
      console.log("[useAuth] Auth change: SIGNED_IN");
      const profile = await fetchUserProfile(session.user);
      console.log("[useAuth] Récupération profil pour:", session.user.id);
      setUser({
        id: session.user.id,
        email: session.user.email || "",
        profile,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [supabase, fetchUserProfile]);

  const refreshProfile = useCallback(async () => {
    await updateUserState();
  }, [updateUserState]);

  const signOut = useCallback(async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError("Erreur lors de la déconnexion");
    } else {
      setUser(null);
      setError(null);
    }
    setLoading(false);
  }, [supabase]);

  const clearError = useCallback(() => setError(null), []);

  // Initialisation de l'authentification et écoute des changements
  useEffect(() => {
    updateUserState();
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await updateUserState();
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [updateUserState, supabase]);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signOut,
      refreshProfile,
      clearError,
    }),
    [user, loading, error, signOut, refreshProfile, clearError]
  );

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthState() {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, loading };
}
