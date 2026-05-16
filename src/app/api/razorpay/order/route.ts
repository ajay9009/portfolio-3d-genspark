import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, receipt } = await req.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'rzp_test_xxx' || keySecret === 'xxx') {
      return NextResponse.json(
        { error: 'Razorpay is not configured. Please add your API keys to .env.local.' },
        { status: 500 }
      );
    }

    // Validate amount
    const amountInr = Number(amount);
    if (!amountInr || amountInr < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Use Razorpay REST API directly (more reliable than SDK with live keys)
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(amountInr * 100), // Convert to paise
        currency: 'INR',
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: {
          source: 'portfolio_website',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Razorpay API error:', data);
      return NextResponse.json(
        { error: data.error?.description || 'Failed to create Razorpay order' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Razorpay order error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
