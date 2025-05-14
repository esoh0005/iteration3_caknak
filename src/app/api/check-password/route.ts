import { NextResponse } from "next/server";
import type { PasswordInput, PasswordResponse } from "@/types/password";

export async function POST(req: Request) {
    const input = (await req.json()) as PasswordInput;

  try {
    const res = await fetch("https://ems-royal-updated-password-checker-tm02.hf.space/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "API request failed" }, { status: 500 });
    }

    const json: unknown = await res.json();

    if (typeof json === "object" && json !== null && "features" in json) {
      return NextResponse.json(json as PasswordResponse);
    } else {
      return NextResponse.json({ error: "Invalid API response" }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
