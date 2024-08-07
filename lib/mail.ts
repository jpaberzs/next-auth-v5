import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'Acme <mail@jpaberzs.com>',
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPsswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'Acme <mail@jpaberzs.com>',
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click this  <a href='${resetLink}' target='_blank'>link</a> to reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confrimLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'Acme <mail@jpaberzs.com>',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click this  <a href='${confrimLink}' target='_blank'>link</a> to verify your email.</p>`,
  });
};
