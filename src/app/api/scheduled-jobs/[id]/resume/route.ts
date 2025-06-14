import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/scheduled-jobs/${params.id}/resume`,
    {
      method: "PUT",
    }
  );
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
