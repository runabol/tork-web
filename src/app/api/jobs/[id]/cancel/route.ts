import { NextResponse } from 'next/server';

import ENV_CONFIG from '@/config/env-config';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${ENV_CONFIG.backendUrl}/jobs/${id}/cancel`, {
    method: 'PUT',
  });
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
