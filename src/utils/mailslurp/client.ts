import { MailSlurp } from 'mailslurp-client';

const apiKey = process.env['MAILSLURP_API_KEY'];

if (!apiKey) {
  throw new Error('MAILSLURP_API_KEY environment variable is not set');
}

export const mailslurp = new MailSlurp({ apiKey });
