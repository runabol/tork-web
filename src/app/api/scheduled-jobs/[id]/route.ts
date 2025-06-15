import { NextResponse } from 'next/server';

import { getEnvConfig } from '@/config/env-config';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const envConfig = await getEnvConfig();

  const { id } = await params;
  const res = await fetch(`${envConfig.backendUrl}/scheduled-jobs/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    return NextResponse.json({ OK: true });
  } else {
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }
}
