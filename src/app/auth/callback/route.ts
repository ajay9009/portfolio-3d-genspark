import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const error_desc = searchParams.get('error_description');
  const error_code = searchParams.get('error');

  // If Supabase reports an invalid or expired link
  if (error_code || error_desc) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_desc || error_code || 'auth_failed')}`);
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If no code is present, it might be an implicit flow (like password recovery)
  // where the token is in the URL hash fragment. The server can't see the hash,
  // so we must redirect to the 'next' URL and let the client-side Supabase SDK handle it.
  return NextResponse.redirect(`${origin}${next}`);
}
