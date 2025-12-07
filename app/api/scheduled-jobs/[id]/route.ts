import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/scheduled-jobs/${params.id}`,
    {
      method: "DELETE",
    }
  );
  if (res.ok) {
    return NextResponse.json({ OK: true });
  } else {
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }
}
