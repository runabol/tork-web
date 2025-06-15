import { NextResponse } from 'next/server';

import { getEnvConfig } from '@/config/env-config';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const envConfig = await getEnvConfig();

  const { id } = await params;
  const res = await fetch(`${envConfig.backendUrl}/jobs/${id}/cancel`, {
    method: 'PUT',
  });
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
