import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    // Verify the requesting user is an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify the user's JWT and check admin role
    const userClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: userData, error: userError } = await userClient.auth.getUser(token);
    if (userError || !userData.user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check admin role
    const { data: profile } = await admin
      .from('profiles')
      .select('role')
      .eq('id', userData.user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Fetch all admin data using service role (bypasses RLS)
    const [courses, bookings, payments, visitors] = await Promise.all([
      admin.from('courses').select('*').order('created_at', { ascending: false }),
      admin.from('bookings').select('*, services(title, price_inr)').order('created_at', { ascending: false }),
      admin.from('payments').select('*').order('created_at', { ascending: false }),
      admin.from('visitors').select('*').order('created_at', { ascending: false }),
    ]);

    return NextResponse.json({
      courses: courses.data || [],
      bookings: bookings.data || [],
      payments: payments.data || [],
      visitors: visitors.data || [],
    });
  } catch (error) {
    console.error('Admin data fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
