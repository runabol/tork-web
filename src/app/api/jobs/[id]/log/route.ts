import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const search = new URL(req.url || '').search;
  const urlParams = new URLSearchParams(search);
  const page = urlParams.get('page') || '1';
  const res = await fetch(
    `${process.env.BACKEND_URL}/jobs/${id}/log?page=${page}&size=50`,
    {
      cache: 'no-cache',
    }
  );
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
