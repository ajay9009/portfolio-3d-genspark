import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, payload } = body;

    // Verify signature
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return NextResponse.json({ ok: false, error: 'Bad signature' }, { status: 400 });
    }

    // Process based on type
    if (payload.type === 'booking') {
      await admin.from('bookings').insert({
        user_id: payload.userId,
        service_id: payload.serviceId,
        booking_date: payload.date,
        time_slot: payload.time,
        status: 'paid',
        user_email: payload.userEmail || null,
        user_name: payload.userName || null,
        razorpay_order_id,
        razorpay_payment_id,
        amount_inr: payload.amount,
      });
    } else if (payload.type === 'course') {
      await admin.from('course_purchases').insert({
        user_id: payload.userId,
        course_id: payload.courseId,
        razorpay_payment_id,
        amount_inr: payload.amount,
      });
    }

    // Log payment
    await admin.from('payments').insert({
      user_id: payload.userId,
      type: payload.type,
      amount_inr: payload.amount,
      status: 'success',
      razorpay_order_id,
      razorpay_payment_id,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
