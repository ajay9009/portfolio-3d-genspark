import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { name, email, msg } = await req.json();

    if (!name || !email || !msg) {
      return NextResponse.json({ ok: false, error: 'All fields are required' }, { status: 400 });
    }

    // Save to visitors table in Supabase
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await supabase.from('visitors').insert({
        name,
        email,
        message: msg,
        status: 'new',
      });
    } catch (dbError) {
      // DB save failed but we still respond OK (message was received)
      console.error('Failed to save to DB:', dbError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
