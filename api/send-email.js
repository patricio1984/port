export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }

    const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
    const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL;
    const FROM_NAME = process.env.MAILERSEND_FROM_NAME || 'Website';
    const TO_EMAIL = process.env.MAILERSEND_TO_EMAIL;

    if (!MAILERSEND_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
      console.error('Mailersend: missing server configuration');
      res.status(500).json({ error: 'Server not configured' });
      return;
    }

    const payload = {
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: TO_EMAIL }],
      subject: `Nuevo mensaje desde el formulario: ${name}`,
      html: `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Mensaje:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
    };

    const resp = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();

    if (!resp.ok) {
      console.error('Mailersend API error', resp.status, text);
      res.status(resp.status).send(text);
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
