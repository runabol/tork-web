import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const res = await fetch(`${process.env.BACKEND_URL}/jobs`, {
    method: "POST",
    body: body,
    headers: {
      "content-type": "text/yaml",
    },
  });
  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
