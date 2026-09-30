import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d .-]+$/;

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ error: "invalid" }, { status: 413 });
    input = JSON.parse(raw);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid payload");
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const company = typeof input.company === "string" ? input.company.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const website = typeof input.website === "string" ? input.website.trim() : "";

  if (website) return NextResponse.json({ ok: true });
  const phoneDigits = phone.replace(/\D/g, "");
  if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || phone.length > 40 || !phonePattern.test(phone) || phoneDigits.length < 6 || phoneDigits.length > 20 || company.length > 120 || message.length > 5000) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    console.error("Contact form: RESEND_API_KEY or RESEND_FROM_EMAIL is missing");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.contact.email],
        reply_to: email,
        subject: `Nuevo proyecto — ${name.replace(/[\r\n]/g, " ").slice(0, 80)}`,
        text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nEmpresa / proyecto: ${company || "No indicado"}\n\nMensaje:\n${message || "No indicado"}`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      // Keep provider diagnostics in server logs; never expose them to the browser.
      const body: unknown = await response.json().catch(() => null);
      const details = body && typeof body === "object" && !Array.isArray(body)
        ? body as Record<string, unknown>
        : {};
      console.error("Contact form: Resend rejected the request", {
        status: response.status,
        name: typeof details.name === "string" ? details.name : undefined,
        message: typeof details.message === "string" ? details.message : undefined,
      });
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: Resend request failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
