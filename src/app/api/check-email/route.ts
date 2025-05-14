// src/app/api/check-email/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
      headers: {
        "hibp-api-key": process.env.HIBP_API_KEY!,
        "user-agent": "caknak-app",
      },
    });

    if (response.status === 404) {
      // email not breached
      return NextResponse.json({ breached: false });
    } else if (response.status === 200) {
      // email breached
      return NextResponse.json({ breached: true });
    } else {
      return NextResponse.json({ error: "API error" }, { status: response.status });
    }
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
