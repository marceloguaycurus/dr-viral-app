// utils/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup", "/reset-password"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          ),
      },
    },
  );

  // renova tokens e obtém sessão
  await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname, searchParams } = request.nextUrl;
  const isPublic = PUBLIC_ROUTES.some((p) => pathname.startsWith(p));

  /* ------------------------------------------------------------------ */
  /* 1. Não logado  → bloqueia rotas privadas ------------------------- */
  if (!session && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  /* 2. Logado      → bloqueia rotas públicas ------------------------- */
  if (session && isPublic) {
    const redirectTo = "/";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  /* ------------------------------------------------------------------ */

  return response; // segue o fluxo normal
}
