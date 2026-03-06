import { mailslurp } from './client.js';

export interface InboxData {
  inboxId: string;
  emailAddress: string;
}

export async function createInbox(): Promise<InboxData> {
  const inbox = await mailslurp.createInbox();
  return {
    inboxId: inbox.id ?? '',
    emailAddress: inbox.emailAddress ?? '',
  };
}
