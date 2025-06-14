import { NextResponse } from 'next/server';

import ENV_CONFIG from '@/config/env-config';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${ENV_CONFIG.backendUrl}/jobs/${id}`);
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
