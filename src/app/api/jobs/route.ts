import { NextResponse } from 'next/server';

import ENV_CONFIG from '@/config/env-config';

export async function POST(request: Request) {
  const body = await request.text();
  const res = await fetch(
    `${ENV_CONFIG.backendUrl}/${
      body.indexOf('cron') > 0 ? 'scheduled-jobs' : 'jobs'
    }`,
    {
      method: 'POST',
      body: body,
      headers: {
        'content-type': 'text/yaml',
      },
    }
  );
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
