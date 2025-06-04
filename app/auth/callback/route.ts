import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Erreur lors de l'échange du code:", error);
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=auth_failed`
        );
      }

      // Récupération de la session et du profil
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        const role = profile?.role || "client";
        return NextResponse.redirect(`${requestUrl.origin}/dashboard/${role}`);
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
    }
  }

  // Fallback en cas d'erreur
  return NextResponse.redirect(`${requestUrl.origin}/login`);
}
