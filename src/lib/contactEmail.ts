type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function detailRow(label: string, value: string) {
  return `<tr><td style="padding:14px 0;border-bottom:1px solid #e4e5df;color:#62665e;font:11px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;width:120px">${label}</td><td style="padding:14px 0;border-bottom:1px solid #e4e5df;color:#171916;font:15px Arial,sans-serif;line-height:1.5;overflow-wrap:anywhere">${value}</td></tr>`;
}

export function renderContactEmail({ name, email, phone, company, message }: ContactDetails) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeCompany = escapeHtml(company || "No indicado");
  const safeMessage = escapeHtml(message || "No dejó un mensaje.").replace(/\r\n?|\n/g, "<br>");
  const phoneHref = phone.replace(/[^+\d]/g, "");

  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f1;color:#171916;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f5f1"><tr><td align="center" style="padding:32px 16px">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#ffffff;border-top:4px solid #5e6c43">
      <tr><td style="padding:30px 32px 24px;border-bottom:1px solid #e4e5df">
        <p style="margin:0;color:#171916;font:bold 18px Arial,sans-serif;letter-spacing:-.04em">LUFINHA <span style="font:10px Arial,sans-serif;letter-spacing:.1em">STUDIO</span></p>
        <p style="margin:6px 0 0;color:#777b72;font:10px Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase">Diseño + desarrollo digital</p>
      </td></tr>
      <tr><td style="padding:32px 32px 36px">
        <p style="margin:0 0 12px;color:#5e6c43;font:11px Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase">Formulario de contacto</p>
        <h1 style="margin:0 0 28px;color:#171916;font:bold 30px Arial,sans-serif;letter-spacing:-.04em;line-height:1.15">Nueva consulta de ${safeName}</h1>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #e4e5df">
          ${detailRow("Nombre", safeName)}
          ${detailRow("Email", `<a href="mailto:${safeEmail}" style="color:#5e6c43;text-decoration:underline">${safeEmail}</a>`)}
          ${detailRow("Teléfono", `<a href="tel:${phoneHref}" style="color:#5e6c43;text-decoration:underline">${safePhone}</a>`)}
          ${detailRow("Proyecto", safeCompany)}
        </table>
        <p style="margin:30px 0 10px;color:#62665e;font:11px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase">Mensaje</p>
        <div style="padding:18px 20px;background:#f3f5ef;border-left:3px solid #5e6c43;color:#171916;font:15px Arial,sans-serif;line-height:1.6;overflow-wrap:anywhere">${safeMessage}</div>
      </td></tr>
      <tr><td style="padding:18px 32px;background:#f8f8f5;color:#777b72;font:11px Arial,sans-serif;line-height:1.5">Enviado desde el formulario de contacto de Lufinha Studio. Podés responder directamente a este correo.</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const text = `Nueva consulta de ${name}\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nEmpresa / proyecto: ${company || "No indicado"}\n\nMensaje:\n${message || "No dejó un mensaje."}`;

  return { html, text };
}
