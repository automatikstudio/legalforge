import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Forward to tracking server on VPS
    await fetch('http://77.42.94.208:3458/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: 'legalforge',
        plan: data.plan || 'unknown',
        page: data.page || '/',
        action: data.action || 'pricing_click',
        meta: data.meta || undefined,
      }),
    }).catch(() => {}); // Don't fail if tracking is down
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Always succeed for UX
  }
}
