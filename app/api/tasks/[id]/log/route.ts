import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${process.env.BACKEND_URL}/tasks/${params.id}/log`, {
    cache: "no-cache",
  });
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
