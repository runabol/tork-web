import { NextResponse } from 'next/server';

import { getEnvConfig } from '@/config/env-config';

export async function POST(request: Request) {
  const envConfig = await getEnvConfig();

  const body = await request.text();
  const res = await fetch(
    `${envConfig.backendUrl}/${
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
