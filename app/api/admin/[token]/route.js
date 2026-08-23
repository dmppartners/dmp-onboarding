import { NextResponse } from "next/server";
import { listPrefix, readJSON } from "../../../../lib/storage";

export const runtime = "nodejs";

export async function POST(request, { params }) {
  const { token } = await params;
  const { password } = await request.json().catch(() => ({}));

  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Password errata." }, { status: 401 });
  }

  const files = await listPrefix(`clients/${token}/`);
  const onboarding = await readJSON(`clients/${token}/onboarding.json`);

  return NextResponse.json({ ok: true, token, files, onboarding });
}
