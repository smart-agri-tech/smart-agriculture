import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { firstName, lastName, email, message } = await req.json();

  const { error } = await resend.emails.send({
    from: 'Smart Agriculture <onboarding@resend.dev>',
    to: 'info@smart-agriculture.tech',
    replyTo: email,
    subject: `New message from ${firstName} ${lastName}`,
    html: `
      <p><strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
