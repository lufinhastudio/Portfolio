import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 8000) return NextResponse.json({ error: "invalid" }, { status: 413 });
    input = JSON.parse(raw);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("invalid");
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const idea = typeof input.idea === "string" ? input.idea.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const website = typeof input.website === "string" ? input.website.trim() : "";

  if (website) return NextResponse.json({ ok: true });

  if (!idea || idea.length > 3000 || !emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    console.error("Idea form: RESEND_API_KEY or RESEND_FROM_EMAIL is missing");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const safeIdea = escapeHtml(idea).replace(/\r\n?|\n/g, "<br>");
  const safeEmail = escapeHtml(email);

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f1;color:#171916;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f5f1"><tr><td align="center" style="padding:32px 16px">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#ffffff;border-top:4px solid #5e6c43">
      <tr><td style="padding:30px 32px 24px;border-bottom:1px solid #e4e5df">
        <p style="margin:0;color:#171916;font:bold 18px Arial,sans-serif;letter-spacing:-.04em">LUFINHA <span style="font:10px Arial,sans-serif;letter-spacing:.1em">STUDIO</span></p>
        <p style="margin:6px 0 0;color:#777b72;font:10px Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase">Nueva idea desde el hero</p>
      </td></tr>
      <tr><td style="padding:32px 32px 36px">
        <p style="margin:0 0 12px;color:#5e6c43;font:11px Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase">Idea recibida</p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #e4e5df">
          <tr><td style="padding:14px 0;border-bottom:1px solid #e4e5df;color:#62665e;font:11px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;width:100px">Email</td><td style="padding:14px 0;border-bottom:1px solid #e4e5df;color:#171916;font:15px Arial,sans-serif;line-height:1.5"><a href="mailto:${safeEmail}" style="color:#5e6c43;text-decoration:underline">${safeEmail}</a></td></tr>
        </table>
        <p style="margin:30px 0 10px;color:#62665e;font:11px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase">La idea</p>
        <div style="padding:18px 20px;background:#f3f5ef;border-left:3px solid #5e6c43;color:#171916;font:15px Arial,sans-serif;line-height:1.6;overflow-wrap:anywhere">${safeIdea}</div>
      </td></tr>
      <tr><td style="padding:18px 32px;background:#f8f8f5;color:#777b72;font:11px Arial,sans-serif;line-height:1.5">Enviado desde la barra de inicio de Lufinha Studio. Podés responder a este correo.</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const text = `Nueva idea desde el hero\n\nEmail: ${email}\n\nLa idea:\n${idea}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.contact.email],
        reply_to: email,
        subject: `Nueva idea — ${idea.slice(0, 80).replace(/[\r\n]/g, " ")}`,
        html,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const body: unknown = await response.json().catch(() => null);
      const details = body && typeof body === "object" && !Array.isArray(body) ? body as Record<string, unknown> : {};
      console.error("Idea form: Resend rejected", { status: response.status, message: typeof details.message === "string" ? details.message : undefined });
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Idea form: Resend request failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
