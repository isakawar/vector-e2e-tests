import type { Email } from 'mailslurp-client';
import { mailslurp } from './client.js';

const ACTIVATION_TIMEOUT_MS = 60_000;

export async function waitForActivationEmail(inboxId: string): Promise<Email> {
  return mailslurp.waitForLatestEmail(inboxId, ACTIVATION_TIMEOUT_MS, true);
}
