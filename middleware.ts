// middleware.ts

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cache en mémoire pour éviter les requêtes DB répétées
const roleCache = new Map<string, { role: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Sessions actives pour éviter les vérifications répétées
const activeSessionCache = new Map<
  string,
  { valid: boolean; timestamp: number }
>();
const SESSION_CACHE_DURATION = 30 * 1000; // 30 secondes

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip pour les fichiers statiques, API et auth callback
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth/callback") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    // Récupération rapide de la session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Middleware auth error:", error);
      return res;
    }

    const sessionToken = session?.access_token;

    // Protection des routes dashboard
    if (pathname.startsWith("/dashboard")) {
      if (!session || !sessionToken) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Cache de session pour éviter les vérifications répétées
      const sessionCached = activeSessionCache.get(sessionToken);
      if (
        sessionCached &&
        Date.now() - sessionCached.timestamp < SESSION_CACHE_DURATION
      ) {
        if (!sessionCached.valid) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      } else {
        // Marquer la session comme valide
        activeSessionCache.set(sessionToken, {
          valid: true,
          timestamp: Date.now(),
        });
      }

      // Vérification de rôle uniquement pour les routes spécifiques
      if (pathname.includes("/admin") || pathname.includes("/client")) {
        const userId = session.user.id;
        let userRole = "client";

        // Vérifier le cache de rôle
        const roleCached = roleCache.get(userId);
        if (roleCached && Date.now() - roleCached.timestamp < CACHE_DURATION) {
          userRole = roleCached.role;
        } else {
          // Requête rapide avec timeout
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            const { data: profile } = await supabase
              .from("profiles")
              .select("role")
              .eq("user_id", userId)
              .abortSignal(controller.signal)
              .single();

            clearTimeout(timeoutId);
            userRole = profile?.role || "client";
            roleCache.set(userId, { role: userRole, timestamp: Date.now() });
          } catch (err) {
            // En cas d'erreur, utiliser 'client' par défaut
            console.warn("Profile fetch failed, using default role");
            roleCache.set(userId, { role: "client", timestamp: Date.now() });
          }
        }

        const requiredRole = pathname.includes("/admin") ? "admin" : "client";
        if (userRole !== requiredRole) {
          return NextResponse.redirect(
            new URL(`/dashboard/${userRole}`, req.url)
          );
        }
      }
    }

    // Redirection si déjà connecté sur login
    if (pathname === "/login" && session) {
      const userId = session.user.id;
      let userRole = "client";

      const roleCached = roleCache.get(userId);
      if (roleCached && Date.now() - roleCached.timestamp < CACHE_DURATION) {
        userRole = roleCached.role;
      } else {
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", userId)
            .single();

          userRole = profile?.role || "client";
          roleCache.set(userId, { role: userRole, timestamp: Date.now() });
        } catch {
          userRole = "client";
        }
      }

      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
    }

    // Redirection de la page d'accueil
    if (pathname === "/" && session) {
      const userId = session.user.id;
      const roleCached = roleCache.get(userId);
      const userRole = roleCached?.role || "client";

      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
    }
  } catch (error) {
    console.error("Middleware unexpected error:", error);
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
