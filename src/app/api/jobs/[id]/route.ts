import { NextResponse } from 'next/server';

import { getEnvConfig } from '@/config/env-config';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const envConfig = await getEnvConfig();

  const { id } = await params;
  const res = await fetch(`${envConfig.backendUrl}/jobs/${id}`);
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
